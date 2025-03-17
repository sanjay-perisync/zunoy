import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import {
  Switch,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Navbar from "../Navbar";
import { GuestAPI } from "../../APIconfig/getAPIconfig";
import { AddEditComp } from "./AddEditComp";
import DeleteBtn from "./DeleteBtn";
import toast from "react-hot-toast";
// import Mainpagefooter from "../Mainpagefooter";

const ActionColumn = ({ row,formData, setFormData, setOpen, setView, setSelecteduser, setIsModalOpen }) => {
  const [option, setOption] = useState(null);

  const handleClick = (event) => {
    setOption(event.currentTarget);
  };

  const handleClose = () => {
    setOption(null);
  };


  const handleEdit = () => {
    setFormData({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phoneNo: row.phoneNo,
    });
    setView(false);
    setOpen(true);
    handleClose();
  };

  const handleView = () => {
    setFormData({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phoneNo: row.phoneNo,
    });
    setView(true);
    setOpen(true);
    handleClose();
  };


  const handleDelete = () => {
    setSelecteduser(row);
    setIsModalOpen(true);
    handleClose();
  };


  const handleCopy = () =>{
    const rowData=JSON.stringify(formData,null,2);
    navigator.clipboard.writeText(rowData)
    .then(() => {
      toast.success("Data Copied !");
    })
    .catch((err)=>{
      toast.error("Failed to copy", err);
    })
  }


  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={option} open={Boolean(option)} onClose={handleClose}>
        <MenuItem onClick={handleEdit} className="gap-[6px]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-6" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56" /><path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.36 1.36 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.36 1.36 0 0 1-.953.395H8.197a1.36 1.36 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086" /></g></svg>        <span>Edit</span></MenuItem>

        <MenuItem onClick={handleView} className="gap-[6px]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="12" r="3.5" /><path d="M20.188 10.934c.388.472.582.707.582 1.066s-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18s-6.768-3.21-8.188-4.934c-.388-.472-.582-.707-.582-1.066s.194-.594.582-1.066C5.232 9.21 8.364 6 12 6s6.768 3.21 8.188 4.934Z" /></g></svg>
          <span>View</span></MenuItem>

        <MenuItem className="gap-[6px]" onClick={handleCopy}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-6" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z" /><path d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h4a3 3 0 0 1 3 3" opacity="0.5" /></g></svg>
          <span>Copy</span>
        </MenuItem>

        <MenuItem onClick={handleDelete} className="gap-[6px]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-6 text-red-500" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M14 12.5a.5.5 0 0 0-1 0v11a.5.5 0 0 0 1 0zm4.5-.5a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m2-5.5V7h8a.5.5 0 0 1 0 1h-2.543l-1.628 17.907A4.5 4.5 0 0 1 19.847 30h-7.694a4.5 4.5 0 0 1-4.482-4.093L6.043 8H3.5a.5.5 0 0 1 0-1h8v-.5a4.5 4.5 0 1 1 9 0m-8 0V7h7v-.5a3.5 3.5 0 1 0-7 0M7.048 8l1.62 17.817A3.5 3.5 0 0 0 12.152 29h7.694a3.5 3.5 0 0 0 3.486-3.183L24.953 8z" /></svg>
          <span className="text-red-500">Delete</span></MenuItem>

      </Menu>
    </>
  );
};




const Guest = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuest, setSelecteduser] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: ""
  });



  const columns = [
    { field: "name", headerName: "USERNAME", flex: 1, disableColumnMenu: true },
    { field: "email", headerName: "EMAIL ID", flex: 1.5, disableColumnMenu: true },
    { field: "phoneNo", headerName: "PHONE NO", flex: 1, disableColumnMenu: true },
    { field: "password", headerName: "PASSWORD", flex: 1, disableColumnMenu: true },
    { field: "status", headerName: "STATUS", disableColumnMenu: true, flex: 1, renderCell: (params) => <Switch checked={params.value} /> },
    { field: "lastUpdated", headerName: "LAST UPDATED AT", flex: 1.5, disableColumnMenu: true },
    {
      field: "action", headerName: "ACTION", disableColumnMenu: true, flex: 1,
      renderCell: (params) => (
        <ActionColumn row={params.row} setFormData={setFormData} setOpen={setOpen} setView={setView} setIsModalOpen={setIsModalOpen} setSelecteduser={setSelecteduser} formData={formData} />
      ),
    },
  ];


  useEffect(() => {
    setLoading(true);
    dispatch(GuestAPI(setLoading));
  }, [dispatch, setLoading]);

  const guestInfo = useSelector((state) => state?.guestSliceReducer?.GuestSlice || []);

  const rows = guestInfo.map((guest) => ({
    firstName: guest.firstName,
    lastName: guest.lastName,
    id: guest.id,
    name: guest.name,
    email: guest.email,
    phoneNo: guest.phoneNo,
    password: guest.password,
    status: guest.active,
    lastUpdated: moment(guest.updatedAt).format('MMMM Do YYYY, h:mm A'),
  }));


  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-[1400px] mt-10 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl lg:text-3xl font-semibold">Guest Management</h2>
          <button
            onClick={handleOpen}
            className="bg-indigo-500 flex justify-center items-center gap-1 text-white font-semibold px-3 py-2 rounded-lg shadow-md hover:bg-indigo-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z" />
            </svg>
            <span>Add Guest</span>
          </button>
        </div>

        <div className="bg-white overflow-x-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5]}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              minWidth: "800px",
              "& .MuiDataGrid-columnSeparator": { display: "none" },
              "& .MuiDataGrid-columnHeaders": { borderBottom: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              overflowX: "auto"

            }}
          />
        </div>
      </main>
      <AddEditComp open={open} handleClose={handleClose} formData={formData} setFormData={setFormData} viewMode={view} />

      <DeleteBtn isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedGuest={selectedGuest} />

          {/* <footer>
            <Mainpagefooter/>
          </footer> */}

    </div>
  );
};

export default Guest;
