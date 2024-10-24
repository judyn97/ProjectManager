import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import './Events.css'
import { red } from "@mui/material/colors";

function EventsTable({departmentName}){

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [eventList, setEventList] = useState([])
    const [addEvent, setAddEvent] = useState({
        event_name: "",
        event_group: departmentName,
        event_date: ""
    })

    const fetchEventsList = async () => {
        try{
            const res = await axios.get("http://localhost:8800/events");
            setEventList(res.data);
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        fetchEventsList();
    }, [])

    function formatDateToLong(dateString) {
        const date = new Date(dateString);  
        
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short', 
            year: 'numeric',
        });
    }

    function countdownDays(targetDateString) {
        const targetDate = new Date(targetDateString);
        const currentDate = new Date();
    
        // Reset time components to ensure only date comparison
        targetDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
    
        const timeDifference = targetDate - currentDate;
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
        if (daysRemaining > 0) {
            return `${daysRemaining} days left`;  // Future date
        } else if (daysRemaining === 0) {
            return "Today";  // Target date is today
        } else {
            return "Past Due date";  // Past date
        }
    }
    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8800/events", addEvent);
            fetchEventsList();
        }
        catch(err){
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setAddEvent((prev) => ({...prev, [e.target.name]:e.target.value}))
        console.log("Add tasks", addEvent)
    }

    const handleDelete = async (id) =>{
        try{
            console.log("deleted", id)
            await axios.delete(`http://localhost:8800/events/${id}`);
            fetchEventsList();
        }
        catch(err)
        {
            console.log(err)
        }
    }

    const handleEdit = async (id) =>{
        
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return(
        <div className="event-container">
            <div className="event-header"> 
                <h3>{departmentName} Upcoming Events</h3>
                <button className="new-event-button" onClick={handleOpen}><AddBoxIcon style={{ color: 'white' }}/></button>
                
            </div>
            <Modal
              open={open}
              onClose={handleClose}
            >
                <Box sx={style} className="event-box">
                    <form className="event-form" onSubmit={handleSubmit}>
                    <input className="event-name-input" type="text" name="event_name" onChange={handleChange}/>
                    <input className="event-date-input" type="date" name="event_date" onChange={handleChange}/>
                    <button className="submit-button">Add</button>
                    </form>
                </Box>
            </Modal>
            {eventList.filter(item => item.event_group === departmentName).map( (event) => 
                <div className="event-list" key={event.event_id}>
                    <div className="event-data">
                        <h4>{formatDateToLong(event.event_date)}</h4>
                        <p className="event-title">{event.event_name}</p>
                        <p className="event-date-countdown">{countdownDays(event.event_date)}</p>
                    </div>
                    <div className="event-data-action">
                        <button onClick={() => handleEdit(event.event_id)}><EditIcon style={{color: 'white', fontSize: '20'}}/></button>
                        <button onClick={() => handleDelete(event.event_id)}><DeleteForeverIcon style={{color: 'white', fontSize: '20'}}/></button>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default EventsTable;