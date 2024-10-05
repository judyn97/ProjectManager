import { BarChart } from '@mui/x-charts/BarChart';

function TaskBurdenBar({ tasks, selectedProjectId, selectedDepartmentId }) {
    // Filter only tasks that are "In Progress"
    const filteredTasks = tasks.filter(task => task.status === "In Progress");

    // Count tasks for each person in charge
    const taskCountByPerson = filteredTasks.reduce((acc, task) => {
        const person = task.person_in_charge;
        if (person) {
            acc[person] = (acc[person] || 0) + 1;
        }
        return acc;
    }, {});

    // Extract the xAxis (persons in charge) and series (task counts) data
    const members = Object.keys(taskCountByPerson); // Person names for the x-axis
    const taskCounts = Object.values(taskCountByPerson); // Task counts for the bar chart

    if( (selectedProjectId === 0) || (selectedDepartmentId === 0)){
        return <h2 className="not-selected">Please select a project and department first</h2>;
    }

    return (
        <div>
            <h2>Task Burden Bar</h2>
            <BarChart style={{backgroundColor: "white"}}
                xAxis={[{ scaleType: 'band', data: members }]} // xAxis with dynamic person names
                series={[{ data: taskCounts }]} // Series data with dynamic task counts
                width={1000}
                height={300}
                barLabel="value"
            />
        </div>
    );
}

export default TaskBurdenBar;
