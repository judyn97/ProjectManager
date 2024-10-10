import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"pdcprojectmanager",
    multipleStatements: true 
});

// app.get("/", (req, res)=>{
//     res.json("hellow");
// })

app.use(express.json());
app.use(cors());

app.get("/tasks", (req,res)=>{
    const q = "SELECT tasks.*, buckets.* FROM tasks JOIN buckets ON tasks.bucket_id = buckets.bucket_id"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/tasks", (req,res)=>{
    const q = "INSERT INTO tasks (`project_id`,`department_id`, `task_name`, `start_date`, `due_date`, `status`,  `progress`, `description`, `person_in_charge`, `bucket_id`) VALUES (?);";
    const values = [
        req.body.project_id,
        req.body.department_id,
        req.body.task_name,
        req.body.start_date,
        req.body.due_date,
        req.body.status,
        req.body.progress,
        req.body.description,
        req.body.person_in_charge,
        req.body.bucket_id,
    ];
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Task has been created successfully")
    })
})

app.put("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    const q = `
        UPDATE tasks 
        SET 
            task_name = ?, 
            start_date = ?, 
            due_date = ?, 
            status = ?, 
            progress = ?, 
            description = ?, 
            bucket_id = ?
        WHERE task_id = ?`;

    // Parse the date to the format MySQL accepts (YYYY-MM-DD)
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const values = [
        req.body.task_name,
        formatDate(req.body.start_date), // Format the start_date
        formatDate(req.body.due_date),   // Format the due_date
        req.body.status,
        req.body.progress,
        req.body.description,
        req.body.bucket_id,
    ];

    db.query(q, [...values, taskId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Task updated successfully!");
    });
});

app.put("/tasks/:id/bucket", (req, res) => {
    const taskId = req.params.id;
    const q = `
        UPDATE tasks 
        SET bucket_id = ? 
        WHERE task_id = ?`;

    const values = [req.body.bucket_id];

    db.query(q, [...values, taskId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Task bucket_id updated successfully!");
    });
});


app.delete("/tasks/:id", (req,res)=>{
    const taskId = req.params.id;
    const q = "DELETE FROM tasks WHERE task_id = ?";

    db.query(q, [taskId], (err,data)=> {
        if(err) return res.json(err)
        return res.json("Task has been deleted successfully");
    })
})

app.get("/projects", (req,res)=>{
    const q = "SELECT * FROM projects"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/departments", (req,res)=>{
    const q = "SELECT * FROM departments"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/tasks/:taskId/comments", (req,res)=>{
    const { taskId } = req.params;
    const { userId, commentText } = req.body; // Expecting userId and commentText from frontend
    //const { commentText } = req.body; // Expecting commentText from frontend

    const q = `INSERT INTO comments (task_id, user_id, comment_text) VALUES (?, ?, ?)`;
    db.query(q,[taskId, userId, commentText], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/tasks/:taskId/comments", (req,res)=>{
    const { taskId } = req.params;

    const q = `SELECT * FROM comments WHERE task_id = ? ORDER BY created_at ASC`
    db.query(q, [taskId], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/buckets", (req,res) => {
    const q = "SELECT * FROM buckets";
    db.query(q, (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/buckets", (req,res)=> {
    const q = "INSERT INTO tasks (`bucket_name`, `position`) VALUES (?);";
    const values = [
        req.body.bucket_name,
        req.body.position,
    ];
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Task has been created successfully")
    })
})

app.put("/buckets/updatePosition", (req, res) => {
    const { bucket_id, new_position } = req.body;
    const q = `
        UPDATE buckets
        SET position = ?
        WHERE bucket_id = ?`;
    
    db.query(q, [new_position, bucket_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Position updated successfully!");
    });
});

app.put("/buckets/:id", (req,res)=> {
    console.log("Request body:", req.body);
    const taskId = req.params.id;
    const q = `
        UPDATE buckets 
        SET 
            bucket_name = ?, 
            position = ? 
        WHERE bucket_id = ?`;

    const values = [
        req.body.bucket_name,
        req.body.position
    ];

    db.query(q, [...values, taskId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Task updated successfully!");
    });
})



app.delete("/buckets/:id", (req,res)=>{
    const taskId = req.params.id;
    const q = "DELETE FROM buckets WHERE bucket_id = ?";

    db.query(q, [taskId], (err,data)=> {
        if(err) return res.json(err)
        return res.json("Task has been deleted successfully");
    })
})

app.listen(8800, () =>{
    console.log("Connected");
})