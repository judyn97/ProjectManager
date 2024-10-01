import "./Navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "../dropdown/Dropdown";

const Navbar = (props) => {

    const [projects, setProjects] = useState([]);
    const [departments, setDepartments] = useState([]);
    
    useEffect(()=> {
        const fetchAllProjects = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/projects");
                setProjects(res.data);
                console.log(projects);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllProjects();
    }, [])

    useEffect(()=> {
        const fetchAllDepartments = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/departments");
                setDepartments(res.data);
                console.log(departments);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllDepartments();
    }, [])

  return (
    <div className="navbar">
        <div className="logo">
            <img src="./assets/react.svg" alt=""/>
            <span>Pidishi Project Manager</span>
        </div>
        <div className="project-group">
            <Dropdown items={projects} selectedItem={props.selectedProject} setSelectedItem={props.setSelectedProject} setSelectedItemId={props.setSelectedProjectId}/>
            <Dropdown items={departments} selectedItem={props.selectedDepartment} setSelectedItem={props.setSelectedDepartment} setSelectedItemId={props.setSelectedDepartmentId}/>
        </div>
        <div className="icons">
            <img src="" alt="" className="icon"/>
            <img src="" alt="" className="icon"/>
            <img src="" alt="" className="icon"/>
            <div className="user">
             <img src="/assets/react.svg" alt="" className="icon"/>
             <span>Jalal</span>
            </div>
        </div>
    </div>
    
  )
}

export default Navbar;