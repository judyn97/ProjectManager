import './Events.css'
import AssignmentIcon from '@mui/icons-material/Assignment';


function UpcomingTask({departmentName, departmentId, unfilteredTasks}){

    function countdownDays(targetDateString) {
        const targetDate = new Date(targetDateString);
        const currentDate = new Date();
    
        // Reset time components to ensure only date comparison
        targetDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
    
        const timeDifference = targetDate - currentDate;
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
        return daysRemaining
    }
    
    console.log(countdownDays("2024-10-27"))

    return(
        <div className="event-container">
        <div className="event-header">
            <div className="event-header-title">
                <AssignmentIcon/>
                <h3>{departmentName} Upcoming Due Task</h3>
            </div>
        </div>
        <div>
            {unfilteredTasks.filter( item => 
                item.department_id === departmentId && countdownDays(item.due_date) < 7 && countdownDays(item.due_date) > 0
                ).map( (task) => (
                    <div className="event-list" key={task.task_id}>
                        <div  className="event-data">
                            <h4>{task.due_date}</h4>
                            <p className="event-title">{task.task_name}</p>
                            <p className="event-date-countdown">Due in {countdownDays(task.due_date)} days</p>
                        </div>
                    </div>
                ))}
        </div>
        </div>
    );
}

export default UpcomingTask;