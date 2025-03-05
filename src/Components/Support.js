import React, { useState } from 'react'
import Navbar from './Navbar'
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
  Paper,
  Grid, InputAdornment
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

function Support() {
  const [activeTab, setActiveTab] = useState('All');

  const [selectedProduct, setSelectedProduct] = useState("");
  const [focused, setFocused] = useState(false);
  const [searchFocus, setSearchFocus]=useState("false");

  const tabs = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];

  return (
    <Box>
      <Box position="sticky" top={0} zIndex={10} bgcolor="white">
        <Navbar />
      </Box>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper elevation={0}>
          <Box >
            <Grid container justifyContent="space-between" alignItems="center" mb={3} px={4}>
              <Grid item>
                <Typography variant="h4" color="text.primary" fontWeight={600}>
                  Support Tickets
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  Create a Ticket
                </Button>
              </Grid>
            </Grid>

            <Box borderBottom={1} borderColor="divider">
              <Grid container spacing={2} sx={{ pb: 1 }}>
                {tabs.map((tab) => (
                  <Grid item key={tab}>
                    <Button
                      variant="text"
                      color={activeTab === tab ? 'primary' : 'inherit'}
                      sx={{
                        borderBottom: activeTab === tab ? 2 : 0,
                        borderColor: activeTab === tab ? 'primary.main' : 'transparent',
                        borderRadius: 0,
                      }}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
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
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
        sx={{
          "& .MuiInputBase-root": {
            border: `3px solid ${searchFocus ? "#1976D2" : "#F8F8F8"}`,
            borderRadius: "10px",
            backgroundColor: "white",
            width: "100%",
            height: "58px",
            paddingLeft: "10px", 
            paddingBottom:"12px"
          },
          "& .MuiInputBase-root:hover": {
            backgroundColor: "#F8F8F8",
          },
          "& .MuiInputBase-root.Mui-focused": {
            border: "3px solid #1976D2",
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
                        border: `3px solid ${focused ? "#1976D2" : "#F8F8F8"}`,
                        borderRadius: "10px",
                        backgroundColor: "white",
                        width: "100%",
                        height: "58px",
                      },
                      "& .MuiInputBase-root:hover": {
                        backgroundColor: "#F8F8F8",
                      },
                      "& .MuiInputBase-root.Mui-focused": {
                        border: "3px solid #1976D2",
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
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Zunoy-ACC">Zunoy-ACC</MenuItem>
                      <MenuItem value="Zunoy-Watch Tower">Zunoy-Watch Tower</MenuItem>
                      <MenuItem value="Zunoy-Endpoint">Zunoy-Endpoint</MenuItem>
                      <MenuItem value="Zunoy-FormFlow">Zunoy-FormFlow</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"

                py={6}
                textAlign="center"
              >

                <div>
                  <img
                    src="https://dev-account.zoop360.com/assets/errors/no-data.svg"
                    alt="No tickets"
                    className='h-64'

                  />
                  No Tickets found.
                </div>


              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Support