import { formatDateToLong } from "./DateFormat";

export const columns = [
    {
      field: 'person_in_charge',
      headerName: 'PIC',
      width: 150,
      editable: true,
    },
    {
      field: 'task_name',
      headerName: 'Task name',
      width: 500,
      editable: true,
    },
    {
      field: 'start_date',
      headerName: 'Start Date',
      type: 'date',
      width: 110,
      editable: true,
      valueGetter: (value) => value && new Date(value),
      valueFormatter: (value) => formatDateToLong(value),
    },
    {
        field: 'due_date',
        headerName: 'Due Date',
        type: 'date',
        width: 110,
        editable: true,
        valueGetter: (value) => value && new Date(value),
        valueFormatter: (value) => formatDateToLong(value),
      },
      {
        field: 'status',
        headerName: 'Status',
        type: 'singleSelect',
        width: 150,
        editable: true,
        renderCell: (params) => {
          let colorCode = "white"
          if(params.row.status === "In Progress")
          {
            colorCode = "#FFD301"; //Yellow
          }
          else if(params.row.status === "Done")
          {
            colorCode = "#639754"; //Green
          }
          else{
            colorCode = "#D61F1F" //Red
          }
          return(
            <div className="status-style" style={{color:colorCode}}>
              {params.row.status}
            </div>
          )
        },  
      },
      {
        field: 'progress',
        headerName: 'Percentage',
        width: 150,
        editable: true,
      },
      {
        field: 'bucket_id',
        headerName: 'Bucket',
        type: 'singleSelect',
        width: 150,
        editable: true,
        renderCell: (params) => params.row.bucket_name,
      },
  ];