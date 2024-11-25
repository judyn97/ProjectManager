import "./Navbar.css";
import { useEffect, useState } from "react";
import apiClient, {endpoints} from "../../api";
import Dropdown from "../dropdown/Dropdown";
import headerLogo from "../../assets/yamaha.svg";

const Navbar = (props) => {

    const [projects, setProjects] = useState([]);
    const [departments, setDepartments] = useState([]);
    
    useEffect(()=> {
        const fetchAllProjects = async ()=>{
            try{
                const res = await apiClient.get(endpoints.projects);
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
                const res = await apiClient.get(endpoints.departments);
                setDepartments(res.data);
                console.log(departments);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllDepartments();
    }, [])

    const handleLogOut = () => {
        /*Handle Log Out Process here*/
    }

  return (
    <div className="navbar">
        <div className="logo">
            <img src={headerLogo} alt=""/>
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
             <button onClick={() => handleLogOut()}>Log Out</button>
             <img src="/assets/react.svg" alt="" className="icon"/>
             <span>Jalal</span>
            </div>
        </div>
    </div>
    
  )
}

export default Navbar;