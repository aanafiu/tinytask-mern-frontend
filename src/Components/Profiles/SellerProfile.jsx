import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import Loading from "../Loading/Loading";
import CurrentUser from "../../Hooks/CurrentUser";
import ToggleProfile from "../ToggleProfile.jsx/ToggleProfile";

const SellerProfile = ({ role, setRole }) => {
  const { userDetails } = useContext(AuthContext);
  const { userCurrentData, loading } = CurrentUser(userDetails?.email);

  const [questionName, setQuestionName] = useState("");
  const [sampleCode, setSampleCode] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("programming");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("submit");

  const [questions, setQuestions] = useState([]);
  const [summary, setSummary] = useState({});
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const [transactions, setTransactions] = useState([]);

  const user = userCurrentData || {};
  const { username, photoURL, email, coin, package: userPackage } = user;

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://tinytask-backend.vercel.app/seller-questions?email=${user.email}`)
        .then((res) => {
          setQuestions(res.data.questions || []);
          setSummary(res.data.statusCounts || {});
          setLoadingQuestions(false);
        })
        .catch((err) => {
          console.error("Failed to load questions", err);
          setLoadingQuestions(false);
        });
    }
  }, [user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (coin <= 0) {
      setErrorMsg("You don't have enough coins to submit a question.");
      return;
    }

    const questionData = {
      questionName,
      sampleCode,
      expectedOutput,
      questionCategory: category,
      questionDifficulty: difficulty,
      questionScore:
        difficulty === "easy" ? 25 : difficulty === "medium" ? 50 : 100,
      questionauthor: user.username,
      questionAuthorEmail: email,
      status: "pending",
    };

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        "https://tinytask-backend.vercel.app/request-question",
        questionData
      );
      if (res.data.success) {
        setSuccessMsg(
          "Question submitted successfully. Awaiting admin approval."
        );
        setErrorMsg("");
        setQuestionName("");
        setSampleCode("");
        setExpectedOutput("");
        setDifficulty("easy");
        setCategory("programming");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMsg("Failed to submit question.");
      setSuccessMsg("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFetchTransactions = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(
        `https://tinytask-backend.vercel.app/seller/dashboard-request?email=${user.email}`
      );
      if (res.data.success) {
        setTransactions(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load transactions", err);
    }
  };

  // Payment handler
  const handlePayNow = async (transaction) => {
    const data = {
      transactionId: transaction._id,
      packageName: transaction.packageName,
      packageCredit: parseInt(transaction.packageCredit),
      buyerEmail: user.email,
      buyerName: user.username,
    };
    console.log(data);

    try {
      const res = await axios.post(
        "https://tinytask-backend.vercel.app/payment-initialization",
        data
      );
      console.log(res.data);
      if (res.data?.GatewayPageURL) {
        window.location.replace(res.data.GatewayPageURL);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  if (!user?.email || loading) return <Loading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-Primary font-Main min-h-screen">
      <div className="p-4 rounded-lg shadow-md border border-Gold space-y-4 md:col-span-1 max-h-screen">
        <div
          className={`
            relative w-36 h-36 mx-auto rounded-full p-[5px]
            ${
              userPackage?.toLowerCase() === "regular"
                ? "bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_8px_2px_rgba(255,215,0,0.4)]"
                : userPackage?.toLowerCase() === "premium"
                ? "bg-gradient-to-tr from-pink-500 to-purple-600 shadow-[0_0_10px_2px_rgba(255,0,255,0.3)]"
                : userPackage?.toLowerCase() === "elite"
                ? "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 shadow-[0_0_12px_3px_rgba(255,255,255,0.2)]"
                : "bg-gray-500"
            }
          `}
        >
          <img
            src={photoURL}
            alt={username}
            className="w-full h-full object-cover rounded-full border-4 border-black"
          />
        </div>

        <h2 className="text-xl font-bold text-Gold text-center">{username}</h2>
        <p className="text-Light text-sm text-center">{email}</p>
        <p className="text-center text-Gold">
          <span className="font-semibold text-Light">Role:</span> {role}
        </p>
        <p className="text-center text-Gold">
          <span className="font-semibold text-Light">Coins:</span> {coin} 💰
        </p>
        <p className="text-center text-Gold">
          <span className="font-semibold text-Light capitalize">Package:</span>{" "}
          {userPackage.toUpperCase()}
        </p>

        <div className="pt-6 space-y-2">
          <button
            onClick={() => setActiveSection("submit")}
            className={`w-full py-2 px-4 rounded ${
              activeSection === "submit"
                ? "bg-Gold text-black"
                : "bg-gray-800 text-white hover:bg-Gold hover:text-black"
            }`}
          >
            ✍️ Submit Question
          </button>
          <button
            onClick={() => setActiveSection("history")}
            className={`w-full py-2 px-4 rounded ${
              activeSection === "history"
                ? "bg-Gold text-black"
                : "bg-gray-800 text-white hover:bg-Gold hover:text-black"
            }`}
          >
            📜 Question History
          </button>
          <button
            onClick={() => {
              setActiveSection("transactions");
              handleFetchTransactions();
            }}
            className={`w-full py-2 px-4 rounded ${
              activeSection === "transactions"
                ? "bg-Gold text-black"
                : "bg-gray-800 text-white hover:bg-Gold hover:text-black"
            }`}
          >
            💰 View Transactions
          </button>

          <div className="md:col-span-4 mt-6">
            <ToggleProfile onRoleChange={setRole} />
          </div>
        </div>
      </div>

      <div className="bg-Primary p-6 rounded-lg shadow-md border border-Gold md:col-span-3 space-y-8">
        {activeSection === "submit" && (
          <div>
            <h2 className="text-2xl font-bold text-Gold mb-4">
              Submit a New Question
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Difficulty */}
              <div>
                <label className="block text-Light mb-2 text-lg">
                  Difficulty
                </label>
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

              {/* Category */}
              <div>
                <label className="block text-Light mb-2 text-lg">
                  Category
                </label>
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

              <div>
                <label className="text-Light block mb-2 text-lg">
                  Question Name
                </label>
                <textarea
                  rows="2"
                  value={questionName}
                  onChange={(e) => setQuestionName(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="text-Light block mb-2 text-lg">
                  Sample Code
                </label>
                <textarea
                  rows="5"
                  value={sampleCode}
                  onChange={(e) => setSampleCode(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 text-white font-mono border border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="text-Light block mb-2 text-lg">
                  Expected Output
                </label>
                <textarea
                  rows="3"
                  value={expectedOutput}
                  onChange={(e) => setExpectedOutput(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 text-white font-mono border border-gray-600"
                  required
                />
              </div>

              {successMsg && <p className="text-green-500">{successMsg}</p>}
              {errorMsg && <p className="text-red-500">{errorMsg}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-Gold text-Muted py-2 px-6 rounded hover:bg-Muted hover:text-Gold transition"
              >
                {isSubmitting ? "Submitting..." : "Submit (Cost: 1 coin)"}
              </button>
            </form>
          </div>
        )}

        {activeSection === "transactions" && (
          <div className="mt-6 overflow-x-auto">
            <h3 className="text-2xl font-bold text-Gold mb-4">
              💸 Purchase Transactions
            </h3>
            {transactions.length === 0 ? (
              <p className="text-Light">No transactions found.</p>
            ) : (
              <table className="table w-full text-sm text-left text-Light">
                <thead>
                  <tr className="bg-Gold text-Primary">
                    <th>Package</th>
                    <th>Credits</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, idx) => (
                    <tr
                      key={idx}
                      className="bg-gray-800 border-b border-gray-700"
                    >
                      <td className="capitalize">{tx.packageName}</td>
                      <td>{tx.packageCredit}</td>
                      <td className="capitalize">{tx.status}</td>
                      <td>{new Date(tx.timestamp).toLocaleString()}</td>
                      <td>
                        {tx.status === "pending" && (
                          <button
                            onClick={() => handlePayNow(tx)}
                            className="bg-Gold text-black px-4 py-1 rounded hover:bg-yellow-500 transition"
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeSection === "history" && (
          <div className="overflow-x-auto">
            <div className="border-b border-Gold pb-6">
              <h3 className="text-xl font-bold text-Gold my-2">
                📊 Your Question Summary
              </h3>
              {loadingQuestions ? (
                <p className="text-Light">Loading questions...</p>
              ) : (
                <ul className="text-Light space-y-1">
                  <li>Total Questions: {questions.length}</li>
                  <li>Accepted: {summary.approved}</li>
                  <li>Denied: {summary.denied}</li>
                  <li>Pending: {summary.pending}</li>
                </ul>
              )}
            </div>
            <h3 className="text-xl font-bold text-Gold my-4">
              📝 Question History
            </h3>
            {questions.length === 0 ? (
              <p className="text-Light">No questions submitted yet.</p>
            ) : (
              <table className="table w-full text-sm text-left text-Light">
                <thead>
                  <tr className="bg-Gold text-Primary">
                    <th>Title</th>
                    <th>Status</th>
                    <th>Difficulty</th>
                    <th>Category</th>
                    <th>Solved Count</th>
                  </tr>
                </thead>
                <tbody>
                  {questions
                    .sort((a, b) => (b.solvedCount || 0) - (a.solvedCount || 0))
                    .map((q, i) => (
                      <tr
                        key={i}
                        className="bg-gray-800 border-b border-gray-700"
                      >
                        <td>{q.questionName}</td>
                        <td className="capitalize">{q.status}</td>
                        <td className="capitalize">{q.questionDifficulty}</td>
                        <td className="capitalize">{q.questionCategory}</td>
                        <td>{q.solvedCount || 0}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfile;
