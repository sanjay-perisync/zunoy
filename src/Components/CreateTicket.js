
import Navbar from './Navbar';
import React, { useState } from "react";
import {
    TextField,
    Select,
    MenuItem,
 
    Checkbox,
    FormControl,
  
    Typography,
    Box,
} from "@mui/material";

import Mainpagefooter from './Mainpagefooter';
import { Link } from 'react-router-dom';

function CreateTicket() {
    const [products, setProducts] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("Low");
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    return (
        <div>


            <header className='top-0 left-0 sticky z-10 bg-white'>
                <Navbar />
            </header>

            <Box className="max-w-[1400px] mx-auto p-6 bg-white ">
                <Link to={"/support"} className="flex items-center gap-2 mb-4 ">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" /></svg>
                    <span className='hover:underline'>Back</span>
                </Link>


                <div className='border rounded-xl '>

                    <div className='border-b p-4'>
                        <Typography variant="h6" fontWeight="bold">
                            Create a Ticket
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Fill the form below
                        </Typography>
                    </div>

                    <Box className="mt-4 space-y-4 p-4">
                        <div className="w-full">
                            <Typography variant="body2" className=" pb-2">
                                Product/Service
                            </Typography>

                            <FormControl fullWidth>
                                <Select
                                    value={products}
                                    onChange={(e) => setProducts(e.target.value)}
                                    displayEmpty
                                >

                                    <MenuItem value="General">Zunoy Accounts</MenuItem>
                                    <MenuItem value="Technical">Watch Tower</MenuItem>
                                    <MenuItem value="Billing">FormFlow</MenuItem>
                                    <MenuItem value="MockAPI">Mock API</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <Box className="flex gap-4">

                            <div className="w-full">
                                <Typography variant="body2" className=" pb-2">
                                    Category *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        disabled
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled></MenuItem>
                                    </Select>
                                </FormControl>
                            </div>


                            <div className="w-full">
                                <Typography variant="body2" className=" pb-2">
                                    Set as priority *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="Low">Low</MenuItem>
                                        <MenuItem value="Medium">Medium</MenuItem>
                                        <MenuItem value="High">High</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Box>


                        <div className="w-full">

                            <Typography variant="body2" className="pb-2">
                                Message *
                            </Typography>


                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                            />


                            <div className="flex justify-end mt-1">
                                <Typography variant="body2" className="text-gray-500">
                                    0/512
                                </Typography>
                            </div>
                        </div>


                        <div className="border border-gray-300 hover:bg-gray-50 p-4 rounded-lg flex flex-col justify-center items-center space-y-2 h-32">
                            <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />

                            <label htmlFor="file-upload" className="cursor-pointer flex gap-4 items-center">


                                <div className='bg-gray-200 rounded-full p-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='h-8 w-8' viewBox="0 0 24 24"><path fill="currentColor" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" /></svg>
                                </div>
                                <p className="text-[18px] font-semibold"><span className='underline'>Click to upload</span> or drag and drop</p>
                            </label>
                        </div>


                        <Box className="flex items-center">
                            <Checkbox />
                            <Typography variant="body2">
                                Would you like us to reach out to you?
                            </Typography>
                        </Box>

                        <div className='flex justify-end items-end'>

                            <button className='bg-indigo-500 text-white rounded-xl px-4 py-2 font-semibold'>Submit</button>

                        </div>
                    </Box>
                </div>
            </Box>

        <footer className='mx-auto max-w-[1400px]'>
        <Mainpagefooter />
        </footer>
            
        </div>
    )
}

export default CreateTicket;