import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UserSettings.css'

const UserSettings = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", department: "" });
  const [departments, setDepartments] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userMetadata, setUserMetadata] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        const res = await axios.get('http://10.111.160.105:28001/departments'); // Replace with the correct endpoint
        setDepartments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDepartments();
  }, []);

  const handleSave = async () => {
    // Validate input
    if (!formData.firstName || !formData.lastName || !formData.department) {
      alert("Please fill in all fields and select a department.");
      return;
    }

    // Save the updated settings to the backend
    try {
      const response = await axios.post('http://10.111.160.105:28001/updateinfo', {
        preferences: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          departmentId: formData.department,
          profileComplete: true
        }
      });
      if(!isProfileComplete){
      navigate("/");} // Redirect to the home page after saving
    } catch (error) {
      console.error("Failed to update user info:", error);
      alert("Error saving your data. Please try again.");
    }
  };


  useEffect(() => {
    const checkProfileStatus = async () => {
      try {
        const res = await axios.get('http://10.111.160.105:28001/profile-status', { withCredentials: true });
        setIsProfileComplete(res.data.profileComplete);
      } catch (err) {
        console.log(err);
      }
    };
    checkProfileStatus();
  }, []);

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const res = await axios.get('http://10.111.160.105:28001/get-user-info');
        setUserEmail(res.data.emails[0])
      } catch (err) {
        console.log(err);
      }
    };
    getUserEmail();
  }, []);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const res = await axios.get('http://10.111.160.105:28001/user-profile');
        setUserMetadata(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUserMetadata();
  }, []);

  useEffect(() => {
    if (isProfileComplete && userMetadata) {
      // Initialize formData with user data if profile is complete
      setFormData({
        firstName: userMetadata.metadata.preferences.firstName,
        lastName: userMetadata.metadata.preferences.lastName,
        department: userMetadata.metadata.preferences.departmentId
      });
    }
  }, [isProfileComplete, userMetadata]); // Make sure to run when isProfileComplete or userMetadata changes

  return (
    <div className="container">
      <div className="user-setting-container">
        <h2 className="user-header-title">{isProfileComplete?"Profile Settings":"Complete Your Profile"}</h2>
        <div className="user-input">
          <label>Email</label>
          <input
            type="text"
            placeholder={userEmail}
            disabled={true}
          />
        </div>
        <div className="user-input">
          <label>First Name</label>
          <input
            type="text"
            placeholder="Hinata"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
        <div className="user-input">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Shoyo"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
        <div className="user-group">
          <label>Group</label>
          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          >
            <option value="">Select a department</option>
            {departments.map((item) => (
              <option key={item.department_id} value={item.department_id}>
                {item.department_name}
              </option>
            ))}
          </select>
        </div>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default UserSettings;
