import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import CurrentUser from "../../Hooks/CurrentUser";
import Loading from "../Loading/Loading";
import axios from "axios";
import { Link } from "react-router";
import ToggleProfile from "../ToggleProfile.jsx/ToggleProfile";

const StudentProfile = ({ role, setRole }) => {
  const { userDetails } = useContext(AuthContext);
  const { userCurrentData, loading } = CurrentUser(userDetails?.email);
  const [allQuestions, setAllQuestions] = useState([]);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [coinHistory, setCoinHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("solved");

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && userCurrentData?.email) {
        try {
          const allQRes = await axios.get(
            "https://tinytask-backend.vercel.app/all-questions"
          );
          setAllQuestions(allQRes.data.data);

          const solvedRes = await axios.get(
            `https://tinytask-backend.vercel.app/completed-task?email=${userCurrentData.email}`
          );
          setSolvedQuestions(solvedRes.data?.data?.solved || []);
          setCoinHistory(solvedRes.data?.data?.coinHistory || []);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
    };
    fetchData();
  }, [loading, userCurrentData]);

  if (loading) return <Loading />;
  const { username, photoURL, email, coin } = userCurrentData || {};

  const solvedWithDetails = solvedQuestions.map((item) => {
    const fullQ = allQuestions.find((q) => q._id === item.questionsID);
    return {
      questionName: fullQ?.questionName || "Unknown",
      questionID: item.questionsID,
      userSolution: item.questionsSolution,
      questionsCategory: item.questionsCategory,
    };
  });

  const solvedByCategory = solvedWithDetails.reduce((acc, item) => {
    acc[item.questionsCategory] = acc[item.questionsCategory] || [];
    acc[item.questionsCategory].push(item);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-[#111] min-h-screen">
      {/* Left: Student Info */}
      <div className="bg-Primary p-4 rounded-lg shadow-md border border-Gold md:col-span-1 text-center space-y-4">
        <img
          src={photoURL}
          alt={username}
          className="w-32 h-32 rounded-full mx-auto border-4 border-Gold"
        />
        <div>
          <h2 className="text-xl font-bold text-Gold">{username}</h2>
          <p className="text-Light text-sm">{email}</p>
          <p className="text-Light">
            <span className="font-semibold">Role:</span> {role}
          </p>
          <p className="text-Light">
            <span className="font-semibold">Coins:</span> {coin} 💰
          </p>
        </div>
        <div className="mt-10">
          <ToggleProfile onRoleChange={setRole} />
        </div>
      </div>

      {/* Right: Tabbed Section */}
      <div className="bg-Primary p-4 rounded-lg shadow-md border border-Gold md:col-span-3">
        <div className="tabs tabs-boxed mb-6">
          <button
            className={`tab ${
              activeTab === "solved" ? "tab-active" : "tab-inactive"
            }`}
            onClick={() => setActiveTab("solved")}
          >
            Solved Questions
          </button>
          <button
            className={`tab ${
              activeTab === "coins" ? "tab-active" : "tab-inactive"
            }`}
            onClick={() => setActiveTab("coins")}
          >
            Coin History
          </button>
          <button
            className={`tab ${
              activeTab === "category" ? "tab-active" : "tab-inactive"
            }`}
            onClick={() => setActiveTab("category")}
          >
            Category-wise Summary
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "solved" && (
          <div className="space-y-4">
            {solvedWithDetails.map((q, idx) => (
              <div
                key={idx}
                className="bg-[#222] p-4 rounded border border-Gold"
              >
                <p className="font-semibold text-white">
                  Q: {q.questionName}
                  <Link
                    to={`/tasks/${q.questionsCategory}?question=${q.questionID}`}
                    className="ml-3 text-Gold underline text-sm"
                  >
                    View
                  </Link>
                </p>
                <pre className="bg-black p-2 mt-2 rounded text-gray-300 whitespace-pre-wrap">
                  {q.userSolution}
                </pre>
              </div>
            ))}
          </div>
        )}

        {activeTab === "coins" && (
          <div className="text-Light">
            <ul className="space-y-2">
              {coinHistory.length === 0 && <li>No coin transactions found.</li>}

              {coinHistory.map((solvedItem, i) => {
                const isPositive = solvedItem.scoreChange > 0;
                return (
                  <li
                    key={`${i}`}
                    className={`bg-[#222] p-3 rounded border-l-4 ${
                      isPositive ? "text-Gold" : "text-Pinkish"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {solvedItem.scoreChange} Coins - {solvedItem.status}
                    {" for "}
                    (Question: {solvedItem.questionId})
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {activeTab === "category" && (
          <div className="text-Light space-y-4">
            {Object.keys(solvedByCategory).map((category) => (
              <div key={category}>
                <h4 className="text-Gold text-lg font-bold mb-2">{category}</h4>
                <ul className="pl-4 list-disc">
                  {solvedByCategory[category].map((q, i) => (
                    <li key={i}>
                      {q.questionName}
                      <Link
                        to={`/tasks/${q.questionsCategory}?question=${q.questionID}`}
                        className="ml-2 text-sm text-Gold underline"
                      >
                        View
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
