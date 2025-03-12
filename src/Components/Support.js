import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Mainpagefooter from "./Mainpagefooter";
import { fetchSupportTickets, fetchStatusCounts } from "../APIconfig/getAPIconfig";
import { useNavigate } from "react-router-dom";
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
  IconButton,
  Chip,
  CircularProgress
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";


const productLogos = {
  FormFlow: "https://account.zunoy.com/images/zoopform.svg",
  Endpoint: "https://account.zunoy.com/images/zoopapi.svg",
  WatchTower: "https://account.zunoy.com/images/zooptime.svg",
  Accounts: "https://dev-account.zoop360.com/images/zunoy.svg",
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
  const [pageSize, setPageSize] = useState(5);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const tabs = ["All", "Open", "In Progress", "Resolved", "Closed"];



  useEffect(() => {
    loadTickets();
    loadStatusCounts();
  }, [page, pageSize, activeTab, selectedProduct, searchKey]);


  const dispatch = useDispatch()
  const loadTickets = async (currentPage = page, currentPageSize = pageSize) => {
    setLoading(true);
    const status = activeTab === "All" ? "all" : activeTab.toLowerCase();
    dispatch(fetchSupportTickets(currentPage,
      currentPageSize,
      searchKey,
      status,
      "",
      selectedProduct, { setLoading }
    ))
    // const response = await fetchSupportTickets(
    //   currentPage,
    //   currentPageSize,
    //   searchKey,
    //   status,
    //   "",
    //   selectedProduct
    // );
    // setTickets(response.data || []);
    // setTotalTickets(response.total || 0);
    // setLoading(false);
  };
  const loadStatusCounts = async () => {
    const response = await fetchStatusCounts(searchKey, selectedProduct);
    setStatusCounts(response || {});
  };

  const ticket = useSelector(
    (state) => state?.TicketSliceReducer?.TicketSlice || []
  );


  // const count = useSelector(
  //   (state) => state?.TicketSliceReducer?.statusSlice || []
  // );

  useEffect(() => {
    console.log("Redux ticket data:", ticket);
  }, [ticket]);

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
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Open" ? "primary" : "error"}
          variant="outlined"
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            textTransform: "capitalize",
            borderColor: "gray",
          }}
        />
      ),
    },


    {
      field: "priority",
      headerName: "Priority",
      flex: 1.5,
      minWidth: 120,
      disableColumnMenu: true,
      renderCell: (params) => {
        let bgColor = "#1976D2";
        if (params.value?.toLowerCase() === "high") {
          bgColor = "#D32F2F";
        } else if (params.value?.toLowerCase() === "medium") {
          bgColor = "#FFA500";
        }

        return (
          <Chip
            label={params.value}
            sx={{
              backgroundColor: bgColor,
              color: "white",
              borderRadius: "14px",
              fontSize: "14px",
              textTransform: "capitalize",
            }}
          />
        );
      },
    }
    ,

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

      <header className="left-0 top-0 sticky z-10 bg-white">
        <Navbar />
      </header>


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
                        textTransform: "none",
                      }}
                      onClick={() => {
                        setActiveTab(tab);
                        setPage(1);
                      }}
                    >
                      {tab}{" "}
                      {statusCounts[tab.toLowerCase()] > 0 && (
                        <span className="bg-indigo-100 text-indigo-700 px-3  rounded-full ml-2">
                          {statusCounts[tab.toLowerCase()]}
                        </span>
                      )}
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
                  sx={{
                    "& .MuiInputBase-root": {
                      border: "3px solid",
                      borderColor: focused ? "#1976D2" : "#F8F8F8",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      transition: "border-color 0.3s ease",
                    },
                    "& .MuiInputBase-root:hover": {
                      borderColor: focused ? "#1976D2" : "#BEBEBE",
                      backgroundColor: "#F8F8F8",
                    },
                    "& .MuiInputBase-root.Mui-focused": {
                      borderColor: "#1976D2",
                      backgroundColor: "white",
                    },
                    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                      display: "none",
                    },
                  }}
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
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    "& .MuiInputBase-root": {
                      border: "3px solid",
                      borderColor: focused ? "#1976D2" : "#F8F8F8",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      transition: "border-color 0.3s ease",
                    },
                    "& .MuiInputBase-root:hover": {
                      borderColor: focused ? "#1976D2" : "#BEBEBE",
                      backgroundColor: "#F8F8F8",
                    },
                    "& .MuiInputBase-root.Mui-focused": {
                      borderColor: "#1976D2",
                      backgroundColor: "white",
                    },
                    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                      display: "none",
                    },
                  }}
                >
                  <InputLabel>Product/Service</InputLabel>
                  <Select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Zunoy-ACC">Zunoy-ACC</MenuItem>
                    <MenuItem value="Zunoy-Watch Tower">Zunoy-Watch Tower</MenuItem>
                    <MenuItem value="Zunoy-Endpoint">Zunoy-Endpoint</MenuItem>
                    <MenuItem value="Zunoy-FormFlow">Zunoy-FormFlow</MenuItem>
                  </Select>
                </FormControl>


              </Grid>
            </Grid>





            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <CircularProgress />
              </Box>
            ) : ticket.length === 0 ? (
              <Box py={4} textAlign="center">
                <div className="flex flex-col justify-center items-center">
                  <img
                    src="https://dev-account.zoop360.com/assets/errors/no-data.svg"
                    alt="No tickets"
                    className="h-64 w-42"
                  />
                  <Typography variant="body1" color="text.secondary">
                    No Tickets found.
                  </Typography>
                </div>
              </Box>
            ) : (
              <>
                <DataGrid
                  rows={ticket}
                  columns={columns}
                  hideFooter={true}
                  autoHeight
                  onRowClick={(params) => navigate(`/support/details/${params.row.id}`)}
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
                  <Box display="flex" justifyContent={"flex-end"} alignItems="center" gap={1}>
                    <Typography variant="body2" color="text.secondary">
                      Rows per page:
                    </Typography>
                    <Select
                      value={pageSize}
                      size="small"
                      onChange={(e) => {
                        const newPageSize = e.target.value;
                        setPageSize(newPageSize);
                        setPage(1);
                        loadTickets(1, newPageSize);
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
                      {`${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, totalTickets)} of ${totalTickets}`}
                    </Typography>
                    <Box display="flex">
                      <IconButton
                        size="small"
                        onClick={() => {
                          const newPage = Math.max(page - 1, 1);
                          setPage(newPage);
                          loadTickets(newPage, pageSize);
                        }}
                        disabled={page === 1}
                      >
                        <span>&lt;</span>
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          if (page * pageSize < totalTickets) {
                            const newPage = page + 1;
                            setPage(newPage);
                            loadTickets(newPage, pageSize);
                          }
                        }}
                        disabled={page * pageSize >= totalTickets}
                      >
                        <span>&gt;</span>
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </>
            )}

          </Box>
        </Paper>
      </Box>

      <Mainpagefooter />
    </Box>
  );
}

export default Support;