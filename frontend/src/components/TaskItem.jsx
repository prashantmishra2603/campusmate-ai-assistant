import React from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { CalendarPlus, Trash2, Clock, BookOpen, AlertCircle, Bell, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const TaskItem = ({ task, onDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task.id}`);
      onDeleted(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task');
    }
  };

  const getCategoryIcon = () => {
    switch (task.category) {
      case 'Assignment': return <BookOpen className="w-4 h-4" />;
      case 'Exam': return <AlertCircle className="w-4 h-4" />;
      case 'Study': return <Clock className="w-4 h-4" />;
      case 'Reminder': return <Bell className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getClassificationStyles = () => {
    const cls = task.classification;
    if (cls === 'Urgent & Important') {
      return {
        badge: 'bg-red-500/10 text-red-600 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]',
        border: 'border-l-red-500',
        icon: <Sparkles className="w-3 h-3 ml-1 inline text-red-500 animate-pulse" />
      };
    } else if (cls === 'Urgent') {
      return {
        badge: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
        border: 'border-l-orange-500',
        icon: null
      };
    } else if (cls === 'Important') {
      return {
        badge: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
        border: 'border-l-purple-500',
        icon: null
      };
    }
    return {
      badge: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      border: 'border-l-blue-500',
      icon: null
    };
  };

  const classStyles = getClassificationStyles();

  // Google Calendar Link Generation
  const handleAddToCalendar = () => {
    const startDate = new Date(task.deadline);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    const formatForGCal = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const startStr = formatForGCal(startDate);
    const endStr = formatForGCal(endDate);
    const details = `Category: ${task.category}%0APriority: ${task.priority}%0AClassification: ${task.classification}`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(task.title)}&dates=${startStr}/${endStr}&details=${details}`;
    window.open(url, '_blank');
  };

  return (
    <div className={cn(
      "group relative flex flex-col sm:flex-row gap-5 justify-between p-5 bg-white/60 backdrop-blur-md border border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5 rounded-2xl transition-all duration-300 border-l-4 overflow-hidden",
      classStyles.border
    )}>
      {/* Decorative background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out skew-x-12 pointer-events-none" />

      <div className="flex flex-col gap-3 relative z-10">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-bold text-gray-800 text-lg group-hover:text-primary transition-colors">{task.title}</h3>
          <span className={cn("px-3 py-1 rounded-full text-xs font-bold border tracking-wide uppercase flex items-center", classStyles.badge)}>
            {task.classification}
            {classStyles.icon}
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-1.5 bg-gray-100/80 px-2.5 py-1 rounded-md">
            <Clock className="w-4 h-4 text-primary/70" />
            <span className="text-gray-700">{format(new Date(task.deadline), 'MMM d, h:mm a')}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-gray-100 rounded-md text-gray-600">{getCategoryIcon()}</div>
            <span>{task.category}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              {task.priority === 'High' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
              <span className={cn(
                "relative inline-flex rounded-full h-2.5 w-2.5",
                task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
              )}></span>
            </span>
            <span>{task.priority}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:opacity-0 sm:-translate-x-4 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-300 relative z-10">
        <button 
          onClick={handleAddToCalendar}
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary bg-primary/10 hover:bg-primary hover:text-white rounded-xl transition-colors tooltip shadow-sm"
          title="Add to Google Calendar"
        >
          <CalendarPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
        <button 
          onClick={handleDelete}
          className="p-2 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-colors tooltip shadow-sm"
          title="Delete Task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
