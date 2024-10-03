import './AddTask.css';
import {useState} from 'react';
import axios from 'axios';

function AddTask(props){

    const[addTask, setAddTask] = useState({
        project_id: props.selectedProjectId,
        department_id: props.selectedDepartmentId,
        task_name:"",
        start_date:"",
        due_date:"",
        status:"",
        progress:"",
        description:"",
        person_in_charge:""
    })

    const handleChange = (e) => {
        setAddTask((prev) => ({...prev, [e.target.name]:e.target.value}));
        console.log("Add Task: ", addTask);
    }

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/tasks", addTask);
            props.setOpen(false);
            props.onUpdate();
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
                            {column.type === "singleSelect" ? 
                            <select name={column.headerName} value={addTask.status} onChange={handleChange} required> 
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select> :
                            <input type={column.type} placeholder={column.headerName} onChange={handleChange} name={column.field} required/> }
                        </div>
                    ))}
                    <button>Add Task</button>
                </form>
            </div>
        </div>
    );
}

export default AddTask;
