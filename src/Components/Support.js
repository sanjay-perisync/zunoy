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
  Pagination,
  InputAdornment,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Support() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [focused, setFocused] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [statusCounts, setStatusCounts] = useState({});
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");

  const tabs = ["All", "Open", "In Progress", "Resolved", "Closed"];

  useEffect(() => {
    loadTickets();
    loadStatusCounts();
  }, [page, activeTab, selectedProduct, searchKey]);

  const loadTickets = async () => {
    const status = activeTab === "All" ? "all" : activeTab.toLowerCase();
    const response = await fetchSupportTickets(page, 5, searchKey, status, "", selectedProduct);
    setTickets(response.data || []);
    setTotalTickets(response.total || 0);
  };

  const loadStatusCounts = async () => {
    const response = await fetchStatusCounts(searchKey, selectedProduct);
    setStatusCounts(response || {});
  };

  return (
    <Box>
      <Box position="sticky" top={0} zIndex={10} bgcolor="white">
        <Navbar />
      </Box>

      <div className="mx-auto max-w-[1400px] my-10">
        <Paper elevation={0}>
          <Box>
            <div className="flex justify-between items-center mb-3 px-3">
              <h4 className="text-xl lg:text-3xl font-semibold text-gray-900">Support Tickets</h4>
              <Link
                to="/support/create"
                className="bg-indigo-500 text-white px-3 py-2 rounded-md font-semibold flex items-center gap-2"
              >
                <AddIcon className="w-5 h-5" />
                <span className="text-[16px]">Create a Ticket</span>
              </Link>
            </div>

            <div className="border rounded-xl py-4 mx-4 flex-nowrap overflow-x-auto">
              <Box borderBottom={1} borderColor="divider">
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

              <Box py={3} px={4}>
                <Grid container spacing={2} alignItems="center" mb={3}>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      variant="filled"
                      placeholder="Search by product, name, email"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                      onFocus={() => setSearchFocus(true)}
                      onBlur={() => setSearchFocus(false)}
                      sx={{
                        "& .MuiInputBase-root": {
                          border: "3px solid",
                          borderColor: searchFocus ? "#1976D2" : "#F8F8F8",
                          borderRadius: "8px",
                          backgroundColor: "white",
                          transition: "border-color 0.3s ease",
                        },
                        "& .MuiInputBase-root:hover": {
                          borderColor: searchFocus ? "#1976D2" : "#BEBEBE",
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
                      <InputLabel id="product-select-label">Product/Service</InputLabel>
                      <Select
                        labelId="product-select-label"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Zunoy-ACC">Zunoy-ACC</MenuItem>
                        <MenuItem value="Zunoy-Watch Tower">Zunoy-Watch Tower</MenuItem>
                        <MenuItem value="Zunoy-Endpoint">Zunoy-Endpoint</MenuItem>
                        <MenuItem value="Zunoy-FormFlow">Zunoy-FormFlow</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Box py={6} textAlign="center">
                  {tickets.length === 0 ? (
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src="https://dev-account.zoop360.com/assets/errors/no-data.svg"
                        alt="No tickets"
                        className="h-64"
                      />
                      No Tickets found.
                    </div>
                  ) : (
                    <ul>
                      {tickets.map((ticket) => (
                        <li key={ticket.id} className="p-3 border-b">
                          <strong>{ticket.title}</strong> - {ticket.status}
                        </li>
                      ))}
                    </ul>
                  )}
                </Box>

                {/* Pagination */}
                {totalTickets > 5 && (
                  <Box display="flex" justifyContent="center" py={3}>
                    <Pagination
                      count={Math.ceil(totalTickets / 5)}
                      page={page}
                      onChange={(event, value) => setPage(value)}
                      color="primary"
                      shape="rounded"
                    />
                  </Box>
                )}
              </Box>
            </div>
          </Box>
        </Paper>
      </div>

      <footer className="mx-auto max-w-[1400px]">
        <Mainpagefooter />
      </footer>
    </Box>
  );
}

export default Support;
