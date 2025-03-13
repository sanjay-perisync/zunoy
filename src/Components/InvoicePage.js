import * as React from 'react';
import { useState } from "react";
import { TextField, Checkbox, Typography, InputAdornment, Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Search, CalendarToday, KeyboardArrowDown, NavigateBefore, NavigateNext } from "@mui/icons-material";

const InvoicePage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const products = ["FormFlow", "MockAPI", "WatchTower"];
  const statuses = ["Paid", "Unpaid"];

  const handleProductChange = (product) => {
    setSelectedProducts((prev) =>
      prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product]
    );
  };

  const handleStatusChange = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  
  const columns = [
    { field: "number", headerName: "Invoice Number", flex: 2, minWidth: 150,  disableColumnMenu: true},
    { field: "date", headerName: "Invoice Date", flex: 1.5, minWidth: 150 },
    { field: "product", headerName: "Product", flex: 1.5, minWidth: 150 },
    { field: "plan", headerName: "Plan", flex: 1.5, minWidth: 150 },
    { field: "amount", headerName: "Amount", flex: 1.5, minWidth: 150 },
    { field: "status", headerName: "Status", flex: 1.5, minWidth: 150 },
  ];


  const rows = [];

  return (
    <div className="p-6 flex flex-wrap lg:flex-nowrap gap-6">
      <div className="w-auto lg:w-1/4 border rounded-lg">
        <div className='border-b p-4'>
          Filters
        </div>

        <div className="mt-4 space-y-3 p-4">
          <Typography variant="body2" fontWeight="bold">Search By Dates</Typography>
          <TextField
            label="From"
            type="date"
            fullWidth
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarToday fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="To"
            type="date"
            fullWidth
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarToday fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mt-6">
          <div className='font-bold pl-4'>Products</div>
          {products.map((product) => (
            <div key={product} className="flex items-center mt-2">
              <Checkbox
                checked={selectedProducts.includes(product)}
                onChange={() => handleProductChange(product)}
              />
              <Typography>{product}</Typography>
            </div>
          ))}
        </div>

        <div className="mt-6">
        <div className='font-bold pl-4'>Status</div>
          {statuses.map((status) => (
            <div key={status} className="flex items-center mt-2">
              <Checkbox
                checked={selectedStatus.includes(status)}
                onChange={() => handleStatusChange(status)}
              />
              <Typography>{status}</Typography>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between gap-3 m-2">
          <button className="border border-indigo-500 text-indigo-500 rounded-xl px-4 py-1">Clear</button>
          <button className="border text-white bg-indigo-500 font-semibold rounded-xl px-4 py-2">Apply Filter</button>
        </div>
      </div>

      <div className="flex max-w-5xl">
        <Box sx={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              Invoices
            </Typography>
          </Box>
          
          <Box sx={{ px: 3, pb: 2 }}>
            <TextField
              placeholder="Invoice number"
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
          </Box>
          
          <Box sx={{ 
            width: '100%', 
            '& .MuiDataGrid-root': {
              border: 'none',
              '& .MuiDataGrid-cell': {
                borderBottom: 'none'
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#e5e7eb',
                borderBottom: 'none'
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: 'none'
              }
            }
          }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableColumnMenu
              disableColumnSelector
              disableSelectionOnClick
              autoHeight
              sx={{
                "& .MuiDataGrid-columnSeparator": { display: "none" },
                "& .MuiDataGrid-columnHeaders": { borderBottom: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
              }}
              components={{
                NoRowsOverlay: () => (
                  <Box sx={{ 
                    display: 'flex', 
                    height: '100%', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    py: 8
                  }}>
                    <Typography color="text.secondary">No rows</Typography>
                  </Box>
                ),
                Pagination: () => (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center',
                    p: 2
                  }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                      Rows per page:
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      px: 1,
                      mr: 3
                    }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>5</Typography>
                      <KeyboardArrowDown fontSize="small" color="action" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 3 }}>
                      0-0 of 0
                    </Typography>
                    <NavigateBefore color="action" sx={{ mr: 1 }} />
                    <NavigateNext color="action" />
                  </Box>
                )
              }}
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default InvoicePage;