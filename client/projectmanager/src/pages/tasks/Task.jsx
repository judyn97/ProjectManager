import './Task.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import DataTable from '../../components/dataTable/dataTable';
import AddTask from './AddTask';

function TaskList({ selectedProjectId, selectedDepartmentId }){
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(()=> {
        const fetchAllTasks = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/tasks");
                const filteredTasks = res.data.filter(
                  item => 
                    item.project_id === selectedProjectId && item.department_id === selectedDepartmentId
                );                
                setTasks(filteredTasks);
            }catch(err){
                console.log(err);
            }
        }
        if (selectedProjectId && selectedDepartmentId) {
            fetchAllTasks();
          }
    }, [selectedProjectId, selectedDepartmentId])

    const columns = [
        // { field: 'task_id', headerName: 'ID', width: 90 },
        {
          field: 'person_in_charge',
          headerName: 'PIC',
          width: 150,
          editable: true,
        },
        {
          field: 'task_name',
          headerName: 'Task name',
          width: 150,
          editable: true,
        },
        {
          field: 'start_date',
          headerName: 'Start Date',
          type: 'date',
          width: 110,
          editable: true,
          valueGetter: (value) => value && new Date(value),
        },
        {
            field: 'due_date',
            headerName: 'Due Date',
            type: 'date',
            width: 110,
            editable: true,
            valueGetter: (value) => value && new Date(value),
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
    
    return(
        <div className="task-list-container">
            <div className="info">
                <h2>Task List</h2>
                <button onClick={()=> setOpen(true)}>
                    Add Task
                </button>
            </div>
            <DataTable columns={columns} rows={tasks}/>
            {open && <AddTask slug="AddTask" columns={columns} setOpen={setOpen} selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId}/>}
        </div>
    );
}

export default TaskList;