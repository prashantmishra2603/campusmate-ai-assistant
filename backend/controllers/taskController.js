const { db } = require('../config/firebase');

// Smart Decision Logic
const classifyTask = (deadline, priority, category) => {
  const now = new Date();
  const taskDeadline = new Date(deadline);
  const diffInHours = (taskDeadline - now) / (1000 * 60 * 60);

  const isUrgent = diffInHours >= 0 && diffInHours <= 48;
  const isImportant = priority === 'High' || category === 'Exam';

  if (isUrgent && isImportant) return 'Urgent & Important';
  if (isUrgent) return 'Urgent';
  if (isImportant) return 'Important';
  return 'Normal';
};

const getTasks = async (req, res) => {
  try {
    const tasksSnapshot = await db.collection('tasks').get();
    const tasks = tasksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Sort tasks in backend (or frontend, let's do frontend mostly, but we can do a basic sort here)
    // We'll let frontend handle complex sorting, just return them.
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, deadline, priority, category } = req.body;
    
    if (!title || !deadline || !priority || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const classification = classifyTask(deadline, priority, category);
    
    const newTask = {
      title,
      deadline,
      priority,
      category,
      classification,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('tasks').add(newTask);
    res.status(201).json({ id: docRef.id, ...newTask });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Failed to add task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('tasks').doc(id).delete();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
  getTasks,
  addTask,
  deleteTask
};
