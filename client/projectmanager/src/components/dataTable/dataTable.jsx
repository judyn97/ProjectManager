import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import './dataTable.css';
import axios from 'axios';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';

const DataTable = ({ rows, columns, onEdit, onDelete }) => {
    const handleDelete = async (id)=>{
        try {
            await axios.delete("http://localhost:8800/tasks/"+id);
            onDelete();
        } catch (error) {
            console.log(error);
        }
    };

    const actionColumn = {
        field:"action",
        headerName:"Action",
        width:200,
        renderCell:(params)=>{
            return(
                <div className="action">
                    <div className="edit">
                        <img src={editIcon} alt="" onClick={() => onEdit(params.row)}/>
                    </div>
                    <div className="delete">
                        <img src={deleteIcon} alt="" onClick={()=>handleDelete(params.row.task_id)}/>
                    </div>
                </div>
            )
        }
    }

  return (
    <div className='dataTable'>
        <DataGrid 
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
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
        disableCheckboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  )
}

export default DataTable