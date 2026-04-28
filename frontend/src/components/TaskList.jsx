import React from 'react';
import TaskItem from './TaskItem';
import { PartyPopper } from 'lucide-react';

const TaskList = ({ tasks, onTaskDeleted }) => {
  const priorityWeight = { High: 3, Medium: 2, Low: 1 };
  
  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = new Date(a.deadline).getTime();
    const timeB = new Date(b.deadline).getTime();
    
    if (timeA !== timeB) {
      return timeA - timeB;
    }
    
    return priorityWeight[b.priority] - priorityWeight[a.priority];
  });

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-3xl border-2 border-dashed border-gray-200 bg-white/40">
        <div className="w-16 h-16 bg-gradient-to-tr from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-green-500/20">
          <PartyPopper className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">You're all caught up!</h3>
        <p className="text-gray-500 max-w-sm">No tasks found. Take a break, relax, or add a new task to get started on your next goal.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedTasks.map(task => (
        <TaskItem key={task.id} task={task} onDeleted={onTaskDeleted} />
      ))}
    </div>
  );
};

export default TaskList;
