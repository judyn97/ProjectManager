import db from "../config/db.js";

export const getDepartments = (req, res) => {
    const q = "SELECT * FROM departments"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
};

export const createDepartment = (req, res) => {
    const q = "INSERT INTO departments (`department_name`) VALUES (?);";
    const values = [
        req.body.department_name,
    ];
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Department has been created successfully")
    });
};

export const editDepartment = (req, res) => {
    const departmentId = req.params.id;
    const q = `
        UPDATE departments 
        SET 
            department_name = ? 
        WHERE department_id = ?`;

    const values = [
        req.body.department_name,
    ];

    db.query(q, [...values, departmentId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Department updated successfully!");
    });
};

export const deleteDepartment = (req, res) => {
    const departmentId = req.params.id;
    const q = "DELETE FROM departments WHERE department_id = ?";

    db.query(q, [departmentId], (err,data)=> {
        if(err) return res.json(err)
        return res.json("Department has been deleted successfully");
    });
};

