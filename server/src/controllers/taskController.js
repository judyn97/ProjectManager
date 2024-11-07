import db from "../config/db.js";
import { formatDate } from "../utils/dateUtils.js";

export const getTasks = (req, res) => {
    const query = "SELECT tasks.*, buckets.* FROM tasks JOIN buckets ON tasks.bucket_id = buckets.bucket_id";
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
};

export const createTask = (req, res) => {
    const query = "INSERT INTO tasks (project_id, department_id, task_name, start_date, due_date, status, progress, description, person_in_charge, bucket_id) VALUES (?);";
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
    db.query(query, [values], (err, data) => {
        if (err) return res.json(err);
        res.json("Task has been created successfully");
    });
};

export const editTask = (req, res) => {
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

    const values = [
        req.body.task_name,
        formatDate(req.body.start_date),
        formatDate(req.body.due_date),
        req.body.status,
        req.body.progress,
        req.body.description,
        req.body.bucket_id,
    ];

    db.query(q, [...values, taskId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Task updated successfully!");
    });
};

export const editTaskDate = (req, res) => {
    const taskId = req.params.id;
    const q = `
        UPDATE tasks 
        SET 
            start_date = ?, 
            due_date = ? 
        WHERE task_id = ?`;

    const values = [
        formatDate(req.body.start_date),
        formatDate(req.body.due_date),
    ];

    db.query(q, [...values, taskId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Task Date updated successfully!");
    });
};

export const editTaskProgress = (req, res) => {
    const taskId = req.params.id;
    const q = `
        UPDATE tasks 
        SET 
            progress = ?
        WHERE task_id = ?`;

    const values = [
        req.body.progress,
    ];

    db.query(q, [...values, taskId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Task Progress updated successfully!");
    });
};

export const editTaskBucket = (req, res) => {
    const taskId = req.params.id;
    const q = `
        UPDATE tasks 
        SET bucket_id = ? 
        WHERE task_id = ?`;

    const values = [req.body.bucket_id];

    db.query(q, [...values, taskId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Task bucket updated successfully!");
    });
};

export const deleteTask = (req, res) => {
    const taskId = req.params.id;
    const q = "DELETE FROM tasks WHERE task_id = ?";

    db.query(q, [taskId], (err,data)=> {
        if(err) return res.json(err)
        return res.json("Task has been deleted successfully");
    });
};

