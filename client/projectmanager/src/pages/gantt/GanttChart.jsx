import React from 'react';
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import './GanttChart.css';

function GanttChart({ tasks, selectedProjectId, selectedDepartmentId}) {
    function transformTasks(tasks) {
        return tasks.map(task => ({
            start: new Date(task.start_date),
            end: new Date(task.due_date),
            name: task.task_name,
            id: `Task ${task.task_id}`,
            type: 'task',
            progress: task.progress,
            isDisabled: task.status !== 'In Progress',
            styles: { 
                progressColor: '#ffbb54', 
                progressSelectedColor: '#ff9e0d' 
            },
        }));
    }

    function onClick(){
        alert("Clicked");
    }

    // if (isLoading) {
    //     return <div className="gantt-loading">Loading Gantt chart...</div>;
    // }

    // if (error) {
    //     return <div className="gantt-error">Error: {error.message}</div>;
    // }

    if( (selectedProjectId === 0) || (selectedDepartmentId === 0)){
        return <h2 className="not-selected">Please select a project and department first</h2>;
    }

    return (
        <div>
            <h2>Task Gantt Chart</h2>
            <div className="gantt-container">
                <Gantt
                    tasks={transformTasks(tasks)}
                    viewMode="Day"
                    columnWidth={60}
                    preStepsCount={2}
                    todayColor='grey'
                    onClick={onClick}
                />
            </div>
        </div>
    );
}

export default GanttChart;