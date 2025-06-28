import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router";
import CodeEditorModal from "./CodeEditorModal";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import CurrentUser from "../../../Hooks/CurrentUser";

const Questions = () => {
  const loaderData = useLoaderData();
  const { userDetails } = useContext(AuthContext);
  const email = userDetails?.email;
  const { userCurrentData } = CurrentUser(email);
  const [questions, setQuestions] = useState(loaderData?.data || []);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Notification helper using SweetAlert2
  const Notification = (type, title, message) => {
    return Swal.fire({
      icon: type,
      title,
      text: message,
      showClass: {
        popup: `animate__animated animate__fadeInUp animate__faster`,
      },
      hideClass: {
        popup: `animate__animated animate__fadeOutDown animate__faster`,
      },
      color: "#e8c42d",
      background: "#14141a",
      confirmButtonColor: "#e8c42d",
      confirmButtonText: "&#x2715;",
      iconColor: type === "error" ? "Pinkish" : "Muted",
    });
  };

  // Fetch solved questions for current user
  const checkSolvedQuestions = async (Email) => {
    if (!Email) {
      setSolvedQuestions([]);
      return;
    }
    try {
      const response = await axios.get(`https://tinytask-backend.vercel.app/completed-task?email=${Email}`);
      const questionIDs = response.data.data?.solved.map((item) => item.questionsID) || [];
      setSolvedQuestions(questionIDs);
    } catch (error) {
      console.error("Error checking solved questions:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    // Safely check role, fallback to "" if no userCurrentData or role
    const userRole = userCurrentData?.role || "";

    // Only check solved questions if role is Player and email exists
    const emailToCheck = userRole === "Player" ? email : "";

    checkSolvedQuestions(emailToCheck);
    setQuestions(loaderData?.data || []);
    setLoading(false);
  }, [email, loaderData?.data, userCurrentData?.role]);

  // Sync modal open if questionId present in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const questionIdFromURL = params.get("question");

    if (questionIdFromURL && questions.length > 0) {
      const matchedQuestion = questions.find((q) => q._id === questionIdFromURL);
      if (matchedQuestion) {
        setSelectedQuestion(matchedQuestion);
        setIsModalOpen(true);
      }
    }
  }, [location.search, questions]);

  const handleQuestionClick = (question) => {
    if (userCurrentData?.role === "Seller") return; // Sellers can't click

    setSelectedQuestion(question);
    setIsModalOpen(true);

    const params = new URLSearchParams(window.location.search);
    params.set("question", question._id);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);

    const params = new URLSearchParams(window.location.search);
    params.delete("question");
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.replaceState(null, "", newUrl);
  };

  const handleSubmitCode = async (userCode, expectedOutput) => {
    if (!selectedQuestion) return;

    const isCorrect = userCode.trim() === expectedOutput.trim();
    const questionScore = selectedQuestion.questionScore || 0;
    const coinChange = isCorrect ? questionScore : -10;

    const completedTaskEntry = {
      emailID: email,
      questionsID: selectedQuestion._id,
      questionsSolution: userCode,
      questionsCategory: selectedQuestion.questionCategory,
    };

    const coinHistoryEntry = {
      email,
      questionId: selectedQuestion._id,
      scoreChange: coinChange,
      status: isCorrect ? "Correct" : "Wrong",
      timestamp: new Date(),
    };

    const updateUserCoin = async () => {
      try {
        await axios.post("https://tinytask-backend.vercel.app/coin-history", coinHistoryEntry);
        await axios.patch("https://tinytask-backend.vercel.app/update-coin", {
          email,
          coinChange,
        });
      } catch (error) {
        console.error("Coin update error:", error);
      }
    };

    if (isCorrect) {
      Notification("success", "Correct!", "Your answer is correct.").then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post("https://tinytask-backend.vercel.app/completed-task", completedTaskEntry);
            setSolvedQuestions((prev) => [...prev, selectedQuestion._id]);
            await updateUserCoin();
          } catch (error) {
            console.error("Failed to mark question as completed:", error);
          }
        }
      });
    } else {
      Notification("error", "Wrong Answer", "Your code does not match.");
      try {
        await updateUserCoin();
      } catch (error) {
        console.error("Error updating coin history for wrong answer:", error);
      }
    }

    handleModalClose();
  };

  if (loading) {
    return (
      <div className="flex items-start justify-center">
        <span className="loading loading-infinity w-12 text-Gold"></span>
      </div>
    );
  }

  return (
    <div className="text-Gold font-Main">
      {questions.length === 0 ? (
        <p className="w-fit mx-auto">No questions available for this category.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full rounded-lg shadow-md ">
            <thead className="bg-Primary text-lg text-Light">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Question Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Difficulty</th>
                <th className="p-4 text-left">Score</th>
                <th className="p-4 text-left">{userCurrentData?.role === "Seller" ? "Author" : "Status"}</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, index) => {
                const isSolved = solvedQuestions.includes(q._id);
                return (
                  <tr
                    key={q._id}
                    onClick={() => handleQuestionClick(q)}
                    className={`font-semibold font-Second text-Gold 
                      ${userCurrentData?.role === "Seller" ? "cursor-default" : "cursor-pointer"} 
                      nth-[even]:bg-Secondary/70 nth-[odd]:bg-Muted/70 
                      not-odd:hover:bg-Muted/30 not-even:hover:bg-Secondary/50 transition`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 capitalize">{q.questionName}</td>
                    <td className="p-3 capitalize">{q.questionCategory}</td>
                    <td className="p-3 capitalize">{q.questionDifficulty}</td>
                    <td className="p-3">{q.questionScore}</td>
                    <td className="p-3 font-Second font-bold">
                      {userCurrentData?.role === "Seller" ? (
                        <span className="font-Second font-medium">{q?.questionauthor || "Admin"}</span>
                      ) : isSolved ? (
                        <span className="text-Gold font-Second font-bold">Solved</span>
                      ) : (
                        <span className="text-Pinkish font-Second font-medium">Unsolved</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <CodeEditorModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        question={selectedQuestion}
        onSubmit={handleSubmitCode}
      />
    </div>
  );
};

export default Questions;
