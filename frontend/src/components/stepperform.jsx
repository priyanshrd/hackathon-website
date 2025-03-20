import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Stepper = () => {
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
  const [email, setEmail] = useState("");
  const [teamName, setTeamName] = useState("");
  const [memberCount, setMemberCount] = useState(1);
  const [members, setMembers] = useState([
    { name: "", email: "", phoneNumber: "", isTeamLead: true },
  ]);
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const totalSteps = 4;

  const handleMemberCountChange = (e) => {
    const count = parseInt(e.target.value);
    setMemberCount(count);
    const newMembers = Array(count)
      .fill(null)
      .map((_, index) => {
        if (index === 0)
          return { ...members[0], email: email || members[0].email };
        return (
          members[index] || {
            name: "",
            email: "",
            phoneNumber: "",
            isTeamLead: false,
          }
        );
      });
    setMembers(newMembers);
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
  };

  const [screenshot, setScreenshot] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);
    console.log("File selected:", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!screenshot) {
      setError("Please upload a payment screenshot.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("teamName", teamName);
      formData.append("transactionId", transactionId);
      formData.append("screenshot", screenshot); // Send as Base64
      formData.append("members", JSON.stringify(members)); // Convert array to string

      const response = await axios.post(
        "http://localhost:8080/api/registration/register",
        formData
      );

      if (response.status === 201) {
        setShowSuccessAnimation(true);
        setTimeout(() => {
          setShowSuccessAnimation(false);
          // Reset form
          setCurrentStep(1);
          setEmail("");
          setTeamName("");
          setMemberCount(1);
          setMembers([
            { name: "", email: "", phoneNumber: "", isTeamLead: true },
          ]);
          setTransactionId("");
          setScreenshot(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError(error.response?.data?.error || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const newMembers = [...members];
      newMembers[0] = { ...newMembers[0], email };
      setMembers(newMembers);
      nextStep();
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
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-bold transition-all duration-300 border-2 focus:outline-none
                  ${index + 1 < currentStep
                    ? `bg-${colors.blue} text-${colors.yellow} border-${colors.blue}`
                    : index + 1 === currentStep
                      ? `bg-${colors.yellow} text-${colors.blue} border-${colors.yellow}`
                      : `bg-${colors.blue} text-${colors.yellow} border-${colors.blue}`
                  }`}
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
              <span className="text-md sm:text-white text-[#1a1a1a] mt-2  text-center">
                {index === 0 && "Email"}
                {index === 1 && "Team Info"}
                {index === 2 && "Members"}
                {index === 3 && "Payment"}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`hidden md:block flex-1 h-1 mx-2 self-center
                  ${index + 1 < currentStep
                    ? `bg-${colors.blue}`
                    : index + 1 === currentStep
                      ? `bg-gradient-to-r from-${colors.blue} to-${colors.lightGray}`
                      : `bg-${colors.lightGray}`
                  }`}
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

  // Step 1: Email input
  const renderEmailStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md mx-auto px-4"
      >
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-white mb-2"
            >
              Enter your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 text-lg bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-lg focus:ring-2 focus:ring-[#38AAC9] focus:border-[#38AAC9]"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: colors.yellow }}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-black hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        </form>
      </motion.div>
    );
  };

  // Step 2: Team Information
  const renderTeamInfoStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-[#3a3a3a]">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Team Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Number of Team Members
              </label>
              <select
                value={memberCount}
                onChange={handleMemberCountChange}
                className="w-full p-3 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md focus:ring-2 focus:ring-[#38AAC9] focus:border-[#38AAC9]"
                required
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Member{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-8 flex-wrap gap-4">
            <button
              onClick={prevStep}
              style={{ backgroundColor: colors.blue }}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-full font-medium text-white hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base min-w-20"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              style={{ backgroundColor: colors.yellow }}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-full font-medium text-black hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base min-w-20"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Step 3: Team Members
  const renderTeamMembersStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-3xl mx-auto px-4"
      >
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-[#3a3a3a] space-y-6">
          <h3 className="text-xl font-semibold text-white">Team Members</h3>

          {members.map((member, index) => (
            <div
              key={index}
              className="bg-[#2a2a2a] p-4 sm:p-5 rounded-lg border border-[#3a3a3a]"
            >
              <h4 className="text-lg font-semibold mb-4 text-white">
                {index === 0 ? (
                  <span className="flex items-center">
                    <span className="mr-2">👤</span> Team Lead
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="mr-2">👥</span> Team Member {index + 1}
                  </span>
                )}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                    className="w-full p-3 bg-[#1a1a1a] border border-[#3a3a3a] text-white rounded-md focus:ring-2 focus:ring-[#38AAC9] focus:border-[#38AAC9]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) =>
                      handleMemberChange(index, "email", e.target.value)
                    }
                    className={`w-full p-3 bg-[#1a1a1a] border border-[#3a3a3a] text-white rounded-md 
                      ${index === 0 && email ? "opacity-70" : ""} 
                      focus:ring-2 focus:ring-[#38AAC9] focus:border-[#38AAC9]`}
                    required
                    disabled={index === 0 && email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={member.phoneNumber}
                    onChange={(e) =>
                      handleMemberChange(index, "phoneNumber", e.target.value)
                    }
                    className="w-full p-3 bg-[#1a1a1a] border border-[#3a3a3a] text-white rounded-md focus:ring-2 focus:ring-[#38AAC9] focus:border-[#38AAC9]"
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-8 flex-wrap gap-4">
            <button
              onClick={prevStep}
              style={{ backgroundColor: colors.blue }}
              className="px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-white hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base min-w-20"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              style={{ backgroundColor: colors.yellow }}
              className="px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-black hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base min-w-20"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Step 4: Payment
  const renderPaymentStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-[#3a3a3a]">
          <div className="flex items-center space-x-2 text-white pb-2">
            <h3 className="text-xl font-semibold">Payment Details - </h3>
            <span className="text-xl font-semibold text-[#E4CD15]">₹500</span>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg border border-[#3a3a3a] mb-6 w-full max-w-md">
              <div className="bg-[#1a1a1a] w-full h-48 flex items-center justify-center rounded-lg">
                <img
                  src="../../public/QRcode.jpg"
                  alt="Payment QR Code"
                  className="max-w-[200px] max-h-[180px] mx-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/200x180?text=QR+Code";
                  }}
                />
              </div>
            </div>

            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-white mb-2">
                Transaction ID
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full p-3 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md focus:ring-2 focus:ring-[#38AAC9] focus:border-[#38AAC9]"
                required
                placeholder="Enter your transaction ID"
              />
            </div>
            <div className="w-full  max-w-md mt-5">
              <label className="block text-sm font-medium text-white mb-2">
                Upload Transaction Screenshot
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-3 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md focus:ring-2 focus:ring-[#38AAC9] focus:border-[#38AAC9] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#38AAC9] file:text-white hover:file:bg-[#38AAC9]/90"
                />
              </div>
              <p className="mt-1 text-xs text-[#cccccc]">Please upload payment confirmation</p>
            </div>
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
              className="px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-white hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base min-w-20"
              disabled={isSubmitting}
            >
              Previous
            </button>
            <button
              onClick={handleSubmit}
              style={{ backgroundColor: colors.yellow }}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-black hover:bg-opacity-90 transform hover:scale-105 transition duration-300 shadow-lg text-sm sm:text-base min-w-32 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-black"
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
                  <span className="text-xs sm:text-sm">Processing...</span>
                </span>
              ) : (
                "Complete Registration"
              )}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderSuccessAnimation = () => {
    return (
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
          className="text-2xl font-bold"
        >
          Registration Successful!
        </motion.h2>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl mx-auto bg-[#1a1a1a] rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-[#3a3a3a]">
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-10"
          style={{ color: colors.blue }}
        >
          Team Registration
        </h1>

        {renderStepper()}

        <AnimatePresence mode="wait">
          {showSuccessAnimation ? (
            renderSuccessAnimation()
          ) : (
            <div className="mt-6 sm:mt-10">
              {currentStep === 1 && renderEmailStep()}
              {currentStep === 2 && renderTeamInfoStep()}
              {currentStep === 3 && renderTeamMembersStep()}
              {currentStep === 4 && renderPaymentStep()}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Stepper;
