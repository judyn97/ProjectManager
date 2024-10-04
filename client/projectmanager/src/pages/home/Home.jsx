import React from 'react';
import './home.css';
import ProgressCard from './ProgressCard';

const Home = ({unfilteredTasks}) => {
  return (
    <div className='home'>
        <div className="box box1">Box1</div>
        <div className="box box2"><ProgressCard departmentName={"Software"} departmentId={1} unfilteredTasks={unfilteredTasks}/></div>
        <div className="box box3"><ProgressCard departmentName={"Electrical"} departmentId={2} unfilteredTasks={unfilteredTasks}/></div>
        <div className="box box4"><ProgressCard departmentName={"Mechanical"} departmentId={3} unfilteredTasks={unfilteredTasks}/></div>
        <div className="box box5">Box5</div>
        <div className="box box6">Box6</div>
    </div>
  )
}

export default Home