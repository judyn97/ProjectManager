let currentProject = 'Project 1';
let currentGroup = 'Software';

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
            {
                taskName: 'Integration Phase',
                startDate: '2024-09-06',
                dueDate: '2024-09-15',
                status: 'Not Started',
                progress: 0,
                description: 'Integrating the components',
                personInCharge: 'Ali'
            }
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
            {
                taskName: 'Wiring Phase',
                startDate: '2024-08-26',
                dueDate: '2024-09-05',
                status: 'Not Started',
                progress: 0,
                description: 'Wiring the control units',
                personInCharge: 'Farid'
            }
        ],
        'Mechanical': [
            {
                taskName: 'Design phase',
                startDate: '2024-08-01',
                dueDate: '2024-08-15',
                status: 'Completed',
                progress: 100,
                description: 'Designing the enclosure',
                personInCharge: 'Hafiz'
            },
            {
                taskName: 'Fabrication Phase',
                startDate: '2024-08-16',
                dueDate: '2024-08-30',
                status: 'In Progress',
                progress: 60,
                description: 'Fabricating the mechanical parts',
                personInCharge: 'Aiman'
            }
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
            }
        ],
        'Mechanical': [
            {
                taskName: 'Design phase',
                startDate: '2024-08-01',
                dueDate: '2024-08-15',
                status: 'Completed',
                progress: 100,
                description: 'Designing the enclosure',
                personInCharge: 'Hafiz'
            }
        ]
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

    // Clear the form
    document.getElementById('task-form').reset();

    closeTaskForm();
    alert('Task added successfully!');
}

function closeTaskForm() {
    document.getElementById('task-creation-form').style.display = 'none';

     // Clear the form
     document.getElementById('task-form').reset();
}

function popupAddTaskForm() {
    document.getElementById('add-task-form').style.display = 'block'; //Default task form button display state
    document.getElementById('save-task-form').style.display = 'none'; //Default task form button display state
    document.getElementById('task-creation-form').style.display = 'block';
}

function editTask(index) {
    // Get the task to be edited
    const task = projects[currentProject][currentGroup][index];

    // Populate form with current task details
    document.getElementById('task-name').value = task.taskName;
    document.getElementById('start-date').value = task.startDate;
    document.getElementById('due-date').value = task.dueDate;
    document.getElementById('status').value = task.status;
    document.getElementById('description').value = task.description;
    document.getElementById('person-in-charge').value = task.personInCharge;

    // Display the task form for editing
    popupAddTaskForm();
    document.getElementById('save-task-form').style.display = 'block';  //Display save button in task form
    document.getElementById('add-task-form').style.display = 'none';    //Hide add task button in task form

    // When the form is submitted, update the task
    document.getElementById('save-task-form').onclick = function() {
        // Update the task with new values
        task.taskName = document.getElementById('task-name').value;
        task.startDate = document.getElementById('start-date').value;
        task.dueDate = document.getElementById('due-date').value;
        task.status = document.getElementById('status').value;
        task.description = document.getElementById('description').value;
        task.personInCharge = document.getElementById('person-in-charge').value;

        updateTaskList(); // Refresh the task list

        // Clear the form
        document.getElementById('task-form').reset();
    
        closeTaskForm(); // Close the form
        alert('Task updated successfully!');
    };
}


function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        // Remove the task from the projects object
        projects[currentProject][currentGroup].splice(index, 1);

        updateTaskList(); // Refresh the task list

        //alert('Task deleted successfully!');
    }
}


function updateTaskList() {
    const selectedPerson = document.getElementById('personInChargeFilter').value;
    const taskListTable = document.getElementById('task-list-table-data');
    taskListTable.innerHTML = ''; // Clear current task list

    projects[currentProject][currentGroup]
        .filter(task => selectedPerson === 'all' || task.personInCharge === selectedPerson)
        .forEach((task, index) => {
            const taskTableData = document.getElementById('task-list-table-data');
            let row = taskTableData.insertRow();

            let personInChargeCell = row.insertCell();
            personInChargeCell.innerHTML =`<td>${task.personInCharge}</td>`;

            let taskNameCell = row.insertCell();
            taskNameCell.innerHTML =`<td>${task.taskName}</td>`;

            let startDateCell = row.insertCell();
            startDateCell.innerHTML =`<td>${task.startDate}</td>`;

            let dueDateCell = row.insertCell();
            dueDateCell.innerHTML =`<td>${task.dueDate}</td>`;

            let statusCell = row.insertCell();
            statusCell .innerHTML =`<td><strong>${task.status}</strong></td>`;

            let progressCell = row.insertCell();
            progressCell .innerHTML =`<td>${task.progress}</td>`;

            let deleteCell = row.insertCell();
            deleteCell .innerHTML =`
            <td><button id="edit-task" type="button" onclick="editTask(${index})">Edit</button></td>
            <td><button id="delete-task" type="button" onclick="deleteTask(${index})">Delete</button></td>
            `;
        });
}

// Initialize with default project
updateTaskList();