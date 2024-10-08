import React, { useState } from 'react'
import './TaskBoard.css';
// import { PlusIcon } from 'lucide-react'

export default function Component() {
  const [tasks, setTasks] = useState({
    todo: [
      { id: 't1', content: 'Create login page' },
      { id: 't2', content: 'Design database schema' },
    ],
    inProgress: [
      { id: 't3', content: 'Develop API endpoints' },
    ],
    done: [
      { id: 't4', content: 'Project setup' },
    ],
  })
  const [draggedColumn, setDraggedColumn] = useState(null);


  // Task drag start
  const onDragStartTask = (e, id) => {
    e.stopPropagation(); // Prevent the event from reaching the column
    e.dataTransfer.setData('type', 'task'); // Mark as task drag
    e.dataTransfer.setData('id', id); // Store task id
  };

  // Column drag start
  const onDragStartColumn = (e, status) => {
    setDraggedColumn(status); // Set the dragged column
    e.dataTransfer.setData('type', 'column'); // Mark as column drag
    e.dataTransfer.setData('status', status); // Store column status
  };


  const onDragOver = (e) => {
    e.preventDefault();
  }


  // Handle dropping (for both tasks and columns)
const onDrop = (e, category) => {
  const type = e.dataTransfer.getData('type'); // Check the drag type (task or column)
  console.log(type)
  // Handle task dropping
  if (type === 'task') {
    let id = e.dataTransfer.getData('id');
    let newTasks = { ...tasks };
    let taskToMove;

    // Find and remove the dragged task from its original column
    for (let status in tasks) {
      const task = tasks[status].find(task => task.id === id);
      if (task) {
        taskToMove = task;
        newTasks[status] = newTasks[status].filter(task => task.id !== id);
      }
    }

    // Add the task to the new category (column)
    newTasks[category].push(taskToMove);
    setTasks(newTasks); // Update the tasks state
  }

  // Handle column dropping
  else if (type === 'column') {
    const targetColumn = category;
    const columns = Object.keys(tasks);
    const draggedIndex = columns.indexOf(draggedColumn);
    const targetIndex = columns.indexOf(targetColumn);

    // Reorder columns by swapping the dragged column with the target column
    columns.splice(draggedIndex, 1); // Remove dragged column
    columns.splice(targetIndex, 0, draggedColumn); // Insert dragged column at new position

    // Rebuild the task object with the reordered columns
    const reorderedTasks = {};
    columns.forEach(col => {
      reorderedTasks[col] = tasks[col];
    });

    setTasks(reorderedTasks); // Update state with reordered columns
    setDraggedColumn(null); // Reset the dragged column
  }
};


  const addTask = (status) => {
    const newTaskContent = prompt('Enter new task:')
    if (newTaskContent) {
      setTasks(prevTasks => ({
        ...prevTasks,
        [status]: [
          ...prevTasks[status],
          { id: `t${Date.now()}`, content: newTaskContent }
        ]
      }))
    }
  }

  const addColumn = () => {
    const columnName = prompt('Enter new column name:')
    if (columnName && !tasks[columnName]) {
      setTasks(prevTasks => ({
        ...prevTasks,
        [columnName.toLowerCase()]: []
      }))
    }
  }

  return (
    <div className="kanban-board">
      {/* Loop through each column */}
      {Object.keys(tasks).map(status => (
        <div 
          key={status} 
          className="kanban-column"
          draggable // Enable column dragging
          onDragStart={(e) => onDragStartColumn(e, status)} // Start dragging a column
          onDragOver={onDragOver} // Allow dragging over
          onDrop={(e) => onDrop(e, status)} // Handle both task and column drop here
        >
          <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
  
          {/* Loop through tasks in the column */}
          {tasks[status].map(task => (
            <div 
              key={task.id} 
              className="kanban-item"
              draggable // Enable task dragging
              onDragStart={(e) => onDragStartTask(e, task.id)} // Start dragging a task
            >
              {task.content}
            </div>
          ))}
  
          {/* Add Task Button */}
          <button className="add-task-btn" onClick={() => addTask(status)}>
            Add Task
          </button>
        </div>
      ))}
  
      {/* Add Column Button */}
      <button className="add-column-btn" onClick={addColumn}>
        Add Column
      </button>
    </div>
  );  
}