// src/pages/SubmitIdea.js
import React, { useState } from "react";

const SubmitIdea = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    idea: "",
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form Data:", formData);
    // TODO: Send form data to the backend

    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form after submission
      setFormData({ teamName: "", idea: "", file: null });
      setFileName("");
      alert("Your idea has been submitted successfully!");
    }, 1500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      setFileName(file.name);
    }
  };

  return (
    <div className="bg-[#02062e] min-h-[calc(100vh)] p-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#a2d6f9] text-center mb-8">
          Share your innovative concept with our team
        </p>

        <div className="bg-[#072ac8]/10 rounded-xl p-6 backdrop-blur-sm border border-[#1e96fc]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg text-[#a2d6f9] mb-2 font-medium">
                Team Name
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) =>
                  setFormData({ ...formData, teamName: e.target.value })
                }
                className="w-full p-3 bg-[#0a0a0a] text-[#ffffff] rounded-lg border border-[#1e96fc] focus:outline-none focus:ring-2 focus:ring-[#fcf300] transition duration-300"
                placeholder="Enter your team name"
                required
              />
            </div>

            <div>
              <label className="block text-lg text-[#a2d6f9] mb-2 font-medium">
                Idea Description
              </label>
              <textarea
                value={formData.idea}
                onChange={(e) =>
                  setFormData({ ...formData, idea: e.target.value })
                }
                className="w-full p-3 bg-[#0a0a0a] text-[#ffffff] rounded-lg border border-[#1e96fc] focus:outline-none focus:ring-2 focus:ring-[#fcf300] transition duration-300"
                rows="5"
                placeholder="Describe your idea in detail..."
                required
              />
            </div>

            <div>
              <label className="block text-lg text-[#a2d6f9] mb-2 font-medium">
                Upload File (PDF only)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  required
                />
                <label
                  htmlFor="file-upload"
                  className="w-full flex items-center justify-center p-3 bg-[#0a0a0a] text-[#ffffff] rounded-lg border border-dashed border-[#1e96fc] hover:border-[#fcf300] focus:outline-none transition duration-300 cursor-pointer"
                >
                  <span className="text-[#1e96fc] mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </span>
                  {fileName ? fileName : "Click to upload PDF"}
                </label>
              </div>
              <p className="text-sm text-[#a2d6f9]/70 mt-2">
                Maximum file size: 10MB
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center bg-[#fcf300] text-[#0a0a0a] px-6 py-4 rounded-lg text-lg font-bold hover:bg-[#ffc600] transition duration-300 ${
                isSubmitting ? "opacity-75" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0a0a0a]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Your Idea"
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-[#a2d6f9]/70 text-sm">
            All submissions will be reviewed within 5 business days
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmitIdea;
