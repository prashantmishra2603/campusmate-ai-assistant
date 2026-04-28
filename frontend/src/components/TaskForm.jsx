import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Loader2 } from 'lucide-react';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('Assignment');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        title,
        deadline,
        priority,
        category
      });
      onTaskAdded(response.data);
      setTitle('');
      setDeadline('');
      setPriority('Low');
      setCategory('Assignment');
    } catch (error) {
      console.error('Failed to add task:', error);
      alert('Failed to add task');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-white/50 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-white transition-all duration-300 shadow-sm text-gray-800 placeholder-gray-400";
  const labelClasses = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClasses}>Task Title</label>
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputClasses}
          placeholder="What needs to be done?"
        />
      </div>
      
      <div>
        <label className={labelClasses}>Deadline</label>
        <input 
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          className={inputClasses}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>Priority</label>
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={inputClasses}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div>
          <label className={labelClasses}>Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClasses}
          >
            <option value="Assignment">Assignment</option>
            <option value="Exam">Exam</option>
            <option value="Study">Study</option>
            <option value="Reminder">Reminder</option>
          </select>
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={submitting}
        className="group relative w-full mt-6 overflow-hidden rounded-xl p-[1px] transition-all hover:shadow-lg hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-500 to-secondary opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
        <div className="relative flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl text-white font-semibold">
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Add to Schedule</span>
            </>
          )}
        </div>
      </button>
    </form>
  );
};

export default TaskForm;
