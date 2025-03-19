import React, { useEffect, useState } from "react";
import axios from "axios";

const SubmissionBoard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/submissions");
        setSubmissions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const randomizeScores = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/submissions/randomize-scores');
      alert(response.data.message);
      setSubmissions(response.data.submissions); // Update the leaderboard
    } catch (error) {
      console.error('Error randomizing scores:', error);
      alert('Failed to randomize scores.');
    }
  };

  if (loading) {
    return <div className="text-center text-[#a2d6f9]">Loading...</div>;
  }

  return (
    <div className="bg-[#121212] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#1e96fc] mb-6 text-center">
        Submission Board
      </h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={randomizeScores}
          className="bg-[#1e96fc] text-[#0a0a0a] px-4 py-2 rounded hover:bg-[#1478c8] transition duration-300"
        >
          Randomize Scores
        </button>
      </div>
      <div className="overflow-x-auto">
        {submissions.length === 0 ? (
          <div className="text-center text-[#a2d6f9] text-lg">No submissions yet</div>
        ) : (
          <table className="table-auto w-full text-left text-[#ffffff] border-collapse border border-[#1e96fc]">
            <thead>
              <tr className="bg-[#1e96fc] text-[#0a0a0a]">
                <th className="px-4 py-2 border border-[#1e96fc]">Team Name</th>
                <th className="px-4 py-2 border border-[#1e96fc]">Team ID</th>
                <th className="px-4 py-2 border border-[#1e96fc]">Idea</th>
                <th className="px-4 py-2 border border-[#1e96fc]">Submission Time</th>
                <th className="px-4 py-2 border border-[#1e96fc]">Score</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr
                  key={submission.teamId}
                  className={index % 2 === 0 ? "bg-[#1e1e1e]" : "bg-[#2a2a2a]"}
                >
                  <td className="px-4 py-2 border border-[#1e96fc]">{submission.teamName}</td>
                  <td className="px-4 py-2 border border-[#1e96fc]">{submission.teamId}</td>
                  <td className="px-4 py-2 border border-[#1e96fc]">{submission.idea}</td>
                  <td className="px-4 py-2 border border-[#1e96fc]">
                    {new Date(submission.submissionTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border border-[#1e96fc] text-center">{submission.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SubmissionBoard;