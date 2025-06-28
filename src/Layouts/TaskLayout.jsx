import React from 'react';
import Tasks from '../Components/TaskSection/Tasks';
import { Outlet } from 'react-router';

const TaskLayout = () => {
    return (
<div className="flex flex-col min-h-screen h-full task-section py-10 md:p-8">
      {/* Left Side - MainLayout (assumed to be a sidebar) */}
      <div className="max-w-6xl text-center mx-auto p-4">

      <Tasks></Tasks>

      </div>
      <hr className='border-2 border-Gold' />
      {/* Right Side - Outlet for Tasks component */}
      <div className="w-full p-4">
        <Outlet /> {/* Renders the Tasks component */}
      </div>
    </div>
    );
};

export default TaskLayout;