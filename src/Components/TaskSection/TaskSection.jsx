import React from "react";
import { useNavigate } from "react-router";

const tasks = [
  { id: 1, title: "Math", icon: "math.png" },
  { id: 2, title: "Programming", icon: "programming.png" },
  { id: 3, title: "Games", icon: "games.png" },
  { id: 4, title: "Captcha", icon: "captcha.png" },
];

const TaskSection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-Gold py-16 px-4">
      <h2 className="text-center text-lg font-semibold mb-2 uppercase">
        Explore & Earn
      </h2>
      <h1 className="text-4xl font-bold text-center mb-6">Complete Tasks</h1>
      <p className="text-center text-gold/70 max-w-2xl mx-auto mb-12">
        Solve tasks to earn credits! Top performers get special rewards every
        hour.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border relative min-h-64 flex flex-col justify-center items-center border-Gold/30 rounded-xl p-8 text-center cursor-pointer transform hover:scale-105 hover:-translate-y-3 hover:shadow-[0_0_20px_#FFD700] transition-all duration-300 group"
            onClick={() => navigate(`/tasks/${task.title.toLowerCase()}`)}
          >
            <div className="flex justify-center mb-6 ">
              <img
                src={`/icons/${task.icon}`}
                alt={task.title}
                className="w-20 h-20 animate-pulse animation-2s ease-in-out"
              />
            </div>
            <h3 className="text-2xl text-Gold font-Main font-bold mb-4 animate-pulse animation-2s ease-in-out">
              {task.title}
            </h3>
            <button className="absolute -bottom-[1rem] left-1/2 transform -translate-x-1/2  bg-Muted text-Gold font-Main font-bold text-xl px-6 py-2 rounded-full shadow-md group-hover:bg-Gold group-hover:text-Muted transition-all duration-300">
              Play Now
            </button>
          </div>
        ))}

        {/* View More Card */}
        <div
          onClick={() => navigate("/tasks")}
          className="border border-dashed border-gold/30 rounded-xl p-8 text-center flex flex-col justify-center items-center transform hover:scale-105 hover:-translate-y-2 hover:text-Muted transition-all duration-300 hover:shadow-[0_0_20px_#FFD700] cursor-pointer"
        >
          <span className="text-5xl text-gold animate-pulse animation-2s ease-in-out">
            ➕
          </span>
          <h3 className="text-xl font-semibold mt-4 animate-pulse animation-2s ease-in-out ">
            View More Tasks
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TaskSection;
