import React from 'react';
import { NavLink } from 'react-router';

const categories = ['programming', 'math', 'games', 'captcha'];

const Tasks = () => {
  return (
    <div className="space-y-4 font-Main">
      <h2 className=" text-2xl  font-semibold text-Gold">Task Categories</h2>
      <hr className='border-Gold border-2'/>
      <div className="tabs justify-center w-fit mx-auto tabs-boxed space-x-3">
        {categories.map((cat) => (
          <NavLink
            key={cat}
            to={`/tasks/${cat}`}
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive ? 'tab-active hover:bg-Muted/40' : 'tab-inactive hover:bg-Muted/40 hover:!text-Gold'
              }`
            }
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
