import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

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

    const handleDelete = async (id)=>{
        try {
            await axios.delete("http://localhost:8800/tasks/"+id);
            window.location.reload(); //In the future use redux
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <div id="task-list-container">

            <h2>Task List</h2>
            <select id="personInChargeFilter">
                <option value="all">All</option>
            </select>
            <button id="popup-add-task-form" type="button">
                <Link to="/AddTask">
                Add Task
                </Link>
            </button>
            <table id="task-list-table">
                <thead>
                    <tr>
                        <th>PIC</th>
                        <th>Task</th>
                        <th>Start Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Percentage</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="task-list-table-data">
                </tbody>
            </table>
            {tasks.map(task => (
                <div key={tasks.task_id}>
                    <td>{task.person_in_charge}</td>
                    <td>{task.task_name}</td>
                    <td>{task.start_date}</td>
                    <td>{task.due_date}</td>
                    <td>{task.status}</td>
                    <td>{task.percentage}</td>
                    <td>{task.action}</td>
                    <td><button id="edit-task" type="button" ><Link to="/AddTask">Edit</Link></button></td>
                    <td><button id="delete-task" type="button" onClick={()=>handleDelete(task.task_id)}>Delete</button></td>
                </div>
            ))}
        </div>
    );
}

export default TaskList;