import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ProgressCard.css'

function ProgressCard({departmentName, departmentId, unfilteredTasks}){

    const departmentTasks = unfilteredTasks.filter( department => department.department_id === departmentId );
    const totalTask = departmentTasks.length;
    const completedTask = departmentTasks.filter( task => task.status === 'Done').length;
    const percentageCompleted = completedTask/totalTask * 100;

    if(totalTask === 0)
    {
        return (
            <div className='progresscard-container'>
                <h2>{departmentName}</h2>
                <h3>No task yet</h3>
            </div>
        
        );
    }

    return(
        <div className='progresscard-container'>
            <h2>{departmentName}</h2>
            <div style={{ width: 150, height: 200 }}>
                <CircularProgressbar value={percentageCompleted} text={`${percentageCompleted}%`}/>
            </div>
            <p>{completedTask} of {totalTask} tasks completed</p>
        </div>
    );
}

export default ProgressCard;