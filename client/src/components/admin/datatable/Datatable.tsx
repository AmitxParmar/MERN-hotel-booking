import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { userColumns } from "./datatablesource";
import axios from "axios";
import useFetch from "@/hooks/useFetch";
import { IUser } from "@/types";

const Datatable: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState<IUser[]>([]);
  const { data, loading } = useFetch<IUser[]>(`/${path}`);

  useEffect(() => {
    setList(data || []);
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList((list) => list.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: unknown) => {
        const row = params as { row: IUser };
        return (
          <div className="cellAction">
            <Link
              to={`/users/${row.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => void handleDelete(row.row._id)}
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
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <DataGrid
          className="adminDatagrid"
          rows={list}
          columns={userColumns.concat(actionColumn)}
          pageSizeOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};

export default Datatable;
