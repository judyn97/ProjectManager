import "./Navbar.css";
import { useEffect, useState, useMemo } from "react";
import apiClient, { endpoints } from "../../api";
import Dropdown from "../dropdown/Dropdown";
import headerLogo from "../../assets/yamaha.svg";
import { signOut } from "supertokens-auth-react/recipe/session";
import axios from 'axios';
import UserProfileDropdown from "../profileDropdown/ProfileDropdown";

const Navbar = (props) => {
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [userMetadata, setUserMetadata] = useState(null); 

  // Memoize user metadata to prevent unnecessary re-fetches
  const memoizedUserMetadata = useMemo(() => userMetadata, [userMetadata]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await apiClient.get(endpoints.projects);
        setProjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProjects();
  }, []);

  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        const res = await apiClient.get(endpoints.departments);
        setDepartments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDepartments();
  }, []);

  const handleLogOut = async () => {
    await signOut();
    window.location.href = "/auth";
  };

  // Fetch user metadata
  useEffect(() => {
    const fetchUserMetadata = async () => {
      try {
        const res = await axios.get('http://10.111.160.105:28001/user-profile');
        setUserMetadata(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserMetadata();
  }, []);


  return (
    <div className="navbar">
      <div className="logo">
        <img src={headerLogo} alt="" />
        <span>PDC Project Manager</span>
      </div>
      <div className="project-group">
        <Dropdown
          items={projects}
          selectedItem={props.selectedProject}
          setSelectedItem={props.setSelectedProject}
          setSelectedItemId={props.setSelectedProjectId}
        />
        <Dropdown
          items={departments}
          selectedItem={props.selectedDepartment}
          setSelectedItem={props.setSelectedDepartment}
          setSelectedItemId={props.setSelectedDepartmentId}
        />
      </div>
      <div className="user-profile">
        <UserProfileDropdown 
          handleLogOut={handleLogOut}
          memoizedUserMetadata={memoizedUserMetadata} 
        />
      </div>
    </div>
  );
};

export default Navbar;
