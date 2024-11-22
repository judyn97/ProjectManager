import { useState, useEffect } from "react";
import "./ProjectSetting.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import apiClient, {endpoints} from "../../api";
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/edit.svg"   
import DeleteModal from "../../components/deleteConfirmation/deleteModal";

const projectColumns = [
  {
    field: "project_name",
    headerName: "Project Name",
    width: 150,
    editable: true,
    flex: 1,
  },
];

const departmentColumns = [
  {
    field: "department_name",
    headerName: "Department Name",
    width: 150,
    editable: true,
    flex: 1,
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProjectSetting = () => {
  const [projectList, setProjectList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    open: false,
    id: null,
    type: "",
  });  
  const [formData, setFormData] = useState({ project_name: "", department_name: "" });
  const [editId, setEditId] = useState(null);


  const fetchProjectList = async () => {
    try {
      const res = await apiClient.get(endpoints.projects);
      setProjectList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDepartmentList = async () => {
    try {
      const res = await apiClient.get(endpoints.departments);
      setDepartmentList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjectList();
    fetchDepartmentList();
  }, []);

  const handleOpen = (type) => {
    setModalType(type);
    setFormData({ project_name: "", department_name: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    setFormData({ project_name: "", department_name: "" });
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id, type) => {
    try {
      const url =
        type === "project"
          ? endpoints.projectById(id)
          : endpoints.departmentById(id);
      await apiClient.delete(url);
  
      // Refetch the relevant list
      if (type === "project") {
        fetchProjectList();
      } else {
        fetchDepartmentList();
      }
    } catch (err) {
      console.error(err);
    }
  };  

  const handleEdit = (type, id, name) => {
    setModalType(type);
    setEditId(id);
    setFormData(type === "project" ? { project_name: name } : { department_name: name });
    setOpen(true);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const url =
          modalType === "project"
            ? endpoints.projectById(editId)
            : endpoints.departmentById(editId);
        await apiClient.put(url, formData);
      } else {
        if (modalType === "project") {
          await apiClient.post(endpoints.projects, { project_name: formData.project_name });
        } else if (modalType === "department") {
          await apiClient.post(endpoints.departments, { department_name: formData.department_name });
        }
      }
      modalType === "project" ? fetchProjectList() : fetchDepartmentList();
      handleClose();
      setEditId(null); // Reset edit ID
    } catch (err) {
      console.error(err);
    }
  };
  

  const projectActionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <div className="action">
        <div className="edit">
          <img
            src={editIcon}
            alt="Edit"
            onClick={() =>
              handleEdit("project", params.row.project_id, params.row.project_name)
            }
          />
        </div>
        <div className="delete">
          <img
            src={deleteIcon}
            alt="Delete"
            onClick={() =>
              setIsDeleteModalOpen({ open: true, id: params.row.project_id, type: "project" })
            }
          />
        </div>
      </div>
    ),
  };
  
  const departmentActionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <div className="action">
        <div className="edit">
          <img
            src={editIcon}
            alt="Edit"
            onClick={() =>
              handleEdit("department", params.row.department_id, params.row.department_name)
            }
          />
        </div>
        <div className="delete">
          <img
            src={deleteIcon}
            alt="Delete"
            onClick={() =>
              setIsDeleteModalOpen({ open: true, id: params.row.department_id, type: "department" })
            }
          />
        </div>
      </div>
    ),
  };  

  return (
    <div className="projectSettingsTable">
      <div className="projectTable">
        <div className="table-header">
          <h3>Project List</h3>
          <button onClick={() => handleOpen("project")}>Add Project</button>
        </div>
        <DataGrid
          className="dataGrid"
          rows={projectList}
          columns={[...projectColumns, projectActionColumn]}
          getRowId={(row) => row.project_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } },
          }}
          pageSizeOptions={[15]}
          disableCheckboxSelection
          disableRowSelectionOnClick
        />
      </div>

      <div className="projectTable">
        <div className="table-header">
          <h3>Department List</h3>
          <button onClick={() => handleOpen("department")}>Add Department</button>
        </div>
        <DataGrid
          className="dataGrid"
          rows={departmentList}
          columns={[...departmentColumns, departmentActionColumn]}
          getRowId={(row) => row.department_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } },
          }}
          pageSizeOptions={[15]}
          disableCheckboxSelection
          disableRowSelectionOnClick
        />
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h3>{modalType === "project" ? "Add Project" : "Add Department"}</h3>
          <form onSubmit={handleSubmit}>
            {modalType === "project" ? (
              <div>
                <label>Project Name:</label>
                <input
                  type="text"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div>
                <label>Department Name:</label>
                <input
                  type="text"
                  name="department_name"
                  value={formData.department_name}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="submit-button-box">
              <button type="submit" className="submit-button">
                {editId ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      <DeleteModal
        open={isDeleteModalOpen.open}
        setOpen={(open) => setIsDeleteModalOpen({ ...isDeleteModalOpen, open })}
        onConfirm={() =>
          handleDelete(isDeleteModalOpen.id, isDeleteModalOpen.type)
        }
        message={`Are you sure you want to delete this ${
          isDeleteModalOpen.type === "project" ? "project" : "department"
        }?`}
      />

    </div>
  );
};

export default ProjectSetting;
