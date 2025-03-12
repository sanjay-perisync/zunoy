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
    CircularProgress
} from "@mui/material";
import Mainpagefooter from './Mainpagefooter';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createSupportTicket } from '../APIconfig/PostApiconfig';


const serviceIDMapping = {
    "Zunoy-Accounts": 1,
    "Zunoy-WatchTower": 2,
    "Zunoy-FormFlow": 3,
    "Zunoy-MockAPI": 4,
};


const categoryOptions = {
    "Zunoy-Accounts": [
        "User access and permissions",
        "Account Security & Protection Issues",
        "Performance Queries",
        "Account Deactivation & Deletion Requests",
        "Notification delivery issues",
        "Others",
    ],
    "Zunoy-WatchTower": [
        "Status page and Custom domain issues",
        "Monitor status discrepancies",
        "Incident management issues",
        "Maintenance mode concerns",
        "Collaborators and Workspace configuration",
        "Integration Problems",
        "Billing & Invoices",
        "Plan & Payment Issues",
        "Notification delivery issues",
        "Others",
    ],
    "Zunoy-FormFlow": [
        "Custom domain setup issues",
        "Submission-related queries",
        "Spam filtering issues",
        "Collaborators and Workspace configuration",
        "Integration problems",
        "Billing & Invoices",
        "Plan & Payment Issues",
        "Notification delivery issues",
        "Others",
    ],
    "Zunoy-MockAPI": [
        "Custom domain setup issues",
        "Endpoint functionality",
        "Log Retention and API Limit",
        "Export Failure",
        "Collaborators and Workspace configuration",
        "Billing & Invoices",
        "Plan & Payment Issues",
        "Notification delivery issues",
        "Others",
    ],
};

function CreateTicket() {
    const [products, setProducts] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [reachOut, setReachOut] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    const handleSubmit = async () => {
        if (!products) {
            toast.error("Please select a Product/Service.");
            return;
        }
        if (!category) {
            toast.error("Please select a Category.");
            return;
        }
        if (!description) {
            toast.error("Please enter a message.");
            return;
        }

        setLoading(true);

        const serviceID = serviceIDMapping[products];

        const ticketData = {
            serviceID: serviceID,
            reachOut: reachOut,
            priority: priority.toLowerCase(),
            description: description,
            category: category,
            target: "support"
        };

        const response = await createSupportTicket(ticketData);

        setLoading(false);

        if (response.success) {
            toast.success("Ticket created successfully!");


            setProducts("");
            setCategory("");
            setPriority("Medium");
            setFile(null);
            setDescription("");
            setReachOut(false);


            window.dispatchEvent(new Event("ticketCreated"));
        } else {
            toast.error(response.error);
        }
    };
    return (
        <div>
            <header className='top-0 left-0 sticky z-10 bg-white'>
                <Navbar />
            </header>

            <Box className="max-w-[1400px] mx-auto p-6 bg-white ">
                <Link to={"/support"} className="flex items-center gap-2 mb-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" />
                    </svg>
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
                                    onChange={(e) => {
                                        setProducts(e.target.value);
                                        setCategory("");
                                    }}
                                    displayEmpty
                                >
                                    {Object.keys(serviceIDMapping).map((product) => (
                                        <MenuItem key={product} value={product}>
                                            {product}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <Box className="flex gap-4 flex-wrap lg:flex-nowrap">
                            <div className="w-full">
                                <Typography variant="body2" className=" pb-2">
                                    Category *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        displayEmpty
                                        disabled={!products}
                                    >
                                        {(categoryOptions[products] || []).map((cat) => (
                                            <MenuItem key={cat} value={cat}>
                                                {cat}
                                            </MenuItem>
                                        ))}
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>


                        <p>Upload File (optional)</p>
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
                            <Checkbox checked={reachOut} onChange={(e) => setReachOut(e.target.checked)} />
                            <Typography variant="body2">
                                Would you like us to reach out to you?
                            </Typography>
                        </Box>

                        <div className='flex justify-end items-end'>
                            <button
                                onClick={handleSubmit}
                                className='bg-indigo-500 text-white rounded-xl px-4 py-2 font-semibold flex items-center justify-center gap-2'
                                disabled={loading} 
                            >
                                {loading ? <CircularProgress size={20} color="inherit" /> : "Submit"}
                            </button>
                        </div>

                    </Box>
                </div>
            </Box>

            <footer className='mx-auto max-w-[1400px]'>
                <Mainpagefooter />
            </footer>
        </div>
    );
}

export default CreateTicket;
