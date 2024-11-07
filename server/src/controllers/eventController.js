import db from "../config/db.js";

export const getEvents = (req, res) => {
    const q = "SELECT * FROM events";
    db.query(q, (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
};

export const createEvent = (req, res) => {
    const q = "INSERT INTO events (`event_name`, `event_group`, `event_date`) VALUES (?);";
    const values = [
        req.body.event_name,
        req.body.event_group,
        req.body.event_date,
    ];
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Event has been created successfully")
    })
};

export const editEvent = (req, res) => {
    const eventId = req.params.id;
    const q = `
        UPDATE events 
        SET 
            event_name = ?, 
            event_date = ? 
        WHERE event_id = ?`;

    const values = [
        req.body.event_name,
        req.body.event_date
    ];

    db.query(q, [...values, eventId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Event updated successfully!");
    });
};

export const deleteEvent = (req, res) => {
    const eventId = req.params.id;
    const q = "DELETE FROM events WHERE event_id = ?";

    db.query(q, [eventId], (err,data)=> {
        if(err) return res.json(err)
        return res.json("Event has been deleted successfully");
    })
};

