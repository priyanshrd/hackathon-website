import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable"; 
import "./SentimentAnalysis.css";

const SentimentAnalysis = () => {
  const backend_url = "http://localhost:5000"; 
  const openRouterKey = "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";
  //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
  // backup key
  const [teams, setTeams] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState({
    current: 0,
    total: 0,
    percentage: 0
  });
  const [currentAnalysis, setCurrentAnalysis] = useState("");
  const navigate = useNavigate();

  // Refs for PDF export
  const statsRef = useRef(null);
  const correlationChartRef = useRef(null);
  const fullAnalysisRef = useRef(null);
  const feedbackSamplesRef = useRef(null);


  // Fetch teams and feedback data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [teamsRes, feedbackRes] = await Promise.all([
          axios.get(`${backend_url}/api/teams`),
          axios.get(`${backend_url}/api/feedback`)
        ]);

        setTeams(teamsRes.data);
        setFeedback(feedbackRes.data.feedback || []); // Ensure feedback is an array
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [backend_url]);

  // Perform sentiment analysis
  const analyzeSentiments = async () => {
    try {
      setIsAnalyzing(true);
      setError(null); // Clear previous errors
      setAnalysis([]); // Clear previous analysis results
  
      const emailToScoreMap = {};
      teams.forEach(team => {
        if (team.members && Array.isArray(team.members)) {
          team.members.forEach(member => {
            if (member.email) {
              emailToScoreMap[member.email] = team.score !== undefined ? team.score : 0;
            }
          });
        }
      });
  
      // MODIFIED: Filter feedback with quickFeedback AND team score > 0
      const feedbackWithScores = feedback.filter(item => 
        item.quickFeedback && (emailToScoreMap[item.email] || 0) > 0
      );
  
      // MODIFIED: Select 7 random items (or all if less than 7)
      const feedbackToAnalyze = feedbackWithScores.length <= 7 
        ? feedbackWithScores 
        : [...feedbackWithScores].sort(() => 0.5 - Math.random()).slice(0, 7);
  
      if (feedbackToAnalyze.length === 0) {
        setError("No feedback available with both comments and team scores greater than 0");
        setIsAnalyzing(false);
        return;
      }
      
      setProgress({
        current: 0,
        total: feedbackToAnalyze.length,
        percentage: 0
      });
  
      const analysisResults = [];
      for (const [index, item] of feedbackToAnalyze.entries()) {
        try {
          setCurrentAnalysis(`Analyzing feedback from ${item.email.substring(0, 3)}...@${item.email.split('@')[1]}`);
          
          const teamScore = emailToScoreMap[item.email] || 0;
  
          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${openRouterKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "deepseek/deepseek-r1:free",
              "messages": [
                {
                  "role": "system",
                  "content": "Analyze the sentiment of this hackathon feedback. Provide a sentiment score between -1 (very negative) and 1 (very positive). Also, classify the feedback into one of the following categories: 'actionable insight', 'general comment', 'suggestion', or 'question'. Respond ONLY with a valid JSON object like this: {\"sentimentScore\": score_value, \"category\": \"category_value\"}."
                },
                { "role": "user", "content": item.quickFeedback }
              ]
            })
          });

          if (!response.ok) {
            let errorContent = await response.text();
            let errorJsonParsed;
            try { errorJsonParsed = JSON.parse(errorContent); } catch (e) { /* not json */ }

            const errorDetail = errorJsonParsed?.error || {};
            const statusCode = response.status;

            if (statusCode === 429 || errorDetail.code === 429) {
              const resetTimestampHeader = response.headers.get('X-RateLimit-Reset');
              const resetTimestampMeta = errorDetail.metadata?.headers?.['X-RateLimit-Reset'];
              const resetTimestamp = resetTimestampMeta || resetTimestampHeader;
              const resetDate = resetTimestamp ? new Date(Number(resetTimestamp)).toLocaleString() : "shortly (usually within a day)";
              
              const rateLimitErrorMsg = `API rate limit exceeded. Please try again after ${resetDate}. You can check your OpenRouter account for more details on limits or to add credits. No further analysis will be performed in this session.`;
              setError(rateLimitErrorMsg);
              setIsAnalyzing(false);
              setCurrentAnalysis("");
              return; 
            }
            throw new Error(`API request failed with status ${statusCode}: ${errorDetail.message || errorContent}`);
          }

          const rawData = await response.json();

          if (rawData.error) {
            if (rawData.error.code === 429) {
              const resetTimestamp = rawData.error.metadata?.headers?.['X-RateLimit-Reset'];
              const resetDate = resetTimestamp ? new Date(Number(resetTimestamp)).toLocaleString() : "shortly (usually within a day)";
              const rateLimitErrorMsg = `API rate limit exceeded (as per response body). Please try again after ${resetDate}. Check your OpenRouter account for details. No further analysis will be performed.`;
              setError(rateLimitErrorMsg);
              setIsAnalyzing(false);
              setCurrentAnalysis("");
              return; 
            }
            console.error("OpenRouter API returned an error in response body:", rawData.error);
            throw new Error(`API Error: ${rawData.error.message || 'Unknown error from API response body'}`);
          }
          
          let sentimentScore = 0;
          let category = "general comment"; 

          if (rawData.choices && rawData.choices[0] && rawData.choices[0].message && rawData.choices[0].message.content) {
            try {
              const parsedContent = JSON.parse(rawData.choices[0].message.content);
              sentimentScore = parseFloat(parsedContent.sentimentScore);
              category = parsedContent.category || "general comment";
              if (isNaN(sentimentScore)) sentimentScore = 0;
            } catch (parseError) {
              console.error("Error parsing API response content:", parseError, rawData.choices[0].message.content);
              const potentialScore = parseFloat(rawData.choices[0].message.content);
              if (!isNaN(potentialScore)) sentimentScore = potentialScore;
              else sentimentScore = 0;
              category = "general comment"; 
            }
          } else {
             console.error("Unexpected API response structure (no choices or content):", rawData);
             sentimentScore = 0;
             category = "general comment";
          }

          analysisResults.push({
            email: item.email,
            feedback: item.quickFeedback,
            overallRating: item.overallRating,
            sentimentScore: isNaN(sentimentScore) ? 0 : sentimentScore,
            category: category,
            teamScore, // This will be 0 if no score was associated
            createdAt: item.createdAt
          });

          const newProgress = {
            current: index + 1,
            total: feedbackToAnalyze.length,
            percentage: Math.round(((index + 1) / feedbackToAnalyze.length) * 100)
          };
          setProgress(newProgress);
          setAnalysis([...analysisResults]);
        } catch (err) { 
          console.error(`Error analyzing feedback for ${item.email}:`, err);
          if (!error || !error.toLowerCase().includes("rate limit")) {
             setError(`An error occurred analyzing feedback for ${item.email}: ${err.message}. Further analysis stopped.`);
          }
          setIsAnalyzing(false); 
          setCurrentAnalysis("");
          return; 
        }
      } 
    } catch (err) { 
      console.error("General sentiment analysis process error:", err);
      if (!error || !error.toLowerCase().includes("rate limit")) {
        setError(`Sentiment analysis process failed: ${err.message}`);
      }
    } finally {
      setIsAnalyzing(false);
      setCurrentAnalysis(""); 
    }
  };

  const calculateCorrelation = () => {
    if (analysis.length < 2) return null; 
  
    // Filter out items where both sentiment and team score are 0
    const validItems = analysis.filter(item => item.sentimentScore !== 0 || item.teamScore !== 0);
    if (validItems.length < 2) return null;
  
    const n = validItems.length;
    const sumX = validItems.reduce((sum, item) => sum + item.sentimentScore, 0);
    const sumY = validItems.reduce((sum, item) => sum + item.teamScore, 0);
    const sumXY = validItems.reduce((sum, item) => sum + (item.sentimentScore * item.teamScore), 0);
    const sumX2 = validItems.reduce((sum, item) => sum + Math.pow(item.sentimentScore, 2), 0);
    const sumY2 = validItems.reduce((sum, item) => sum + Math.pow(item.teamScore, 2), 0);
  
    const numerator = (n * sumXY) - (sumX * sumY);
    const denominator = Math.sqrt(((n * sumX2) - Math.pow(sumX, 2)) * ((n * sumY2) - Math.pow(sumY, 2)));
    
    return denominator === 0 ? 0 : numerator / denominator;
  };

  const correlation = calculateCorrelation();

  const positiveFeedback = analysis.filter(item => item.sentimentScore > 0.2);
  const neutralFeedback = analysis.filter(item => item.sentimentScore >= -0.2 && item.sentimentScore <= 0.2);
  const negativeFeedback = analysis.filter(item => item.sentimentScore < -0.2);
  const categorizedFeedback = (category) => analysis.filter(item => item.category === category);

  const getOverallRatingLabel = (rating) => {
    switch (rating) {
      case 0: return "Poor"; 
      case 1: return "Average";
      case 2: return "Good";
      case 3: return "Loved It!";
      default: return "N/A";
    }
  };
  
  const handleSaveAsPdf = async () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const today = new Date().toLocaleDateString();
    let yPos = 20; 

    pdf.setFontSize(18);
    pdf.text("Hackathon Feedback Sentiment Analysis Report", pdf.internal.pageSize.getWidth() / 2, yPos, { align: "center" });
    yPos += 20;
    pdf.setFontSize(10);
    pdf.text(`Report Generated: ${today}`, pdf.internal.pageSize.getWidth() / 2, yPos, { align: "center" });
    yPos += 30;

    if (statsRef.current) {
        pdf.setFontSize(14);
        pdf.text("Summary Statistics", 40, yPos);
        yPos += 20;
        const canvas = await html2canvas(statsRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 80;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 40, yPos, pdfWidth, pdfHeight);
        yPos += pdfHeight + 20;
    }
    
    if (yPos > pdf.internal.pageSize.getHeight() - 100) {
        pdf.addPage();
        yPos = 40;
    }

    pdf.setFontSize(14);
    pdf.text("Correlation: Sentiment vs Team Score", 40, yPos);
    yPos += 20;
    pdf.setFontSize(10);
    const correlationValue = correlation !== null ? correlation.toFixed(2) : "N/A";
    // MODIFIED Correlation explanation text
    const correlationExplanationText = `The correlation score (Pearson's r) ranges from -1 to +1. It measures the strength and direction of the linear relationship between the sentiment of the feedback and the team's hackathon score. This analysis includes all feedback with comments; team scores may be 0 if not assigned or if the team did not receive a score.
    - A score close to +1 (e.g., ${correlationValue}) indicates a positive correlation.
    - A score close to -1 indicates a negative correlation.
    - A score near 0 suggests a weak or no linear relationship.
    Current Correlation: ${correlationValue}
    <p>
  <strong>Note on Data Included:</strong> This sentiment analysis includes all submitted feedback that contains comments. The "Team Score" is the final score achieved by the participant's team in the hackathon; a score of 0 indicates either no score was assigned or the team did not receive one. The correlation calculation excludes cases where both sentiment and team score are 0.
</p>`;
    
    const splitText = pdf.splitTextToSize(correlationExplanationText, pdf.internal.pageSize.getWidth() - 80);
    pdf.text(splitText, 40, yPos);
    yPos += (splitText.length * 12) + 10; 

    if (correlationChartRef.current && analysis.length > 0) {
        if (yPos > pdf.internal.pageSize.getHeight() - 250) { 
            pdf.addPage();
            yPos = 40;
        }
        pdf.setFontSize(12);
        pdf.text("Sentiment vs Team Score Scatter Plot:", 40, yPos);
        yPos += 20;
        try {
            const canvas = await html2canvas(correlationChartRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth() - 80; 
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 40, yPos, pdfWidth, pdfHeight);
            yPos += pdfHeight + 20;
        } catch (e) {
            console.error("Error capturing chart for PDF:", e);
            pdf.text("Chart could not be captured.", 40, yPos);
            yPos += 20;
        }
    }

    if (feedbackSamplesRef.current) {
        if (yPos > pdf.internal.pageSize.getHeight() - 150) {
            pdf.addPage();
            yPos = 40;
        }
        pdf.setFontSize(14);
        pdf.text("Feedback Highlights by Category", 40, yPos);
        yPos += 20;
        
        const categoriesToSample = ['actionable insight', 'suggestion', 'general comment', 'question'];
        for (const cat of categoriesToSample) {
            const samples = categorizedFeedback(cat).slice(0, 2); 
            if (samples.length > 0) {
                 if (yPos > pdf.internal.pageSize.getHeight() - 80) {
                    pdf.addPage();
                    yPos = 40;
                }
                pdf.setFontSize(12);
                pdf.text(`${cat.charAt(0).toUpperCase() + cat.slice(1)}s:`, 40, yPos);
                yPos += 15;
                pdf.setFontSize(9);
                samples.forEach(item => {
                    if (yPos > pdf.internal.pageSize.getHeight() - 50) {
                        pdf.addPage();
                        yPos = 40;
                    }
                    pdf.text(`Email: ${item.email}, Sentiment: ${item.sentimentScore.toFixed(2)}, Team Score: ${item.teamScore}`, 50, yPos);
                    yPos += 10;
                    const feedbackLines = pdf.splitTextToSize(`Feedback: "${item.feedback}"`, pdf.internal.pageSize.getWidth() - 100);
                    pdf.text(feedbackLines, 50, yPos);
                    yPos += (feedbackLines.length * 10) + 5;
                });
            }
        }
         yPos += 10;
    }

    if (fullAnalysisRef.current && analysis.length > 0) {
        if (yPos > pdf.internal.pageSize.getHeight() - 60) {
            pdf.addPage();
            yPos = 40;
        }
        pdf.setFontSize(14);
        pdf.text("Detailed Analysis Table", 40, yPos);

        const tableColumn = ["Participant", "Feedback", "Sentiment", "Category", "Team Score", "Overall Rating"];
        const tableRows = [];
        analysis.forEach(item => {
            const ticketData = [
                item.email,
                item.feedback,
                item.sentimentScore.toFixed(2),
                item.category,
                item.teamScore, // Will show 0 if no score
                `${item.overallRating}/3 (${getOverallRatingLabel(item.overallRating)})`
            ];
            tableRows.push(ticketData);
        });

        pdf.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: yPos + 20, 
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [22, 160, 133], fontSize: 9, textColor: 255 },
            columnStyles: {
                0: { cellWidth: 80 }, 
                1: { cellWidth: 'auto' },
                2: { cellWidth: 40 }, 
                3: { cellWidth: 60 }, 
                4: { cellWidth: 50 }, 
                5: { cellWidth: 70 }  
            }
        });
    }
    pdf.save(`sentiment_analysis_report_${Date.now()}.pdf`);
  };


  if (isLoading) {
    return <div className="loading">Loading data...</div>;
  }

  if (error && !isLoading && analysis.length === 0 && !isAnalyzing) { 
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="sentiment-container">
      <div className="header">
        <h1>Hackathon Feedback Sentiment Analysis</h1>
        <button className="home-button" onClick={() => navigate("/")}>
          Return to Home
        </button>
      </div>

      {error && (analysis.length > 0 || isAnalyzing) && (
          <div className="error inline-error">Notice: {error}</div>
      )}

      <div className="controls">
        <button 
          className="analyze-button" 
          onClick={analyzeSentiments}
          // MODIFIED: Disabled logic
          disabled={isAnalyzing || feedback.filter(item => item.quickFeedback).length === 0}
        >
          {isAnalyzing ? (
            <span className="analyzing-text">
              Analyzing... ({progress.current}/{progress.total})
            </span>
          ) : "Run Sentiment Analysis"}
        </button>
        <button
            className="pdf-button"
            onClick={handleSaveAsPdf}
            disabled={isAnalyzing || analysis.length === 0}
        >
            Save Report as PDF
        </button>
        
        {isAnalyzing && progress.total > 0 && ( 
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {progress.percentage}% complete • {currentAnalysis}
            </div>
          </div>
        )}
      </div>
        
      {(analysis.length > 0 || (isAnalyzing && progress.total > 0 )) && (
            <div ref={statsRef} className={`stats ${isAnalyzing && analysis.length === 0 ? 'stats-hidden-for-pdf' : ''}`}>
            <div className="stat-card">
              <h3>Total Analyzed</h3>
              <p>{analysis.length}</p>
            </div>
            <div className="stat-card positive">
              <h3>Positive</h3>
              <p>{positiveFeedback.length}</p>
            </div>
            <div className="stat-card neutral">
              <h3>Neutral</h3>
              <p>{neutralFeedback.length}</p>
            </div>
            <div className="stat-card negative">
              <h3>Negative</h3>
              <p>{negativeFeedback.length}</p>
            </div>
            <div className="stat-card">
              <h3>Correlation</h3>
              <p>{correlation !== null ? correlation.toFixed(2) : "N/A"}</p>
            </div>
          </div>
      )}

      {analysis.length > 0 && !isAnalyzing && (
        <div className="correlation-explanation">
          <h3>Understanding the Correlation Score (Sentiment vs. Team Score)</h3>
          {/* MODIFIED: Explanation text */}
          <p>
            The correlation score (Pearson's r) displayed above ranges from -1 to +1. It measures the strength and direction of the linear relationship between the sentiment of the feedback and the team's hackathon score.
          </p>
          <ul>
            <li>A score close to <strong>+1</strong> (e.g., {correlation ? correlation.toFixed(2) : "N/A"}) indicates a positive correlation: as sentiment improves, team scores tend to be higher.</li>
            <li>A score close to <strong>-1</strong> indicates a negative correlation: more positive feedback might be associated with lower team scores, or vice-versa.</li>
            <li>A score near <strong>0</strong> suggests a weak or no linear relationship.</li>
          </ul>
          <p>
            <strong>Note on Data Included:</strong> This sentiment analysis includes all submitted feedback that contains comments. The "Team Score" is the final score achieved by the participant's team in the hackathon; this score may be 0 if no score was assigned or if the team did not receive one. The "Overall Rating" is on a 0-3 scale from the original feedback, interpreted as: 0=Poor, 1=Average, 2=Good, 3=Loved It!.
          </p>
        </div>
      )}
      
      {isAnalyzing && analysis.length > 0 && ( 
        <div className="preliminary-results">
          <h3>Preliminary Results (Updating Live)</h3>
          <div className="chart-container"> 
            {analysis.map((item, index) => (
              <div 
                key={`prelim-${index}`}
                className="data-point"
                style={{
                  left: `${(item.sentimentScore + 1) * 50}%`, 
                  bottom: `${Math.min(100, Math.max(0, item.teamScore))}%`, // teamScore can be 0
                  backgroundColor: item.sentimentScore > 0.2 ? '#2ecc71' : 
                                   item.sentimentScore < -0.2 ? '#e74c3c' : '#f39c12'
                }}
                title={`${item.email} (Team: ${item.teamScore}): "${item.feedback}" [Sent: ${item.sentimentScore.toFixed(2)}]`}
              ></div>
            ))}
            <div className="x-axis">Sentiment (-1 to 1)</div>
            <div className="y-axis">Team Score (0 to 100)</div>
          </div>
        </div>
      )}

      {analysis.length > 0 && !isAnalyzing && (
        <>
          <div className="correlation-chart" >
            <h2>Sentiment vs Team Score</h2>
            <div className="chart-container" ref={correlationChartRef}>
              {analysis.map((item, index) => (
                <div 
                  key={index} 
                  className="data-point"
                  style={{
                    left: `${(item.sentimentScore + 1) * 50}%`,
                    bottom: `${item.teamScore}%`, // teamScore can be 0
                    backgroundColor: item.sentimentScore > 0.2 ? '#2ecc71' : 
                                     item.sentimentScore < -0.2 ? '#e74c3c' : '#f39c12'
                  }}
                  title={`${item.email} (Team: ${item.teamScore}): "${item.feedback}" [Sent: ${item.sentimentScore.toFixed(2)}]`}
                ></div>
              ))}
              <div className="x-axis">Sentiment (-1 to 1)</div>
              <div className="y-axis">Team Score (0 to 100)</div>
            </div>
          </div>
          
          <div className="feedback-categorized" ref={feedbackSamplesRef}>
            <h2>Feedback by Category</h2>
            {['actionable insight', 'suggestion', 'general comment', 'question'].map(category => {
              const items = categorizedFeedback(category);
              if (items.length === 0) return null;
              return (
                <div key={category} className="category-section">
                  <h3>{category.charAt(0).toUpperCase() + category.slice(1)}s ({items.length})</h3>
                  {items.slice(0, 5).map((item, index) => ( 
                     <div key={index} className={`feedback-item ${
                        item.sentimentScore > 0.2 ? 'positive' : 
                        item.sentimentScore < -0.2 ? 'negative' : 'neutral'
                      }`}>
                      <p><strong>{item.email}</strong> (Team Score: {item.teamScore}, Overall: {getOverallRatingLabel(item.overallRating)})</p>
                      <p>"{item.feedback}"</p>
                      <p>Sentiment: {item.sentimentScore.toFixed(2)}</p>
                    </div>
                  ))}
                  {items.length > 5 && <p><em>(Showing 5 of {items.length} items)</em></p>}
                </div>
              );
            })}
          </div>

          <div className="full-analysis" ref={fullAnalysisRef}>
            <h2>Detailed Analysis</h2>
            <table>
              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Feedback</th>
                  <th>Sentiment</th>
                  <th>Category</th>
                  <th>Team Score</th>
                  <th>Overall Rating (/3)</th>
                </tr>
              </thead>
              <tbody>
                {analysis.map((item, index) => (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.feedback}</td>
                    <td className={item.sentimentScore > 0.2 ? 'positive' : 
                                   item.sentimentScore < -0.2 ? 'negative' : 'neutral'}>
                      {item.sentimentScore.toFixed(2)}
                    </td>
                    <td>{item.category}</td>
                    <td>{item.teamScore}</td> {/* Will show 0 if no score */}
                    <td>{item.overallRating}/3 ({getOverallRatingLabel(item.overallRating)})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* MODIFIED: No data message */}
      {!isLoading && !isAnalyzing && feedback.filter(item => item.quickFeedback).length === 0 && analysis.length === 0 && (
        <div className="no-data">
          <p>No feedback with comments available for analysis.</p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;