import { useState } from 'react';
import './styles/global.css';
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
          element: <Home />,
        },
        {
          path: "/Task",
          element: <TaskList selectedProjectId={selectedProjectId} selectedDepartmentId={selectedDepartmentId}/>,
        },
        {
          path: "/AddTask",
          element: <AddTask />,
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
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/' element={<TaskList/>}/>
          <Route path='/AddTask' element={<AddTask/>}/>
        </Routes>
      </BrowserRouter> */}
      <RouterProvider router={router} />
    </div>
  )
}

export default App
