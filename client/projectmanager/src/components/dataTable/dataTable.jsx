import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import './dataTable.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';

const DataTable = (props) => {

    const handleDelete = async (id)=>{
        try {
            await axios.delete("http://localhost:8800/tasks/"+id);
            window.location.reload(); //In the future use redux
        } catch (error) {
            console.log(error);
        }
    }

    const actionColumn = {
        field:"action",
        headerName:"Action",
        width:200,
        renderCell:(params)=>{
            return(
                <div className="action">
                    <Link to={`/${props.slug}/${params.row.task_id}`}>
                        <img src={editIcon} alt=""/>
                    </Link>
                    <div className="delete" style={{color: "red"}}>
                        <img src={deleteIcon} alt="" onClick={()=>handleDelete(params.row.task_id)}/>
                    </div>
                </div>
            )
        }
    }
  return (
    <div className='dataTable'>
        <DataGrid className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        getRowId={(row) => row.task_id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{toolbar:GridToolbar}}
        slotProps={{
            toolbar:{
                showQuickFilter:true,
                quickFilterProps: {debounceMs: 500 }
            }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  )
}

export default DataTable