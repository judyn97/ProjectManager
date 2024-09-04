// script.js
let currentProject = 'Project 1';
let currentGroup = 'Software';
let ganttChartInstance = null;  // Store the chart instance
let burnUpChartInstance = null;  // Store the chart instance

// Event listeners
document.getElementById('personInChargeFilter').addEventListener('change',() => {
    updateTaskList();    // Update task list based on the filter
    updateGanttChart();  // Update Gantt chart based on the filter
    });

function selectProject(projectName) {
    currentProject = projectName;
    document.getElementById('selected-project-name').innerText = projectName;
    updateTaskList();
    updateGanttChart();
    updateCFD();
    populateDropdown();
}

function selectGroup(groupName) {
    currentGroup = groupName;
    document.getElementById('selected-project-name').innerText = groupName;
    updateTaskList();
    updateGanttChart();
    updateCFD();
    populateDropdown();
}

// Populate the dropdown with unique personInCharge values
function populateDropdown() {
    const dropdown = document.getElementById('personInChargeFilter');
    
    // Clear any existing options
    dropdown.innerHTML = '<option value="all">All</option>';
    
    const personSet = new Set();

    // Iterate over the tasks in the current project and group
    projects[currentProject][currentGroup].forEach(task => {
        personSet.add(task.personInCharge);
    });

    // Add the unique personInCharge values to the dropdown
    personSet.forEach(person => {
        const option = document.createElement('option');
        option.value = person;
        option.textContent = person;
        dropdown.appendChild(option);
    });
}

function showGanttChart() {
    document.getElementById('gantt-chart-container').style.display = 'block';
    document.getElementById('cfd-container').style.display = 'none';
}

function showCFD() {
    document.getElementById('gantt-chart-container').style.display = 'none';
    document.getElementById('cfd-container').style.display = 'block';
}

function closeTaskForm() {
    document.getElementById('task-creation-form').style.display = 'none';
}

function popupAddTaskForm() {
    document.getElementById('task-creation-form').style.display = 'block';
}

function drawChart() {

    const selectedPerson = document.getElementById('personInChargeFilter').value;
    const data = {
        datasets: []
    };

    const tasks = projects[currentProject][currentGroup]
        .filter(task => selectedPerson === 'all' || task.personInCharge === selectedPerson);

    if(tasks.length !== 0){
        const formattedTasks = tasks.map(task => ({
            x: [task.startDate, task.dueDate], // Use startDate and dueDate
            y: task.taskName,                  // Use taskName for Y-axis
            name: task.personInCharge,         // Assign the person in charge
            status: task.status              // Assign the task status
        }));
    
        const colours = ['rgba(255, 26, 104, 1','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)'];
    
        // Push formatted tasks into the dataset
        data.datasets.push({
            label: 'Project Tasks',
            data: formattedTasks,
            backgroundColor: (ctx) => {
                let x;
                switch(ctx.raw.status){
                    case 'Completed':
                        x = 2;
                        break;
                    case 'In Progress':
                        x = 1;
                        break;
                    case 'Not Started':
                        x = 0;
                        break;
                    default:
                        break;
                }
                return colours[x];
            },
            borderColor: (ctx) => {
                let x;
                switch(ctx.raw.status){
                    case 'Completed':
                        x = 2;
                        break;
                    case 'In Progress':
                        x = 1;
                        break;
                    case 'Not Started':
                        x = 0;
                        break;
                    default:
                        break;
                }
                return colours[x];
            },
            borderWidth: 1,
            borderSkipped: false,
            borderRadius: 10,
            barPercentage: 0.5
        });
    
        const todayLine = {
            id: 'todayLine',
            afterDatasetsDraw(chart, args, pluginOptions) {
                const { ctx, data, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
            
                ctx.save();
                /* Today line */
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(102,102,102,1)';
                ctx.setLineDash([6, 6]);
                ctx.moveTo(x.getPixelForValue(new Date()), top);
                ctx.lineTo(x.getPixelForValue(new Date()), bottom);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            
                /* Today arrow */
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(102,102,102,1)';
                ctx.fillStyle = 'rgba(102,102,102,1)';
                ctx.moveTo(x.getPixelForValue(new Date()), top + 3);
                ctx.lineTo(x.getPixelForValue(new Date()) - 6, top - 6);
                ctx.lineTo(x.getPixelForValue(new Date()) + 6, top - 6);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.restore();
            
                ctx.font = 'bold 12px sans-serif';
                ctx.fillStyle = 'rgba(102,102,102,1)';
                ctx.textAlign = 'center';
                ctx.fillText('Today', x.getPixelForValue(new Date()), bottom + 15);
                ctx.restore();
            
            }
        };
    
        const status = {
            id: 'status',
            afterDatasetsDraw(chart, args, pluginOptions) {
                const { ctx, data, options, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
            
                const icons = ['\uf00d','\uf110','\uf00c'];
                const angle = Math.PI / 180;
                const paddingRight = options.layout.padding.right;
                
                ctx.save();
                ctx.font = 'bold 12px FontAwesome';
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                data.datasets[0].data.forEach((datapoint, index) => {
                    let x;
                    switch(datapoint.status){
                        case 'Completed':
                            x = 2;
                            break;
                        case 'In Progress':
                            x = 1;
                            break;
                        case 'Not Started':
                            x = 0;
                            break;
                        default:
                            break;
                    }
                
                    /* Status circle */
                    ctx.beginPath();
                    ctx.fillStyle = colours[x];
                    ctx.arc(right + (paddingRight / 2),y.getPixelForValue(index), 12, 0, angle * 360, false);
                    ctx.closePath();
                    ctx.fill();
                
                    ctx.fillStyle = 'white';
                    ctx.fillText(icons[x], right + (paddingRight / 2), y.getPixelForValue(index));
                });
            
                /* Status title */
                ctx.fillStyle = 'black';
                ctx.font = 'bold 12px sans-serif';
                ctx.fillText('Status', right + (paddingRight / 2) , top - 15);
                ctx.restore();
            }
        };
    
        const assignedTask = {
            id: 'assignedTask',
            afterDatasetsDraw(chart, args, pluginOptions) {
                const { ctx, data, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
            
                ctx.save();
                ctx.font = 'bold 12px sans-serif';
                ctx.fillStyle = 'black';
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'left';
                data.datasets[0].data.forEach((datapoint, index) => {
                    ctx.fillText(datapoint.name, 10, y.getPixelForValue(index));
                });
                ctx.fillText('Names', 10, top - 15);
                ctx.restore();
            }
        };

        //Weekend plugin block
        const weekend = {
            id: 'weekend',
            beforeDatasetsDraw(chart, args, pluginOptions) {
                const { ctx,  chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                ctx.save();

                x.ticks.forEach((tick, index) => {
                    const day = new Date(tick.value).getDay();
                    if(day === 6 || day === 0)
                    {
                        ctx.fillStyle = pluginOptions.weekendColor;
                        ctx.fillRect(x.getPixelForValue(tick.value),top,x.getPixelForValue(new Date(tick.value).setHours(24)) - x.getPixelForValue(tick.value),height);
                    }
                })
            }
        }
    
    
        const config = {
            type: 'bar',
            data,
            options: {
                layout: {
                    padding: {
                        left: 100,
                        right: 100,
                        bottom: 20,
                    }
                },
                indexAxis: 'y',
                scales: {
                    x: {
                        position: 'top',
                        type: 'time',
                        time: {
                            //unit: 'day',
                            displayFormats: {
                                day: 'd'
                            }
                        },
                        min: '2024-08-01',
                        max: '2024-08-31' // Adjust based on your dataset
                    }
                },
                plugins: {
                    weekend: {
                        weekendColor: 'rgba(102,102,102, 0.2)'
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        displayColors: false,
                        yAlign: 'bottom',
                        callbacks: {
                            label: (ctx) => {
                                return '';
                            },
                            /* Bar hover title */
                            title: (ctx) => {
                                
                                const startDate = new Date(ctx[0].raw.x[0]);
                                const endDate = new Date(ctx[0].raw.x[1]);
                                const formattedStartDate = startDate.toLocaleString([],
                                {year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                });
                                const formattedEndDate = endDate.toLocaleString([],
                                    {year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    });
                                return [ctx[0].raw.name,`Deadline: ${formattedStartDate} - ${formattedEndDate}`];
                            }
                        }
                    }
                }
            },
            plugins: [todayLine, assignedTask, status, weekend]
        };
        
        // Destroy the previous chart instance if it exists
        if (ganttChartInstance) {
            ganttChartInstance.destroy();
        }
    
        // Render the new chart
        ganttChartInstance = new Chart(
            document.getElementById('myChart'),
            config
        );
        
    }
    else{
        if (ganttChartInstance) {
            ganttChartInstance.destroy();
        }
    }

}

function chartFilter(date){
    const year = date.value.substring(0,4);
    const month = date.value.substring(5, 7);

    const lastDay = (y,m) =>{
        return new Date(y, m, 0).getDate();
    }

    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-${lastDay(year,month)}`;

    ganttChartInstance.config.options.scales.x.min = startDate;
    ganttChartInstance.config.options.scales.x.max = endDate;
    ganttChartInstance.update();
}

function drawBUChart() {
    // Data for the tasks
    const tasks = projects[currentProject][currentGroup];
    if(tasks.length !== 0){
        // Extracting the dates and progress
        const labels = tasks.map(task => task.dueDate);

        // Cumulative task completion (burn-up line)
        let cumulativeTasksCompleted = 0;
        const cumulativeProgressData = tasks.map(task => {
            cumulativeTasksCompleted += task.progress / 100;
            return cumulativeTasksCompleted;
        });

        // Total number of tasks (scope line)
        const totalTasks = tasks.length;
        const totalTasksData = Array(labels.length).fill(totalTasks);

        // Destroy the previous chart instance if it exists
        if (burnUpChartInstance) {
            burnUpChartInstance.destroy();
        }

        // Configuring the chart
        const ctx = document.getElementById('burnUpChart').getContext('2d');
        burnUpChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Cumulative Tasks Completed',
                        data: cumulativeProgressData,
                        borderColor: 'green',
                        fill: false,
                    },
                    {
                        label: 'Total Tasks',
                        data: totalTasksData,
                        borderColor: 'red',
                        borderDash: [5, 5],
                        fill: false,
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: totalTasks,
                        title: {
                            display: true,
                            text: 'Tasks Completed'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Task End Date'
                        }
                    }
                }
            }
        });
    }
    else{
        // Destroy the previous chart instance if it exists
        if (burnUpChartInstance) {
            burnUpChartInstance.destroy();
        }
    }
}

function updateGanttChart() {

    const gcContainer = document.getElementById('GCchartBox');

    const tasks = projects[currentProject][currentGroup];
    if (tasks.length === 0) {
        gcContainer.innerHTML = '<p>No data to display in Gantt Chart.</p>';
    }
    else{
        gcContainer.innerHTML = '<canvas id="myChart"></canvas><input type="month" onChange="chartFilter(this)"/>';
    }
    drawChart();
}

function updateCFD() {
    const cfdContainer = document.getElementById('BUchartBox');

    const tasks = projects[currentProject][currentGroup];
    if (tasks.length === 0) {
        console.log("hell");
        console.log(cfdContainer);
        cfdContainer.innerHTML = '<p>No data to display in CFD.</p>';
    }
    else{
        cfdContainer.innerHTML = '<canvas id="burnUpChart"></canvas>';
    }

    drawBUChart();

    
    /* Save for later
    const statusStages = ["Not Started", "In Progress", "Completed"];
    const stageCounts = statusStages.map(stage => tasks.filter(task => task.status === stage).length);

    const cfdChart = document.createElement('div');
    cfdChart.className = 'cfd-chart';

    statusStages.forEach((stage, index) => {
        const stageBar = document.createElement('div');
        stageBar.className = 'cfd-stage';
        stageBar.style.height = `${stageCounts[index] * 20}px`; // Height proportional to the number of tasks
        stageBar.innerText = `${stage}: ${stageCounts[index]}`;
        cfdChart.appendChild(stageBar);
    });

    cfdContainer.appendChild(cfdChart);
    */
}

let projects = {
    'Project 1': {
        'Software': [
            {
                taskName: 'Study phase',
                startDate: '2024-08-01',
                dueDate: '2024-08-10',
                status: 'Completed',
                progress: 100,
                description: 'Teach event driven system',
                personInCharge: 'Jalal'
            },
            {
                taskName: 'Development Phase',
                startDate: '2024-08-11',
                dueDate: '2024-08-25',
                status: 'In Progress',
                progress: 50,
                description: 'Developing the MCU system',
                personInCharge: 'Amirah'
            },
            {
                taskName: 'Testing Phase',
                startDate: '2024-08-26',
                dueDate: '2024-09-05',
                status: 'Not Started',
                progress: 0,
                description: 'Testing the GUI Implementation',
                personInCharge: 'Hazman'
            },
            // More tasks...
        ],
        'Electrical': [
            {
                taskName: 'Study phase',
                startDate: '2024-08-01',
                dueDate: '2024-08-10',
                status: 'Completed',
                progress: 100,
                description: 'MCU Port Settings',
                personInCharge: 'Auni'
            },
            {
                taskName: 'Development Phase',
                startDate: '2024-08-11',
                dueDate: '2024-08-25',
                status: 'In Progress',
                progress: 50,
                description: 'Developing the MCU system',
                personInCharge: 'Anissa'
            },
            // Tasks for Electrical department...
        ],
        'Mechanical': [
            // Tasks for Mechanical department...
        ]
    },
    'Project 2': {
        'Software': [
            {
                taskName: 'Study phase',
                startDate: '2024-08-01',
                dueDate: '2024-08-10',
                status: 'Completed',
                progress: 100,
                description: 'Teach event driven system',
                personInCharge: 'Jalal'
            }
        ],
        'Electrical': [],
        'Mechanical': []
    },
    'Project 3': {
        'Software': [],
        'Electrical': [],
        'Mechanical': []
    }
};

function addTask() {
    const taskName = document.getElementById('task-name').value;
    const startDate = document.getElementById('start-date').value;
    const dueDate = document.getElementById('due-date').value;
    const status = document.getElementById('status').value;
    const description = document.getElementById('description').value;
    const personInCharge = document.getElementById('person-in-charge').value;

    // Form validation
    if (!taskName || !startDate || !dueDate || !status || !personInCharge) {
        alert('Please fill out all required fields.');
        return;
    }

    const newTask = {
        taskName,
        startDate,
        dueDate,
        status,
        description,
        personInCharge
    };

    projects[currentProject][currentGroup].push(newTask);
    updateTaskList();
    updateGanttChart();
    updateCFD();

    // Clear the form
    document.getElementById('task-form').reset();

    closeTaskForm();
    alert('Task added successfully!');
}

function updateTaskList() {
    const selectedPerson = document.getElementById('personInChargeFilter').value;
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear current task list

    projects[currentProject][currentGroup]
        .filter(task => selectedPerson === 'all' || task.personInCharge === selectedPerson)
        .forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <h3>${task.taskName}</h3>
                <p><strong>Start Date:</strong> ${task.startDate}</p>
                <p><strong>Due Date:</strong> ${task.dueDate}</p>
                <p><strong>Status:</strong> ${task.status}</p>
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Person in Charge:</strong> ${task.personInCharge}</p>
                <button>Edit</button>
                <button>Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
}

// Initialize with default project
selectProject(currentProject);
