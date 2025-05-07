
// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get color based on sentiment score
export const getSentimentColor = (score) => {
  if (score > 0.2) return '#2ecc71'; // positive - green
  if (score < -0.2) return '#e74c3c'; // negative - red
  return '#f39c12'; // neutral - orange
};

// Get class name based on sentiment score
export const getSentimentClass = (score) => {
  if (score > 0.2) return 'positive';
  if (score < -0.2) return 'negative';
  return 'neutral';
};

// Generate PDF with detailed report
export const generatePDF = (analysis, categorizedFeedback, calculateCorrelation, explainCorrelation, jsPDF) => {
  const doc = new jsPDF();
  const correlation = calculateCorrelation();
  
  // Title
  doc.setFontSize(20);
  doc.text("Hackathon Feedback Analysis Report", 14, 20);
  doc.setFontSize(12);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Summary Stats
  doc.setFontSize(16);
  doc.text("Summary Statistics", 14, 45);
  doc.setFontSize(12);
  doc.text(`Total Feedback Analyzed: ${analysis.length}`, 14, 55);
  doc.text(`Positive Feedback: ${categorizedFeedback.positive.length}`, 14, 65);
  doc.text(`Neutral Feedback: ${categorizedFeedback.neutral.length}`, 14, 75);
  doc.text(`Negative Feedback: ${categorizedFeedback.negative.length}`, 14, 85);
  doc.text(`Actionable Feedback: ${categorizedFeedback.actionable.length}`, 14, 95);
  doc.text(`General Comments: ${categorizedFeedback.general.length}`, 14, 105);
  
  // Correlation Analysis
  doc.setFontSize(16);
  doc.text("Correlation Analysis", 14, 120);
  doc.setFontSize(12);
  doc.text(`Correlation Coefficient: ${correlation ? correlation.toFixed(2) : "N/A"}`, 14, 130);
  
  const correlationExplanation = explainCorrelation(correlation);
  const splitExplanation = doc.splitTextToSize(correlationExplanation, 180);
  doc.text(splitExplanation, 14, 140);
  
  // Top Actionable Feedback
  doc.addPage();
  doc.setFontSize(16);
  doc.text("Top Actionable Feedback", 14, 20);
  doc.setFontSize(12);
  
  const actionableFeedback = categorizedFeedback.actionable
    .sort((a, b) => Math.abs(b.sentimentScore) - Math.abs(a.sentimentScore))
    .slice(0, 5);
  
  if (actionableFeedback.length > 0) {
    let yPos = 30;
    actionableFeedback.forEach((item, i) => {
      const sentiment = item.sentimentScore > 0.2 ? "Positive" : 
                       item.sentimentScore < -0.2 ? "Negative" : "Neutral";
      
      doc.setFont("helvetica", "bold");
      doc.text(`${i+1}. Team: ${item.teamName} (Score: ${item.teamScore} - ${item.teamScoreText})`, 14, yPos);
      yPos += 8;
      
      doc.setFont("helvetica", "normal");
      const feedbackLines = doc.splitTextToSize(`Feedback: "${item.feedback}"`, 180);
      doc.text(feedbackLines, 14, yPos);
      yPos += (feedbackLines.length * 7) + 5;
      
      doc.text(`Sentiment: ${sentiment} (${item.sentimentScore.toFixed(2)})`, 14, yPos);
      yPos += 15;
    });
  } else {
    doc.text("No actionable feedback available.", 14, 30);
  }
  
  // Team Performance Analysis
  doc.addPage();
  doc.setFontSize(16);
  doc.text("Team Performance & Sentiment Analysis", 14, 20);
  
  // Group by teams
  const teamAnalysis = {};
  analysis.forEach(item => {
    if (!teamAnalysis[item.teamName]) {
      teamAnalysis[item.teamName] = {
        teamName: item.teamName,
        teamScore: item.teamScore,
        teamScoreText: item.teamScoreText,
        feedbackCount: 0,
        avgSentiment: 0,
        feedback: []
      };
    }
    
    teamAnalysis[item.teamName].feedbackCount++;
    teamAnalysis[item.teamName].avgSentiment += item.sentimentScore;
    teamAnalysis[item.teamName].feedback.push(item);
  });
  
  // Calculate averages
  Object.values(teamAnalysis).forEach(team => {
    team.avgSentiment = team.avgSentiment / team.feedbackCount;
  });
  
  // Sort teams by score
  const sortedTeams = Object.values(teamAnalysis)
    .sort((a, b) => b.teamScore - a.teamScore);
  
  // Create a table for team analysis
  const teamTableData = sortedTeams.map(team => [
    team.teamName,
    team.teamScore,
    team.teamScoreText,
    team.feedbackCount,
    team.avgSentiment.toFixed(2),
    getSentimentDescription(team.avgSentiment)
  ]);
  
  doc.autoTable({
    startY: 30,
    head: [["Team Name", "Score", "Performance", "Feedback Count", "Avg Sentiment", "Overall Sentiment"]],
    body: teamTableData,
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] },
    columnStyles: {
      4: { 
        cellCallback: function(cell, data) {
          if (data.section === 'body') {
            const sentiment = parseFloat(cell.text);
            if (sentiment > 0.2) {
              cell.styles.textColor = [39, 174, 96];
            } else if (sentiment < -0.2) {
              cell.styles.textColor = [231, 76, 60];
            } else {
              cell.styles.textColor = [243, 156, 18];
            }
          }
        }
      }
    }
  });
  
  // Detailed Analysis Table
  doc.addPage();
  doc.setFontSize(16);
  doc.text("Detailed Feedback Analysis", 14, 20);
  
  const tableData = analysis.map(item => [
    item.teamName,
    item.email,
    item.feedback.substring(0, 30) + (item.feedback.length > 30 ? "..." : ""),
    item.sentimentScore.toFixed(2),
    item.teamScore.toString(),
    item.category
  ]);
  
  doc.autoTable({
    startY: 30,
    head: [["Team", "Participant", "Feedback", "Sentiment", "Team Score", "Category"]],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] }
  });
  
  doc.save("Hackathon_Feedback_Analysis.pdf");
};

// Helper function for PDF generation
function getSentimentDescription(score) {
  if (score > 0.5) return "Very Positive";
  if (score > 0.2) return "Positive";
  if (score > -0.2) return "Neutral";
  if (score > -0.5) return "Negative";
  return "Very Negative";
}

// Calculate correlation between sentiment and team score
export const calculateCorrelation = (analysis) => {
  if (analysis.length === 0) return null;

  const n = analysis.length;
  const sumX = analysis.reduce((sum, item) => sum + item.sentimentScore, 0);
  const sumY = analysis.reduce((sum, item) => sum + item.teamScore, 0);
  const sumXY = analysis.reduce((sum, item) => sum + (item.sentimentScore * item.teamScore), 0);
  const sumX2 = analysis.reduce((sum, item) => sum + Math.pow(item.sentimentScore, 2), 0);
  const sumY2 = analysis.reduce((sum, item) => sum + Math.pow(item.teamScore, 2), 0);

  const numerator = sumXY - (sumX * sumY / n);
  const denominator = Math.sqrt((sumX2 - Math.pow(sumX, 2) / n) * (sumY2 - Math.pow(sumY, 2) / n));

  return denominator !== 0 ? numerator / denominator : 0;
};

// Explain correlation in human-readable terms
export const explainCorrelation = (coefficient) => {
  if (coefficient === null) return "No correlation data available.";
  
  const absCoeff = Math.abs(coefficient);
  let strength = "";
  let direction = coefficient > 0 ? "positive" : "negative";
  
  if (absCoeff < 0.1) {
    strength = "negligible";
  } else if (absCoeff < 0.3) {
    strength = "weak";
  } else if (absCoeff < 0.5) {
    strength = "moderate";
  } else if (absCoeff < 0.7) {
    strength = "strong";
  } else {
    strength = "very strong";
  }
  
  let explanation = `The correlation coefficient (r=${coefficient.toFixed(2)}) indicates a ${strength} ${direction} relationship between feedback sentiment and team performance.`;
  
  if (coefficient > 0.3) {
    explanation += " This suggests that teams with higher scores tend to receive more positive feedback. Teams that performed well elicited more favorable comments from participants.";
  } else if (coefficient < -0.3) {
    explanation += " This suggests that teams with higher scores tend to receive more critical feedback. Interestingly, better performing teams received more constructive criticism, which might indicate higher expectations for top performers.";
  } else {
    explanation += " This suggests little to no relationship between feedback sentiment and team performance. The tone of participants' comments appears to be independent of how well teams scored.";
  }
  
  return explanation;
};