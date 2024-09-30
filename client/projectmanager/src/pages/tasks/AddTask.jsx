import './AddTask.css';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link  } from "react-router-dom";

function AddTask(props){

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
            props.setOpen(false);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="add">
            <div className="modal">
                <span className ="close" onClick={()=>props.setOpen(false)}>X</span>
                <h1>Create New Task</h1>
                <form onSubmit={handleClick}>
                    {props.columns.map((column)=>(
                        <div className="item" key={column.id}>
                            <label>{column.headerName}</label>
                            <input type={column.type} placeholder={column.field} onChange={handleChange} name={column.field} required/>
                        </div>
                    ))}
                    <button>Add Task</button>
                </form>
            </div>
        </div>
    );
}

export default AddTask;
