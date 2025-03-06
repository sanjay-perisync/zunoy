import React from 'react'

function CreateTicket() {
  return (
    <div>
        <button className='flex gap-2'>
            <img src='' alt=''></img>
            <p>Back</p>
        </button>


        {/* form for entering the data */}
        <main>
            <div>
                <p>Create a Ticket</p>
                <p>Fill the form below</p>
            </div>

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
        </main>
    </div>
  )
}

export default CreateTicket;