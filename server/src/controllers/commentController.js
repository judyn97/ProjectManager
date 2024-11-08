import db from "../config/db.js";

export const getComments = (req, res) => {
    const { taskId } = req.params;

    const q = `SELECT * FROM comments WHERE task_id = ? ORDER BY created_at DESC`
    db.query(q, [taskId], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
};

export const createComment = (req, res) => {
    const { taskId } = req.params;
    const { userId, commentText } = req.body;

    const q = `INSERT INTO comments (task_id, user_id, comment_text) VALUES (?, ?, ?)`;
    db.query(q,[taskId, userId, commentText], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
};

