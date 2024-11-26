import db from "../config/db.js";

export const getBuckets = (req, res) => {
    const q = "SELECT * FROM buckets";
    db.query(q, (err,data)=>{
        console.log("This is mysql", data);
        console.log("This is mysql err", err);
        if(err) return res.json(err);
        return res.json(data);
    })
};

export const createBucket = (req, res) => {
    const q = "INSERT INTO buckets (`bucket_name`, `position`) VALUES (?);";
    const values = [
        req.body.bucket_name,
        req.body.position,
    ];
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Bucket has been created successfully")
    });
};


export const editBucketPosition = (req, res) => {
    const { bucket_id, new_position } = req.body;
    const q = `
        UPDATE buckets
        SET position = ?
        WHERE bucket_id = ?`;
    
    db.query(q, [new_position, bucket_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Bucket position updated successfully!");
    });
};

export const deleteBucket = (req, res) => {
    const taskId = req.params.id;
    const q = "DELETE FROM buckets WHERE bucket_id = ?";

    db.query(q, [taskId], (err,data)=> {
        if(err) return res.json(err)
        return res.json("Bucket has been deleted successfully");
    });
};

