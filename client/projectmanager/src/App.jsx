import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/global.css';
import TaskBurdenBar from "./pages/task-burden/TaskBurdenBar.jsx";
import BurnupChart from "./pages/burntUp/BurnUpChart.jsx";
import GanttChart from "./pages/gantt/GanttChart.jsx";
//import TaskBoard from "./pages/board/TaskBoard.jsx";
import TaskList from "./pages/tasks/Task.jsx";
import AddTask from "./pages/tasks/AddTask.jsx";
import Login from "./pages/login/Login.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Menu from "./components/menu/Menu.jsx";
import Home from "./pages/home/Home.jsx";

import {createBrowserRouter, BrowserRouter, Routes, Route, RouterProvider, Outlet} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

function App() {
  const [selectedProject, setSelectedProject] = useState('Select a project');
  const [selectedDepartment, setSelectedDepartment] = useState('Select a department');
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [unfilteredTasks, setUnfilteredTasks] = useState([]);


  const fetchAllTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8800/tasks");
      setUnfilteredTasks(res.data);
      const filteredTasks = res.data.filter(
        item =>
          item.project_id === selectedProjectId && item.department_id === selectedDepartmentId
      );
      setTasks(filteredTasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedProjectId && selectedDepartmentId) {
      fetchAllTasks();
    }
  }, [selectedProjectId, selectedDepartmentId]);


  const Layout = () =>{
    return(
      <div className='main'>
        <Navbar selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                setSelectedProjectId={setSelectedProjectId}
                setSelectedDepartmentId={setSelectedDepartmentId}/>
        <div className="container">
          <div className="menuContainer">
            <Menu/>
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home unfilteredTasks={unfilteredTasks}/>,
        },
        {
          path: "/Task",
          element: <TaskList tasks={tasks} selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId} fetchAllTasks={fetchAllTasks}/>,
        },
        {
          path: "/AddTask",
          element: <AddTask />,
        },
        {
          path: "/GanttChart",
          element: <GanttChart tasks={tasks} selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId}/>,
        },
        {
          path: "/BurnUpChart",
          element: <BurnupChart tasks={tasks} selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId}/>,
        },
        {
          path: "/TaskBurdenBar",
          element: <TaskBurdenBar tasks={tasks} selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId}/>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
