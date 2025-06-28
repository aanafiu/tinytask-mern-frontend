import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Loading from "../Loading/Loading";

const Admin = () => {
  const location = useLocation();
  console.log(location.pathname);

  const [activeView, setActiveView] = useState("addQuestion");

  // Add Question states
  const [questionName, setQuestionName] = useState("");
  const [sampleCode, setSampleCode] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("programming");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // All Questions states

  const [allQuestions, setAllQuestions] = useState([]);
  const [allLoading, setAllLoading] = useState(false);

  useEffect(() => {
    if (activeView === "allQuestions") {
      fetchAllQuestions();
    }
  }, [activeView]);

  const fetchAllQuestions = async () => {
    try {
      setAllLoading(true);
      const res = await axios.get("https://tinytask-backend.vercel.app/all-questions");
      setAllQuestions(res.data.data || []);
      setAllLoading(false);
    } catch (error) {
      console.error("Error fetching all questions:", error);
      setAllLoading(false);
    }
  };

  // Seller Questions states
  const [sellerQuestions, setSellerQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch seller questions when tab is activated
  useEffect(() => {
    if (activeView === "sellerQuestions") {
      fetchSellerQuestions();
    }
  }, [activeView]);

  const fetchSellerQuestions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://tinytask-backend.vercel.app/seller-questions");
      setSellerQuestions(
        res.data.questions.filter((q) => q.status === "pending")
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching seller questions:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      // 1. Update the question status
      const res = await axios.patch(
        `https://tinytask-backend.vercel.app/update-question-status/${id}`,
        {
          status,
        }
      );

      console.log("Status update response:", res.data);

      // 2. If approved, get the full question and send to /post-questions
      if (status === "approved") {
        const selectedQuestion = sellerQuestions.find((q) => q._id === id);
        if (selectedQuestion) {
          const {
            questionName,
            sampleCode,
            expectedOutput,
            questionCategory,
            questionDifficulty,
          } = selectedQuestion;

          const questionData = {
            questionName,
            sampleCode,
            expectedOutput,
            questionCategory,
            questionDifficulty,
            questionScore:
              questionDifficulty === "easy"
                ? 25
                : questionDifficulty === "medium"
                ? 50
                : 100,
            questionauthor: selectedQuestion.questionauthor || "admin",
            solvedCount: 0,
          };

          const postRes = await axios.post(
            "https://tinytask-backend.vercel.app/post-questions",
            questionData
          );
          console.log("Question approved and posted:", postRes.data);
        }
      }

      // 3. Refresh the seller questions list
      fetchSellerQuestions();
    } catch (error) {
      console.error("Failed to update status or post question:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      questionName,
      sampleCode,
      expectedOutput,
      questionCategory: category,
      questionDifficulty: difficulty,
      questionScore:
        difficulty === "easy" ? 25 : difficulty === "medium" ? 50 : 100,
      questionauthor: "admin",
      solvedCount: 0,
    };

    try {
      const response = await axios.post(
        "https://tinytask-backend.vercel.app/post-questions",
        questionData
      );
      console.log("Server response:", response.data);
      setSuccessMsg("Question posted successfully!");
      setErrorMsg("");

      // Clear form
      setQuestionName("");
      setSampleCode("");
      setExpectedOutput("");
      setDifficulty("easy");
      setCategory("programming");
    } catch (error) {
      console.error("Error posting question:", error);
      setErrorMsg("Failed to post question");
      setSuccessMsg("");
    }
  };

  return (
    <div className="flex h-screen text-Gold font-Main">
      {/* Left Section - Dynamic Content */}
      <div className="w-full p-8 overflow-y-auto bg-Primary">
        {activeView === "addQuestion" && (
          <>
            <h2 className="text-3xl font-bold mb-6">Add New Question</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Difficulty Tabs */}
              <div>
                <label className="block mb-2 text-lg">Problem Difficulty</label>
                <div className="tabs tabs-boxed">
                  {["easy", "medium", "hard"].map((level) => (
                    <a
                      key={level}
                      className={`tab capitalize ${
                        difficulty === level ? "tab-active" : "tab-inactive"
                      }`}
                      onClick={() => setDifficulty(level)}
                    >
                      {level}
                    </a>
                  ))}
                </div>
              </div>

              {/* Category Tabs */}
              <div>
                <label className="block mb-2 text-lg">Problem Category</label>
                <div className="tabs tabs-boxed">
                  {["programming", "math", "captcha", "game"].map((cat) => (
                    <a
                      key={cat}
                      className={`tab capitalize ${
                        category === cat ? "tab-active" : "tab-inactive"
                      }`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </div>

              {/* Question Name */}
              <div>
                <label className="block mb-2 text-lg">Question Name</label>
                <textarea
                  rows="3"
                  value={questionName}
                  onChange={(e) => setQuestionName(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
                  placeholder="Enter question title"
                  required
                />
              </div>

              {/* Sample Code */}
              <div>
                <label className="block mb-2 text-lg">Sample Code</label>
                <textarea
                  rows="6"
                  value={sampleCode}
                  onChange={(e) => setSampleCode(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 text-white font-mono border border-gray-600 focus:outline-none"
                  placeholder="Enter sample code"
                  required
                ></textarea>
              </div>

              {/* Expected Output */}
              <div>
                <label className="block mb-2 text-lg">Expected Output</label>
                <textarea
                  rows="4"
                  value={expectedOutput}
                  onChange={(e) => setExpectedOutput(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 text-white font-mono border border-gray-600 focus:outline-none"
                  placeholder="Enter expected output"
                  required
                ></textarea>
              </div>

              {/* Messages */}
              {successMsg && <p className="text-green-500">{successMsg}</p>}
              {errorMsg && <p className="text-red-500">{errorMsg}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </>
        )}

        {activeView === "sellerQuestions" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Seller Questions</h2>
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : sellerQuestions.length === 0 ? (
              <p className="text-gray-400">No seller questions found.</p>
            ) : (
              <div className="space-y-6">
                {sellerQuestions.map((q) => (
                  <div
                    key={q._id}
                    className="border border-gray-600 p-4 rounded bg-gray-800"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {q.questionName}
                    </h3>
                    <pre className="text-sm bg-gray-900 p-2 mt-2 rounded overflow-x-auto text-green-300">
                      {q.sampleCode}
                    </pre>
                    <pre className="text-sm bg-gray-900 p-2 mt-2 rounded overflow-x-auto text-yellow-300">
                      Output: {q.expectedOutput}
                    </pre>
                    <p className="mt-2 text-sm text-gray-400">
                      Category: {q.questionCategory} | Difficulty:{" "}
                      {q.questionDifficulty}
                    </p>
                    <p className="text-sm text-blue-400">
                      Status: <span className="capitalize">{q.status}</span>
                    </p>

                    <div className="mt-4 space-x-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                        onClick={() => handleStatusChange(q._id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                        onClick={() => handleStatusChange(q._id, "denied")}
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeView === "allQuestions" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">All Approved Questions</h2>

            {allLoading ? (
              <p className="text-white">Loading...</p>
            ) : allQuestions.length === 0 ? (
              <p className="text-gray-400">No questions found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allQuestions.map((q) => (
                  <div
                    key={q._id}
                    className="border border-gray-600 p-4 rounded bg-gray-800"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {q.questionName}
                    </h3>
                    <pre className="text-sm bg-gray-900 p-2 mt-2 rounded overflow-x-auto text-green-300">
                      {q.sampleCode}
                    </pre>
                    <pre className="text-sm bg-gray-900 p-2 mt-2 rounded overflow-x-auto text-yellow-300">
                      Output: {q.expectedOutput}
                    </pre>
                    <p className="mt-2 text-sm text-gray-400">
                      Category:{" "}
                      <span className="capitalize">{q.questionCategory}</span> |
                      Difficulty:{" "}
                      <span className="capitalize">{q.questionDifficulty}</span>{" "}
                      | Score:{" "}
                      <span className="text-white">{q.questionScore}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Sidebar - Menu */}
      <div className="w-1/3 bg-gray-800 border-l border-gray-700 p-6">
        <h3 className="text-xl font-semibold mb-4">Admin Menu</h3>
        <ul className="space-y-3">
          <li
            className={`cursor-pointer hover:underline ${
              activeView === "addQuestion" ? "text-yellow-400" : ""
            }`}
            onClick={() => setActiveView("addQuestion")}
          >
            Add Question
          </li>
          <li
            className={`cursor-pointer hover:underline ${
              activeView === "sellerQuestions" ? "text-yellow-400" : ""
            }`}
            onClick={() => setActiveView("sellerQuestions")}
          >
            Seller Questions
          </li>
          <li
            className={`cursor-pointer hover:underline ${
              activeView === "allQuestions" ? "text-yellow-400" : ""
            }`}
            onClick={() => setActiveView("allQuestions")}
          >
            All Questions
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
