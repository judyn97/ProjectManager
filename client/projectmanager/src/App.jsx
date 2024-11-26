import { useState, useEffect } from 'react';
import apiClient, {endpoints} from './api.js';
import './styles/global.css';
import TaskBurdenBar from "./pages/task-burden/TaskBurdenBar.jsx";
import BurnupChart from "./pages/burntUp/BurnUpChart.jsx";
import GanttChart from "./pages/gantt/GanttChart.jsx";
import TaskBoard from "./pages/board/TaskBoard.jsx";
import TaskList from "./pages/tasks/Task.jsx";
import AddTask from "./pages/tasks/AddTask.jsx";
import Login from "./pages/login/Login.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Menu from "./components/menu/Menu.jsx";
import Home from "./pages/home/Home.jsx";
import ProjectSetting from './pages/project-settings/ProjectSetting.jsx';

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

// SuperTokens imports
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import axios from 'axios';
import { getDataGridUtilityClass } from '@mui/x-data-grid';


const queryClient = new QueryClient();

// Initialize SuperTokens
SuperTokens.init({
  appInfo: {
    appName: "projectmanager",
    apiDomain: "http://10.111.160.105:28001",
    websiteDomain: "http://10.111.160.105:28000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(), 
    Session.init(),
    EmailVerification.init({
      mode: "REQUIRED", // or "OPTIONAL"
    }),
  ],
});

function App() {
  const [selectedProject, setSelectedProject] = useState('Select a project');
  const [selectedDepartment, setSelectedDepartment] = useState('Select a department');
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [unfilteredTasks, setUnfilteredTasks] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  const fetchBucketsList = async () => {
    try {
      const res = await apiClient.get(endpoints.buckets);
      setBucketList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBucketsList();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const res = await apiClient.get(endpoints.tasks);
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

  return (
    <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
          {/* Authentication routes */}
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [EmailPasswordPreBuiltUI,EmailVerificationPreBuiltUI])}

          {/* Protected app routes */}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<SessionAuth><Home unfilteredTasks={unfilteredTasks} selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId} /></SessionAuth>} />
            <Route path="/Task" element={<SessionAuth><TaskList tasks={tasks} selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId} fetchAllTasks={fetchAllTasks} bucketList={bucketList} /></SessionAuth>} />
            <Route path="/TaskBoard" element={<SessionAuth><TaskBoard tasksBucket={tasks} selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId} fetchAllTasks={fetchAllTasks} fetchBucketsList={fetchBucketsList} bucketList={bucketList} /></SessionAuth>} />
            <Route path="/AddTask" element={<SessionAuth><AddTask /></SessionAuth>} />
            <Route path="/GanttChart" element={<SessionAuth><GanttChart tasks={tasks} selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId} fetchAllTasks={fetchAllTasks} /></SessionAuth>} />
            <Route path="/BurnUpChart" element={<SessionAuth><BurnupChart tasks={tasks} selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId} /></SessionAuth>} />
            <Route path="/TaskBurdenBar" element={<SessionAuth><TaskBurdenBar tasks={tasks} selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId} /></SessionAuth>} />
            <Route path="/ProjectSetting" element={<SessionAuth><ProjectSetting/></SessionAuth>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SuperTokensWrapper>
  );
}

export default App
