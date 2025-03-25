import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const SubmitIdea = () => {
  const backend_url = "https://techtank-backend.vercel.app";

  // Color palette
  const colors = {
    blue: "#38AAC9",
    yellow: "#E4CD15",
    dark: "#0a0a0a",
    darkGray: "#1a1a1a",
    mediumGray: "#2a2a2a",
    lightGray: "#3a3a3a",
    textLight: "#ffffff",
    textGray: "#cccccc",
  };

  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const fileInputRef = useRef(null);
  const totalSteps = 3;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (file) {
      // Check if file is PDF
      if (file.type !== "application/pdf") {
        setFileError("Please upload a PDF file only");
        setSelectedFile(null);
        setFileName("");
        return;
      }

      // Check file size (10MB = 10 * 1024 * 1024 bytes)
      if (file.size > 10 * 1024 * 1024) {
        setFileError("File size exceeds 10MB limit");
        setSelectedFile(null);
        setFileName("");
        return;
      }

      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Form validation
    if (
      !teamName ||
      !leaderName ||
      !leaderEmail ||
      !ideaDescription ||
      !selectedFile
    ) {
      setError("Please complete all fields before submitting");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append("teamName", teamName);
      formData.append("leaderName", leaderName);
      formData.append("leaderEmail", leaderEmail);
      formData.append("ideaDescription", ideaDescription);
      formData.append("file", selectedFile);

      // Replace with your actual API endpoint
      const response = await axios.post(
        backend_url + "/api/ideas/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setShowSuccessAnimation(true);
        setTimeout(() => {
          setShowSuccessAnimation(false);
          // Reset form
          setCurrentStep(1);
          setTeamName("");
          setLeaderName("");
          setLeaderEmail("");
          setIdeaDescription("");
          setSelectedFile(null);
          setFileName("");
        }, 3000);
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "Submission failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    // Validation for first step
    if (currentStep === 1 && (!teamName || !leaderName || !leaderEmail)) {
      setError("Please fill in all fields");
      return;
    }

    // Validation for second step
    if (currentStep === 2 && !ideaDescription) {
      setError("Please describe your idea");
      return;
    }

    setError("");
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setError("");
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      setError("");
    }
  };

  // Render stepper header
  const renderStepper = () => {
    return (
      <div className="flex flex-wrap justify-center md:justify-between w-full mb-8 max-w-3xl mx-auto px-2 sm:px-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center mb-4 sm:mb-0">
              <button
                onClick={() => goToStep(index + 1)}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-bold transition-all duration-300 border-2 focus:outline-none"
                style={{
                  backgroundColor:
                    index + 1 === currentStep ? colors.yellow : colors.blue,
                  color:
                    index + 1 === currentStep ? colors.blue : colors.yellow,
                  borderColor:
                    index + 1 === currentStep ? colors.yellow : colors.blue,
                }}
              >
                {index + 1 < currentStep ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>
              <span className="text-xs sm:text-sm mt-2 text-white text-center">
                {index === 0 && "Team Info"}
                {index === 1 && "Idea Description"}
                {index === 2 && "Upload PDF"}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className="hidden md:block flex-1 h-1 mx-2 self-center"
                style={{
                  backgroundColor:
                    index + 1 < currentStep ? colors.blue : colors.lightGray,
                  background:
                    index + 1 === currentStep
                      ? `linear-gradient(to right, ${colors.blue}, ${colors.lightGray})`
                      : "",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Step 1: Team Information
  const renderTeamInfoStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-[#3a3a3a]">
          <h3 className="text-xl font-semibold mb-6 text-white">
            Team Information
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full p-3 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md focus:ring-2 focus:ring-[#38AAC9] focus:border-[#38AAC9]"
                required
                placeholder="Enter your team name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Team Leader Name
              </label>
              <input
                type="text"
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                className="w-full p-3 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md focus:ring-2 focus:ring-[#38AAC9] focus:border-[#38AAC9]"
                required
                placeholder="Enter team leader's name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Team Leader Email
              </label>
              <input
                type="email"
                value={leaderEmail}
                onChange={(e) => setLeaderEmail(e.target.value)}
                className="w-full p-3 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md focus:ring-2 focus:ring-[#38AAC9] focus:border-[#38AAC9]"
                required
                placeholder="Enter team leader's email"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={nextStep}
              style={{ backgroundColor: colors.yellow }}
              className="px-6 py-3 rounded-full font-medium text-black hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base min-w-20"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Step 2: Idea Description
  const renderIdeaDescriptionStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-[#3a3a3a]">
          <h3 className="text-xl font-semibold mb-6 text-white">
            Idea Description
          </h3>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Describe Your Idea
            </label>
            <textarea
              value={ideaDescription}
              onChange={(e) => setIdeaDescription(e.target.value)}
              rows={8}
              className="w-full p-4 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md focus:ring-2 focus:ring-[#38AAC9] focus:border-[#38AAC9] resize-none"
              required
              placeholder="Please provide a detailed description of your idea..."
            />
          </div>

          <div className="flex justify-between mt-8 flex-wrap gap-4">
            <button
              onClick={prevStep}
              style={{ backgroundColor: colors.blue }}
              className="px-6 py-3 rounded-full font-medium text-white hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base min-w-20"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              style={{ backgroundColor: colors.yellow }}
              className="px-6 py-3 rounded-full font-medium text-black hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base min-w-20"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Step 3: Upload File
  const renderFileUploadStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-[#3a3a3a]">
          <h3 className="text-xl font-semibold mb-6 text-white">
            Upload Your Document
          </h3>

          <div className="mb-6">
            <div
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
                selectedFile
                  ? "border-green-400 bg-[#2a2a2a]"
                  : "border-[#3a3a3a] hover:border-[#38AAC9] bg-[#2a2a2a]"
              }`}
              style={{ minHeight: "200px" }}
            >
              {selectedFile ? (
                <>
                  <div className="text-green-400 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-white font-medium mb-1">
                    File uploaded successfully
                  </p>
                  <p className="text-[#cccccc] text-sm break-all">{fileName}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setFileName("");
                    }}
                    className="mt-4 text-sm text-[#38AAC9] hover:text-[#E4CD15] transition-colors"
                  >
                    Remove file
                  </button>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-[#38AAC9] mb-4"
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
                  <p className="text-white font-medium mb-1">
                    Click to upload PDF
                  </p>
                  <p className="text-[#cccccc] text-sm">
                    Maximum file size: 10MB
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />
            </div>
            {fileError && (
              <p className="mt-2 text-red-400 text-sm">{fileError}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-white px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex justify-between mt-8 flex-wrap gap-4">
            <button
              onClick={prevStep}
              style={{ backgroundColor: colors.blue }}
              className="px-6 py-3 rounded-full font-medium text-white hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base min-w-20"
              disabled={isSubmitting}
            >
              Previous
            </button>
            <button
              onClick={handleSubmit}
              style={{ backgroundColor: colors.yellow }}
              className={`px-6 py-3 rounded-full font-medium text-black hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base min-w-40 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-black"
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
                  <span>Submitting...</span>
                </span>
              ) : (
                "Submit Your Idea"
              )}
            </button>
          </div>

          <div className="mt-6 text-sm text-[#cccccc] text-center">
            All submissions will be reviewed within 5 business days
          </div>
        </div>
      </motion.div>
    );
  };

  const renderSuccessAnimation = () => {
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="bg-[#1a1a1a] rounded-lg p-8 flex flex-col items-center shadow-lg border border-[#3a3a3a] max-w-md mx-auto"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{ duration: 0.5 }}
        className="text-6xl mb-4"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#03C03C"
          strokeWidth={2}
          className="w-16 h-16 text-lightgreen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ color: colors.yellow }}
        className="text-2xl font-bold pb-2"
      >
        Idea Submitted Successfully!
      </motion.h2>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-md font-bold text-white"
      >
        Thank you for your submission. We'll review your idea and get back to
        you within 5 business days.
      </motion.h3>
    </motion.div>;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl mx-auto bg-[#1a1a1a] rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-[#3a3a3a]">
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-10"
          style={{ color: colors.blue }}
        >
          Idea Submission
        </h1>

        {renderStepper()}

        {error && currentStep !== 3 && (
          <div className="max-w-2xl mx-auto px-4 mb-4">
            <div className="bg-red-900 border border-red-700 text-white px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {showSuccessAnimation ? (
            renderSuccessAnimation()
          ) : (
            <div className="mt-6 sm:mt-10">
              {currentStep === 1 && renderTeamInfoStep()}
              {currentStep === 2 && renderIdeaDescriptionStep()}
              {currentStep === 3 && renderFileUploadStep()}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SubmitIdea;
