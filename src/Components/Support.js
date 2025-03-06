import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Mainpagefooter from "./Mainpagefooter";
import { fetchSupportTickets, fetchStatusCounts } from "../APIconfig/getAPIconfig";
import {
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Pagination,
  Typography,
  IconButton
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";


const productLogos = {
  FormFlow: "https://account.zunoy.com/images/zoopform.svg",
  MockAPI: "https://account.zunoy.com/images/zoopapi.svg",
  WatchTower: "https://account.zunoy.com/images/zooptime.svg",
  Accounts: "https://dev-account.zoop360.com/images/zunoy.svg",
};

const statusStyles = {
  Open: { color: "#D32F2F", background: "#FFF0F0" },
  "In Progress": { color: "#1565C0", background: "#E3F2FD" },
  Resolved: { color: "#2E7D32", background: "#E8F5E9" },
  Closed: { color: "#616161", background: "#F5F5F5" },
};

const priorityStyles = {
  High: { color: "#FFFFFF", background: "#D32F2F" },
  Medium: { color: "#FFFFFF", background: "#FB8C00" },
  Low: { color: "#FFFFFF", background: "#1976D2" },
};

function Support() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [statusCounts, setStatusCounts] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const tabs = ["All", "Open", "In Progress", "Resolved", "Closed"];

  useEffect(() => {
    loadTickets();
    loadStatusCounts();
  }, [page, activeTab, selectedProduct, searchKey]);

  const loadTickets = async () => {
    setLoading(true);
    const status = activeTab === "All" ? "all" : activeTab.toLowerCase();
    const response = await fetchSupportTickets(page, 5, searchKey, status, "", selectedProduct);
    setTickets(response.data || []);
    setTotalTickets(response.total || 0);
    setLoading(false);
  };

  const loadStatusCounts = async () => {
    const response = await fetchStatusCounts(searchKey, selectedProduct);
    setStatusCounts(response || {});
  };

 

const columns = [
  { 
    field: "id", 
    headerName: "Id", 
    flex: 0.5, 
    minWidth: 80, 
    sortable: true, 
    disableColumnMenu: true 
  },
  
  {
    field: "product",
    headerName: "Product",
    flex: 2,
    minWidth: 200,
    sortable: true, 
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box display="flex" alignItems="center" gap={1}>
        <img
          src={productLogos[params.value?.name] || ""}
          alt={params.value?.name}
          style={{ width: 24, height: 24 }}
        />
        <span style={{ fontWeight: "500", color: "#495057" }}>
          {params.value?.name}
        </span>
      </Box>
    ),
  },
  
  {
    field: "status",
    headerName: "Status",
    flex: 1.5,
    minWidth: 150,
    sortable: true, 
    disableColumnMenu: true,
    renderCell: (params) => {
     
      return (
        <Box
          sx={{
            color: statusStyles[params.value]?.color,
            backgroundColor: statusStyles[params.value]?.background,
            padding: "4px 12px",
            borderRadius: "16px",
            fontWeight: "500",
            fontSize: "0.8125rem",
            textTransform: "capitalize",
            display: "inline-block",
          }}
        >
          {params.value}
        </Box>
      );
    },
  },
  
  {
    field: "priority",
    headerName: "Priority",
    flex: 1.5,
    minWidth: 120,
    disableColumnMenu: true,
    renderCell: (params) => {
    
      return (
        <Box
          sx={{
            color: priorityStyles[params.value]?.color,
            backgroundColor: priorityStyles[params.value]?.background,
            padding: "4px 12px",
            borderRadius: "16px",
            fontWeight: "500",
            fontSize: "0.8125rem",
            textAlign: "center",
            textTransform: "capitalize",
            display: "inline-block",
          }}
        >
          {params.value}
        </Box>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Created at",
    flex: 1,
    minWidth: 200,
    disableColumnMenu: true,
    renderCell: (params) => (
      <span className="p-3">
        {params.value
          ? new Date(params.value).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true, 
            })
          : "N/A"}
      </span>
    ),
  },
  
];
  
  

  return (
    <Box>
      <Navbar />

      <Box className="mx-auto max-w-[1400px] my-10">
        <Paper elevation={0}>
          <Box px={3} py={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <h4 className="text-xl lg:text-3xl font-semibold text-gray-900">Support Tickets</h4>
              <Link
                to="/support/create"
                className="bg-indigo-500 text-white px-3 py-2 rounded-md font-semibold flex items-center gap-2"
              >
                <AddIcon className="w-5 h-5" />
                <span className="text-[16px]">Create a Ticket</span>
              </Link>
            </Box>

            <Box borderBottom={1} borderColor="divider" mb={3}>
              <Grid container spacing={2}>
                {tabs.map((tab) => (
                  <Grid item key={tab}>
                    <Button
                      variant="text"
                      color={activeTab === tab ? "primary" : "inherit"}
                      sx={{
                        borderBottom: activeTab === tab ? 2 : 0,
                        borderColor: activeTab === tab ? "primary.main" : "transparent",
                        borderRadius: 0,
                      }}
                      onClick={() => {
                        setActiveTab(tab);
                        setPage(1);
                      }}
                    >
                      {tab} {statusCounts[tab.toLowerCase()] > 0 ? `(${statusCounts[tab.toLowerCase()]})` : ""}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Grid container spacing={2} alignItems="center" mb={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder="Search by product, name, email"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="filled">
                  <InputLabel>Product/Service</InputLabel>
                  <Select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Zunoy-ACC">Zunoy-ACC</MenuItem>
                    <MenuItem value="Zunoy-Watch Tower">Zunoy-Watch Tower</MenuItem>
                    <MenuItem value="Zunoy-Endpoint">Zunoy-Endpoint</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>



            
            <DataGrid
  rows={tickets}
  columns={columns}
  pageSize={5} 
  pagination
  paginationMode="server"
  rowCount={totalTickets} 
  onPageChange={(newPage) => setPage(newPage + 1)} 
  loading={loading}
  autoHeight
  sx={{
    "& .MuiDataGrid-columnSeparator": { display: "none" },
    "& .MuiDataGrid-columnHeaders": { borderBottom: "none" },
    "& .MuiDataGrid-cell": { borderBottom: "none" },
  }}
/>

<Box
  display="flex"
  justifyContent="flex-end"
  alignItems="center"
  gap={2}
  mt={2}
  px={1}
  py={1}
  sx={{ borderTop: "1px solid #f0f0f0" }}
>

  <Box display="flex" alignItems="center" gap={1}>
    <Typography variant="body2" color="text.secondary">
      Rows per page:
    </Typography>
    <Select
      value={5}
      size="small"
      onChange={(e) => {
        setPage(1); 
        loadTickets(); 
      }}
      sx={{ minWidth: 70, height: 32, fontSize: "0.875rem" }}
    >
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={25}>25</MenuItem>
    </Select>
  </Box>


  <Box display="flex" alignItems="center">
    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
      {`${(page - 1) * 5 + 1}-${Math.min(page * 5, totalTickets)} of ${totalTickets}`}
    </Typography>
    <Box display="flex">
      <IconButton
        size="small"
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        <span>&lt;</span>
      </IconButton>
      <IconButton
        size="small"
        onClick={() => setPage((prev) => (prev * 5 < totalTickets ? prev + 1 : prev))}
        disabled={page * 5 >= totalTickets}
      >
        <span>&gt;</span>
      </IconButton>
    </Box>
  </Box>
</Box>


            
          </Box>
        </Paper>
      </Box>

      <Mainpagefooter />
    </Box>
  );
}

export default Support;