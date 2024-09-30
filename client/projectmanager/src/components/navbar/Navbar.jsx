import "./Navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "../dropdown/Dropdown";

const Navbar = () => {

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
            <Dropdown items={projects.map(project => project.project_name)} defaultSelected="Select a project"/>
            <Dropdown items={departments.map(department => department.department_name)} defaultSelected="Select a department"/>
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