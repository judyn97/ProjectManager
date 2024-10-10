import { useState, useEffect } from 'react'
import './TaskBoard.css';
import axios from 'axios';
// import { PlusIcon } from 'lucide-react'

export default function Component({tasksBucket, selectedProjectId, selectedDepartmentId,fetchAllTasks, fetchBucketsList, bucketList}) {
  const [tasks, setTasks] = useState({})
  const [draggedColumn, setDraggedColumn] = useState(null);

  useEffect(() => {
    const groupedTasks = tasksBucket.reduce((acc, task) => {
      const bucket = task.bucket_name;
      if (!acc[bucket]) {
        acc[bucket] = [];
      }
      acc[bucket].push({ id: task.task_id, content: task.task_name });
      return acc;
    }, {});
    setTasks(groupedTasks);
  }, [tasksBucket])
  

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
const onDrop = async (e, category) => {
  const type = e.dataTransfer.getData('type'); // Check the drag type (task or column)
  // Handle task dropping
  if (type === 'task') {
    let id = e.dataTransfer.getData('id');
    const numericId = parseInt(id, 10);
    let newTasks = { ...tasks };
    let taskToMove;

    // Find and remove the dragged task from its original column
    for (let status in tasks) {
      const task = tasks[status].find(task => task.id === numericId);

      if (task) {
        taskToMove = task;
        newTasks[status] = newTasks[status].filter(task => task.id !== id);
      }
    }

    // Add the task to the new category (column)
    if (taskToMove) {
      //newTasks[category].push(taskToMove);

      // Find the new bucket_id from the bucketList
      const newBucket = bucketList.find(bucket => bucket.bucket_name === category);
      const newBucketId = newBucket ? newBucket.bucket_id : null;

      // Make a PUT request to update the bucket_id in the database
      if (newBucketId) {
        try {
          await axios.put(`http://localhost:8800/tasks/${numericId}/bucket`, {
            bucket_id: newBucketId,
          });
          fetchAllTasks();
          console.log(`Task ${numericId} updated with new bucket_id: ${newBucketId}`);
        } catch (error) {
          console.error("Error updating bucket_id:", error);
        }
      }
    }
  
    setTasks(newTasks); // Update the tasks state
  }

  // Handle column dropping
  else if (type === 'column') {
    const targetColumn =  bucketList.find(pos=> pos.bucket_name === category).position;
    const bucketId =  bucketList.find(pos=> pos.bucket_name === category).bucket_id;
    const columns = bucketList.map((pos)=> pos.position);

    // const draggedIndex = columns.indexOf(draggedColumn);
    // const targetIndex = columns.indexOf(targetColumn);
    const draggedBucketId = bucketList.find(pos => pos.position === draggedColumn).bucket_id;
    const draggedIndex = draggedColumn;
    const targetIndex = targetColumn;

    // Reorder columns by swapping the dragged column with the target column
    columns.splice(draggedIndex, 1); // Remove dragged column
    columns.splice(targetIndex, 0, draggedColumn); // Insert dragged column at new position

    try {
      // First request: Update dragged column's position
      await axios.put(`http://localhost:8800/buckets/updatePosition`, {
        bucket_id: draggedBucketId,
        new_position: targetIndex
      });

      // Second request: Update target column's position
      await axios.put(`http://localhost:8800/buckets/updatePosition`, {
          bucket_id: bucketId,
          new_position: draggedIndex
      });

        fetchBucketsList();
        //console.log(`Columns updated: Dragged Column ID ${draggedColumn} to position ${targetIndex}, Target Column ID ${targetColumn} to position ${draggedIndex}`);
      } catch (error) {
        console.error("Error updating Columns:", error);
      }
    

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

  if( (selectedProjectId === 0) || (selectedDepartmentId === 0)){
    return <h2 className="not-selected">Please select a project and department first</h2>;
  }

  return (
    <div className="kanban-board">
      {/* Loop through bucketList to create columns */}
      {bucketList
      .slice()
      .sort((a,b)=> a.position - b.position)
      .map(bucket => (
        <div 
          key={bucket.bucket_id} 
          className="kanban-column"
          draggable 
          onDragStart={(e) => onDragStartColumn(e, bucket.position)} 
          onDragOver={onDragOver} 
          onDrop={(e) => onDrop(e, bucket.bucket_name)}
        >
          <h2>{bucket.bucket_name.charAt(0).toUpperCase() + bucket.bucket_name.slice(1)}</h2>

          {/* Loop through tasks in the column */}
          {tasks[bucket.bucket_name]?.map(task => (
            <div 
              key={task.id} 
              className="kanban-item"
              draggable
              onDragStart={(e) => onDragStartTask(e, task.id)}
            >
              {task.content}
            </div>
          ))}

          {/* Add Task Button */}
          <button className="add-task-btn" onClick={() => addTask(bucket.bucket_name)}>
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