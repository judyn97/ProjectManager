import './Task.css';
import {useState} from 'react';
import DataTable from '../../components/dataTable/dataTable';
import AddTask from './AddTask';
import EditTask from './EditTask';
import { columns } from '../../utils/taskColumnData';

function TaskList({ tasks, selectedProjectId, selectedDepartmentId, fetchAllTasks, bucketList }){
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);


  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

    const handleEdit = (task) => {
      const formattedTask = {
        ...task,
        start_date: formatDate(task.start_date),
        due_date: formatDate(task.due_date),
      };
      setEditingTask(formattedTask);
      setEditOpen(true);
    };

    if( (selectedProjectId === 0) || (selectedDepartmentId === 0)){
      return <h2 className="not-selected">Please select a project and department first</h2>;
    }
    
    return(
      <div className="task-list-container">
      <div className="info">
        <div className='header-container'>
          <h2>Task List</h2>
          <button className='add-button' onClick={() => setOpen(true)}>
            Add Task
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        rows={tasks}
        onEdit={handleEdit}
        onDelete={fetchAllTasks}
      />
      {open && (
        <AddTask
          slug="AddTask"
          columns={columns}
          setOpen={setOpen}
          onUpdate={fetchAllTasks}
          selectedProjectId={selectedProjectId}
          selectedDepartmentId={selectedDepartmentId}
          bucketList={bucketList}
        />
      )}
      {editOpen && (
        <EditTask
          task={editingTask}
          columns={columns}
          setOpen={setEditOpen}
          onUpdate={fetchAllTasks}
          bucketList={bucketList}
        />
      )}
    </div>
  );
}

export default TaskList;