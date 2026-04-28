import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { LayoutDashboard, ListTodo } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskDeleted = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      <div className="lg:col-span-4 space-y-6">
        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
          {/* Decorative gradient orb */}
          <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Create Task</h2>
          </div>
          <div className="relative z-10">
            <TaskForm onTaskAdded={handleTaskAdded} />
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-8">
        <div className="glass-panel rounded-3xl p-6 lg:p-8 min-h-[500px]">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary">
                <ListTodo className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">Your Upcoming Schedule</h2>
            </div>
            <div className="text-sm font-medium px-3 py-1 bg-gray-100/80 rounded-full text-gray-600">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </div>
          </div>
          
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium animate-pulse">Loading your tasks...</p>
            </div>
          ) : (
            <div className="relative">
              <TaskList tasks={tasks} onTaskDeleted={handleTaskDeleted} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
