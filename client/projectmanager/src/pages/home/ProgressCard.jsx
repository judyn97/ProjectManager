import CircularProgressWithLabel from './CircularProgress'; 
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import './ProgressCard.css';
import NewTaskCard from './NewTaskCard';

function ProgressCard({ departmentName, departmentId, unfilteredTasks }) {
  const departmentTasks = unfilteredTasks.filter(
    (department) => department.department_id === departmentId
  );
  const totalTask = departmentTasks.length;
  const completedTask = departmentTasks.filter(
    (task) => task.status === 'Done'
  ).length;
  const percentageCompleted = (completedTask / totalTask) * 100;

  if (totalTask === 0) {
    return (
        <div className='progress-container-grid'>
        <div className="progresscard-container grid-1">
            <div className='header-container'>
                <div className='header-title'>
                    <DonutLargeIcon/>
                    <h3>{departmentName} Progress</h3>
                </div>
                <div>
                    <h3>No task yet</h3>
                </div>
            </div>
        </div>
        </div>
    );
  }

  return (
    <div className='progress-container-grid'>
        <div className="progresscard-container grid-1">
            <div className='header-container'>
                <div className='header-title'>
                    <DonutLargeIcon/>
                    <h3>{departmentName} Progress</h3>
                </div>
            </div>
          <div>
            <CircularProgressWithLabel value={percentageCompleted}/>
          </div>
          <p>
            {completedTask} of {totalTask} tasks completed
          </p>
        </div>
        <div className="progresscard-container grid-2">
          <span className='this-week-text'>This week</span>
          <div className='new-task-section'>
              <NewTaskCard unfilteredTasks = {unfilteredTasks} departmentId={departmentId}/>
              <span className='this-week-text'>New Task</span>
          </div>
          <div className='done-task-section'>
              <span className='this-week-text'>TBD</span>
          </div>
        </div>
    </div>
  );
}

export default ProgressCard;
