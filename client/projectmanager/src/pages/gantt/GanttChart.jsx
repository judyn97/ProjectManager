import React from 'react';
import { GanttOriginal, ViewMode } from "react-gantt-chart";
import "gantt-task-react/dist/index.css";
import './GanttChart.css';
import axios from 'axios';

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

    // if (isLoading) {
    //     return <div className="gantt-loading">Loading Gantt chart...</div>;
    // }

    // if (error) {
    //     return <div className="gantt-error">Error: {error.message}</div>;
    // }

    if( (selectedProjectId === 0) || (selectedDepartmentId === 0)){
        return <h2 className="not-selected">Please select a project and department first</h2>;
    }

     // Handle date change when a task is dragged
     const handleDateChange = async (task) => {
        console.log(task)
        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const extractNumber = (str) => {
            const match = str.match(/\d+/);  // Find one or more digits
            return match ? Number(match[0]) : null;  // Convert to a number, or return null if no match
          };

        let task_id = extractNumber(task.id)

        const submissionData = {
            start_date: formatDate(task.start),
            due_date: formatDate(task.end),
          };
        try{
            await axios.put(`http://localhost:8800/tasks/${task_id}/date`, submissionData);
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleProgressChange = async (task) => {
        const submissionData = {
            progress: task.progress,
        };

        const extractNumber = (str) => {
          const match = str.match(/\d+/);  // Find one or more digits
          return match ? Number(match[0]) : null;  // Convert to a number, or return null if no match
        };

        let task_id = extractNumber(task.id)

        try{
            await axios.put(`http://localhost:8800/tasks/${task_id}/progress`, submissionData);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2>Task Gantt Chart</h2>
            <div className="gantt-container">
                <GanttOriginal
		        	tasks={transformTasks(tasks)}
		        	viewMode={ViewMode.Day}
                    todayColor='grey'
                    onDateChange={handleDateChange}
                    onProgressChange={handleProgressChange}
		        />
            </div>
        </div>
    );
}

export default GanttChart;