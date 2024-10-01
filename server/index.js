import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"pdcprojectmanager"
});

// app.get("/", (req, res)=>{
//     res.json("hellow");
// })

app.use(express.json());
app.use(cors());

app.get("/tasks", (req,res)=>{
    const q = "SELECT * FROM tasks"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/tasks", (req,res)=>{
    const q = "INSERT INTO tasks (`project_id`,`department_id`, `task_name`, `start_date`, `due_date`, `status`,  `progress`, `description`, `person_in_charge`) VALUES (?);";
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
    ];
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Task has been created successfully")
    })
})

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

app.listen(8800, () =>{
    console.log("Connected");
})