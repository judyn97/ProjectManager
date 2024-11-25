import {React, useState} from 'react';
import { GanttOriginal, ViewMode } from "react-gantt-chart";
import "gantt-task-react/dist/index.css";
import './GanttChart.css';
import apiClient, {endpoints} from '../../api';

function GanttChart({ tasks, selectedProjectId, selectedDepartmentId, fetchAllTasks}) {
    const [isChecked, setIsChecked] = useState(true)

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
            await apiClient.put(endpoints.taskDate(task_id), submissionData);
            fetchAllTasks();
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
            await apiClient.put(endpoints.taskProgress(task_id), submissionData);
            fetchAllTasks();
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='gantt-container'>
            <div className='header-container'>
                <h2>Gantt Chart</h2>
            </div>
            <div className="gantt-box">
                <div className='Switch'>
                  <label className='Switch_Toggle'>
                    <input
                      type='checkbox'
                      defaultChecked={isChecked}
                      onClick={() => setIsChecked(!isChecked)}
                    />
                    <span className='Slider' />
                  </label>
                  Show Task List
                </div>
                <GanttOriginal
		        	tasks={transformTasks(tasks)}
		        	viewMode={ViewMode.Day}
                    todayColor='grey'
                    onDateChange={handleDateChange}
                    onProgressChange={handleProgressChange}
                    listCellWidth={isChecked ? "155px" : ""}
		        />
            </div>
        </div>
    );
}

export default GanttChart;