import './Task.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import DataTable from '../../components/dataTable/dataTable';

function TaskList(){
    const [tasks, setTasks] = useState([]);

    useEffect(()=> {
        const fetchAllTasks = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/tasks");
                setTasks(res.data);
                console.log(res.data.person_in_charge)
                console.log(res.data)
            }catch(err){
                console.log(err);
            }
        }
        fetchAllTasks();
    }, [])

    const columns = [
        { field: 'task_id', headerName: 'ID', width: 90 },
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
                <select id="personInChargeFilter">
                    <option value="all">All</option>
                </select>
                <button id="popup-add-task-form" type="button">
                    <Link to="/AddTask">
                    Add Task
                    </Link>
                </button>
            </div>
            <DataTable columns={columns} rows={tasks}/>
        </div>
    );
}

export default TaskList;