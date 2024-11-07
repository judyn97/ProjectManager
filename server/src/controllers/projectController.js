import db from "../config/db.js";

export const getProjects = (req, res) => {
    const q = "SELECT * FROM projects"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
};

export const createProject = (req, res) => {
    const q = "INSERT INTO projects (`project_name`) VALUES (?);";
    const values = [
        req.body.project_name,
    ];
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Project has been created successfully")
    });
};

export const editProject = (req, res) => {
    const projectId = req.params.id;
    const q = `
        UPDATE projects 
        SET 
            project_name = ? 
        WHERE project_id = ?`;

    const values = [
        req.body.project_name,
    ];

    db.query(q, [...values, projectId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Project updated successfully!");
    });
};

export const deleteProject = (req, res) => {
    const projectId = req.params.id;
    const q = "DELETE FROM projects WHERE project_id = ?";

    db.query(q, [projectId], (err,data)=> {
        if(err) return res.json(err)
        return res.json("Project has been deleted successfully");
    });
};

