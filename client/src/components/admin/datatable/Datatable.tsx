import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { userColumns, userRows } from "./datatablesource";
import axios from "axios";
import useFetch from "@/hooks/useFetch";
import { IUser } from "@/types";
import { type UserRows } from "./datatablesource";

const Datatable = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState<IUser[]>();
  const { data, loading, error } = useFetch<IUser[]>(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list?.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: UserRows) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => void handleDelete(params.row.id as string)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="adminDatatable">
      <div className="adminDatatableTitle">
        {path}
        <Link to={`/${path}/new`} className="adminLink">
          Add New
        </Link>
      </div>
      <DataGrid
        className="adminDatagrid"
        rows={list}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
