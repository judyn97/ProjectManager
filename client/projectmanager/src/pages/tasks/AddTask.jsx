import {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link  } from "react-router-dom";

function AddTask(){

    const[addTask, setAddTask] = useState({
        task_name:"",
        start_date:"",
        due_date:"",
        status:"",
        progress:"",
        description:"",
        person_in_charge:""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setAddTask((prev) => ({...prev, [e.target.name]:e.target.value}));
        console.log(addTask);
    }

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/tasks", addTask);
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="task-creation-form" id="task-creation-form">
            <h2>Create New Task</h2>
            <form id="task-form">
                <button id ="close-task-form" type="button"><Link to="/">X</Link></button>
                <label htmlFor="task-name">Task Name:</label>
                <input type="text" onChange={handleChange} name="task_name" required/>
            
                <label htmlFor="start_date">Start Date:</label>
                <input type="date" onChange={handleChange} name="start_date" required/>
            
                <label htmlFor="due_date">Due Date:</label>
                <input type="date" onChange={handleChange} name="due_date" required/>
            
                <label htmlFor="status">Status:</label>
                <select onChange={handleChange} name="status">
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <label htmlFor="progress">Progress:</label>
                <input type="number" min="0" max="100" onChange={handleChange} name="progress" required/>
            
                <label htmlFor="description">Description:</label>
                <textarea onChange={handleChange} name="description" rows="5"></textarea>
            
                <label htmlFor="person-in-charge">PIC Name:</label>
                <input type="text" onChange={handleChange} name="person_in_charge"/>
            
                <button id="add-task-form" type="button" onClick={handleClick} >Add Task</button>
            </form>
        </div>
    );
}

export default AddTask;
