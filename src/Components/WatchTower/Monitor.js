import { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MenuItem, Select, TextField, IconButton, Menu, Tabs, Tab } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Navbar from "../Navbar";
import { MonitorListAPI } from "../../APIconfig/getAPIconfig";
import { useDispatch,useSelector } from "react-redux";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "@mui/icons-material";



const ActionColumn = () => {
  const [option, setOption] = useState(null);

  const handleClick = (event) => {
    setOption(event.currentTarget);
  };

  const handleClose = () => {
    setOption(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={option} open={Boolean(option)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>View</MenuItem>
        <MenuItem onClick={handleClose}>Pause</MenuItem>
        <MenuItem onClick={handleClose}>Reset Stats</MenuItem>
        <MenuItem onClick={handleClose}>Clone</MenuItem>
        <MenuItem onClick={handleClose} className="text-red-500">
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};


const columns = [
  { field: "monitorName", headerName: "Monitor Name", flex: 3, disableColumnMenu: true },
  { field: "tags", headerName: "Tags", flex: 3, disableColumnMenu: true, renderCell: () => <span className="border rounded-full px-2 py-1 text-gray-500">No Tags</span> },
  { field: "host", headerName: "Host", flex: 3, disableColumnMenu: true, renderCell: (params) => <span className=" text-black cursor-pointer hover:underline">{params.value}</span> },
  { field: "lastChecked", headerName: "Last Checked", flex: 3, disableColumnMenu: true },
  { field: "actions", headerName: "Actions", flex: 2, disableColumnMenu: true, renderCell: () => <ActionColumn /> },
];






export default function MonitorsPage() {
  const [method, setMethod] = useState("All");
  const [loading,setLoading]=useState();
  const dispatch=useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["All", "Up", "Down", "Paused"];

    useEffect(() => {
      setLoading(true);
      dispatch(MonitorListAPI(setLoading));
    }, [dispatch, setLoading]);
  
   

const monitorInfo = useSelector((state) => state?.MonitorSliceReducer?.MonitorSlice || []);
console.log("List monitor info:",monitorInfo);

const rows = monitorInfo.map((monitor) => ({
  id: monitor.id,
  monitorName: monitor.name,
  tags:"No Tags",
  host: monitor.https?.host,
  lastChecked: moment(monitor.recentCheckAt).format('Do MMMM YYYY , h:mm a'),
}));


  return (
    <div>
      <Navbar />

      <main className="mx-auto max-w-[1400px] mt-10 px-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl lg:text-4xl font-semibold">Monitors</h1>
          <Link to='/monitors/Create' className="bg-indigo-500 text-white px-4 py-2 rounded-xl font-semibold flex gap-2 justify-center items-center">
            <div><AddIcon className="w-5 h-5" /></div> <span>Add Monitor</span>
          </Link>
        </div>


<section className="">
<Tabs
      value={activeTab}
      onChange={(event, newValue) => setActiveTab(newValue)}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab} />
      ))}
    </Tabs>

        

        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4 my-4">
          <TextField variant="outlined" placeholder="Search monitors by name" className="w-full" />


      <div className="flex gap-4">
          <div className="flex gap-4">
            <Select value={method} onChange={(e) => setMethod(e.target.value)} variant="outlined">
              <MenuItem value="All">Filters</MenuItem>
            </Select>
          </div>
          <div className="flex gap-4">
            <Select value={method} onChange={(e) => setMethod(e.target.value)} variant="outlined">
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="GET">PING</MenuItem>
              <MenuItem value="POST">PORT</MenuItem>
              <MenuItem value="POST">HTTPS</MenuItem>
              <MenuItem value="POST">Keywords</MenuItem>
            </Select>
          </div>
          </div>
        </div>

        <div className="bg-white overflow-x-auto">
          <DataGrid rows={rows} columns={columns} pageSize={5} autoHeight loading={loading}
          sx={{
            minWidth: "800px",
            "& .MuiDataGrid-columnSeparator": { display: "none" },
            "& .MuiDataGrid-columnHeaders": { borderBottom: "none" },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            overflowX: "auto"
          }}/>
        </div>
        </section>
      </main>

  
    </div>
  );
}
