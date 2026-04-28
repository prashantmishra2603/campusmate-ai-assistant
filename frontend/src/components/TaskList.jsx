import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTaskDeleted }) => {
  // Sort tasks by deadline (closest first) and then by priority
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
      <div className="text-center py-12 px-4 rounded-xl border border-dashed border-gray-300 bg-gray-50">
        <p className="text-gray-500">No tasks found. You are all caught up!</p>
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
