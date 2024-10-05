import React from 'react';
import './home.css';
import ProgressCard from './ProgressCard';
import LeftAlignedTimeline from '../../components/timeline/Timeline.jsx';

const Home = ({unfilteredTasks, selectedProjectId, selectedDepartmentId}) => {

  if( (selectedProjectId === 0) || (selectedDepartmentId === 0)){
    return <h2 className="not-selected">Please select a project and department first</h2>;
  }
  
  return (
    <div className='home'>
        <div className="box box1"><LeftAlignedTimeline/></div>
        <div className="box box2"><ProgressCard departmentName={"Software"} departmentId={1} unfilteredTasks={unfilteredTasks}/></div>
        <div className="box box3"><ProgressCard departmentName={"Electrical"} departmentId={2} unfilteredTasks={unfilteredTasks}/></div>
        <div className="box box4"><ProgressCard departmentName={"Mechanical"} departmentId={3} unfilteredTasks={unfilteredTasks}/></div>
        <div className="box box5">PIC Table Software</div>
        <div className="box box6">PIC Table Electrical</div>
        <div className="box box7">PIC Table Mechanical</div>
    </div>
  )
}

export default Home