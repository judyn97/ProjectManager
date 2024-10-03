import './Task.css';
import {useState} from 'react';
import DataTable from '../../components/dataTable/dataTable';
import AddTask from './AddTask';
import EditTask from './EditTask';

function TaskList({ tasks, selectedProjectId, selectedDepartmentId, fetchAllTasks }){
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);


  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

    const columns = [
        {
          field: 'person_in_charge',
          headerName: 'PIC',
          width: 150,
          editable: true,
        },
        {
          field: 'task_name',
          headerName: 'Task name',
          width: 500,
          editable: true,
        },
        {
          field: 'start_date',
          headerName: 'Start Date',
          type: 'date',
          width: 110,
          editable: true,
          valueGetter: (value) => value && new Date(value),
          valueFormatter: (value) => formatDate(value),
        },
        {
            field: 'due_date',
            headerName: 'Due Date',
            type: 'date',
            width: 110,
            editable: true,
            valueGetter: (value) => value && new Date(value),
            valueFormatter: (value) => formatDate(value),
          },
          {
            field: 'status',
            headerName: 'Status',
            type: 'singleSelect',
            width: 150,
            editable: true,
          },
          {
            field: 'progress',
            headerName: 'Percentage',
            width: 150,
            editable: true,
          },
      ];

    const handleEdit = (task) => {
      const formattedTask = {
        ...task,
        start_date: formatDate(task.start_date),
        due_date: formatDate(task.due_date),
      };
      setEditingTask(formattedTask);
      setEditOpen(true);
    };
    
    return(
      <div className="task-list-container">
      <div className="info">
        <h2>Task List</h2>
        <button onClick={() => setOpen(true)}>
          Add Task
        </button>
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
        />
      )}
      {editOpen && (
        <EditTask
          task={editingTask}
          columns={columns}
          setOpen={setEditOpen}
          onUpdate={fetchAllTasks}
        />
      )}
    </div>
  );
}

export default TaskList;