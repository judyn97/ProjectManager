import './AddTask.css';
import { useState } from 'react';
import axios from 'axios';
import Comments from '../../components/comments/Comment';

function EditTask({ task, columns, setOpen, onUpdate }) {
  const [editTask, setEditTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateForSubmission = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        ...editTask,
        start_date: formatDateForSubmission(editTask.start_date),
        due_date: formatDateForSubmission(editTask.due_date),
      };
      await axios.put(`http://localhost:8800/tasks/${task.task_id}`, submissionData);
      setOpen(false);
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Edit Task</h1>
        <form onSubmit={handleSubmit}>
          {columns.map((column) => (
            <div className="item" key={column.field}>
              <label htmlFor={column.field}>{column.headerName}</label>
              {column.type === "singleSelect" ? 
                <select name={column.field} value={editTask.status} onChange={handleChange} required> 
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select> :
              <input
                id={column.field}
                type={column.type === 'date' ? 'date' : 'text'}
                name={column.field}
                value={editTask[column.field] || ''}
                onChange={handleChange}
                required={column.field !== 'progress'}
              />}
            </div>
          ))}
          <button type="submit">Update Task</button>
          <Comments taskId={task.task_id}/>
        </form>
      </div>
    </div>
  );
}

export default EditTask;