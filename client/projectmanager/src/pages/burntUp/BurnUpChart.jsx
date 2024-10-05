import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { styled } from '@mui/system';
import './BurnUpChart.css'

const ChartContainer = styled('div')({
  width: '100%',
  height: 400,
  padding: '20px',
});

const BurnupChart = ({ tasks, selectedProjectId, selectedDepartmentId}) => {
  const processData = () => {

    //Create new array to avoid read-only error
    const newTasks = [...tasks];

    // Sort the tasks by start date
    const sortedData = newTasks.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    
    // Get the start and end dates of the entire project
    const startDate = new Date(sortedData[0].start_date);
    const endDate = new Date(sortedData[sortedData.length - 1].due_date);
    
    // Calculate the total number of days for the project
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    const chartData = [];
    let cumulativeProgress = 0;
    let idealProgress = 0;
    // Calculate the ideal daily progress increment
    const idealIncrement = 100 / totalDays;

    // Generate data points for each day of the project
    for (let i = 0; i <= totalDays; i++) {
      // Calculate the current date
      const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      
      // Find tasks that have started by the current date
      const tasksForDay = sortedData.filter(task => new Date(task.start_date) <= currentDate);
      
      // Calculate the cumulative progress for all started tasks
      cumulativeProgress = tasksForDay.reduce((sum, task) => sum + task.progress, 0);
      
      // Calculate the ideal progress for the current day
      idealProgress = Math.min(100, i * idealIncrement);

      // Add the data point to the chart data array
      chartData.push({
        date: currentDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        actual: cumulativeProgress,
        ideal: idealProgress,
      });
    }

    return chartData;
  };

  //Display fallback message if project and department not selected
  if( (selectedProjectId === 0) || (selectedDepartmentId === 0)){
    return <h2 className="not-selected">Please select a project and department first</h2>;
    }

  const chartData = processData();

  return (
    <div>
      <h2>Burnt Up Chart</h2>
      <ChartContainer className='burnUpChart-container'>
        <LineChart
          // Set the dimensions of the chart
          //width={800}
          //height={400}
          // Define the data series for the chart
          series={[
            { 
              data: chartData.map(d => d.actual), // Actual progress data
              label: 'Actual Progress', 
              color: '#8884d8' // Purple color for actual progress
            },
            { 
              data: chartData.map(d => d.ideal), // Ideal progress data
              label: 'Ideal Progress', 
              color: '#82ca9d' // Green color for ideal progress
            },
          ]}
          // Configure the X-axis
          xAxis={[{ 
            data: chartData.map(d => d.date), // Use dates for X-axis
            scaleType: 'band', // Use band scale for categorical data
          }]}
          // Configure the Y-axis
          yAxis={[{ 
            label: 'Progress (%)', // Label for Y-axis
          }]}
          // Custom styling for the chart
          sx={{
            '.MuiLineElement-root': {
              strokeWidth: 2, // Make lines thicker
            },
            '.MuiMarkElement-root': {
              stroke: '#fff', // White stroke for data points
              scale: '0.6', // Make data points smaller
              fill: 'currentColor', // Fill color same as line color
            },
          }}
        />
      </ChartContainer>
    </div>
  );
};

export default BurnupChart;