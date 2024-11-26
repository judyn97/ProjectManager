import "./Navbar.css";
import { useEffect, useState } from "react";
import apiClient, {endpoints} from "../../api";
import Dropdown from "../dropdown/Dropdown";
import headerLogo from "../../assets/yamaha.svg";
import { signOut } from "supertokens-auth-react/recipe/session";
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import axios from 'axios';

const Navbar = (props) => {

    const [projects, setProjects] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [userName, setUserName] = useState("")
    
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

    const handleLogOut = async () => {
        await signOut();
        window.location.href = "/auth";
    }

    async function  getData(){
        try {
          const res = await axios.get('http://10.111.160.105:28001/get-user-info');
          console.log("metadata", res.data.emails[0]);
          setUserName(res.data.emails[0])
        } catch (err) {
          console.log(err);
        }
      }
      getData();

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
             <button className="logout-button" onClick={() => handleLogOut()}>Log Out</button>
             <img src="/assets/react.svg" alt="" className="icon"/>
             <span>{userName}</span>
            </div>
        </div>
    </div>
    
  )
}

export default Navbar;