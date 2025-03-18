import { useState } from "react";
import { TextField, Button, Box, p, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import AlertComp from "./AlertComp";
import WhitelistIPAccordion from "./WhitelistIPAccordion ";
import Mainpagefooter from "../Mainpagefooter";
import AdditionalSet from "./AdditionalSet";


const CreateMonitor = () => {
    const [monitorName, setMonitorName] = useState("");
    const [monitorType, setMonitorType] = useState("HTTPS");
    const [focused, setFocused] = useState(false);

    const handleTypeChange = (event, newType) => {
        if (newType !== null) setMonitorType(newType);
    };

    return (
        <div className="">
            <header className="top-0 left-0 sticky bg-white z-10">
                <Navbar />
            </header>

            <div className="mx-auto max-w-[1400px] space-y-4 mt-5">
                <Link to={"/monitors"} className="flex items-center gap-2 mb-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" />
                    </svg>
                    <span className='hover:underline'>Monitors</span>
                </Link>

                <h1 className="font-semibold text-[32px] mb-4">
                    Create a new Monitor
                </h1>

                <Box className="bg-white border rounded-xl p-6 ">

                    <section className="flex flex-wrap lg:flex-nowrap gap-5 w-full">
                        <div className="space-y-2">
                            <p className="font-semibold text-lg">
                                Monitor Name & Type
                            </p>
                            <p className="text-gray-500 text-sm mb-4 mx-auto max-w-xl">
                                Give your monitor a unique name to make it easy to identify in your workspace. Then, choose the monitor type that suits your needs.
                            </p>
                        </div>


                        <div className="w-full space-y-2">
                            <TextField
                                fullWidth
                                label="Monitor Name"
                                variant="filled"
                                value={monitorName}
                                onChange={(e) => setMonitorName(e.target.value)}
                                inputProps={{ maxLength: 32 }}
                                helperText={`${monitorName.length}/32`}
                                className="mb-4 flex justify-end items-end"
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
                            />
                            <p className=" text-gray-500 mb-2">
                                Select Monitor type <a href="#" className="text-blue-500">Need help?</a>
                            </p>

                            <ToggleButtonGroup
                                value={monitorType}
                                exclusive
                                onChange={handleTypeChange}
                                className="mb-4"
                            >
                                <ToggleButton value="HTTPS">HTTP(S)</ToggleButton>
                                <ToggleButton value="PORT">PORT</ToggleButton>
                                <ToggleButton value="KEYWORD">KEYWORD</ToggleButton>
                                <ToggleButton value="PING">PING (ICMP)</ToggleButton>
                            </ToggleButtonGroup>





                        </div>
                    </section>



                    <Box className="flex justify-end">
                        <Link to="/monitors" className="font-semibold hover:bg-gray-100 rounded-lg px-4 py-2">
                            Cancel
                        </Link>
                    </Box>
                </Box>


                {monitorType === "HTTPS" && (
                    <div className="bg-white flex flex-wrap lg:flex-nowrap border rounded-xl p-6 mt-4">

                        <div>
                            <p className="font-semibold text-lg">Monitor Information</p>
                            <p className="text-gray-500 max-w-lg mb-4">
                                The provided URL will be monitored, and the specified interval will ensure continuous site performance and optimal uptime.
                            </p></div>


                        <div className="flex flex-col gap-4 w-full">


                            <section className="flex gap-5">
                                <div className="flex items-center gap-4">

                                    <select className="border rounded-lg px-3 py-4 bg-white">
                                        <option value="https">https://</option>
                                        <option value="http">http://</option>
                                    </select>
                                </div>


                                <TextField
                                    fullWidth
                                    label="Monitor URL"
                                    variant="filled"
                                    placeholder="mywebsitename.com/"
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
                                />
                            </section>



                            <div className="flex flex-col">

                                <select className="border rounded-lg px-3 py-4 bg-white">
                                    <option>Every 5 minutes</option>
                                    <option>Every 10 minutes</option>
                                    <option>Every 30 minutes</option>
                                    <option>Every 1 hour</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}






                {monitorType === "PORT" && (
                    <div className="bg-white flex flex-wrap lg:flex-nowrap border rounded-xl p-6 mt-4">

                        <div>
                            <p className="font-semibold text-lg">Monitor Information</p>
                            <p className="text-gray-500 max-w-lg mb-4">
                                The provided URL will be monitored, and the specified interval will ensure continuous site performance and optimal uptime.
                            </p></div>


                        <div className="flex flex-col gap-4 w-full">


                            <section className="flex gap-5">
                                <div className="flex items-center gap-4">

                                    <select className="border rounded-lg px-3 py-4 bg-white">
                                        <option value="https">https://</option>
                                        <option value="http">http://</option>
                                    </select>
                                </div>


                                <TextField
                                    fullWidth
                                    label="Monitor URL"
                                    variant="filled"
                                    placeholder="mywebsitename.com/"
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
                                />




                                <TextField

                                    label="Port"
                                    variant="filled"
                                    placeholder="4536"
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
                                />
                            </section>



                            <div className="flex flex-col">

                                <select className="border rounded-lg px-3 py-4 bg-white">
                                    <option>Every 5 minutes</option>
                                    <option>Every 10 minutes</option>
                                    <option>Every 30 minutes</option>
                                    <option>Every 1 hour</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}








                
{monitorType === "KEYWORD" && (
                    <div className="bg-white flex flex-wrap lg:flex-nowrap border rounded-xl p-6 mt-4">

                        <div>
                            <p className="font-semibold text-lg">Monitor Information</p>
                            <p className="text-gray-500 max-w-lg mb-4">
                                The provided URL will be monitored, and the specified interval will ensure continuous site performance and optimal uptime.
                            </p></div>


                        <div className="flex flex-col gap-4 w-full">


                            <section className="flex gap-5">
                                <div className="flex items-center gap-4">

                                    <select className="border rounded-lg px-3 py-4 bg-white">
                                        <option value="https">https://</option>
                                        <option value="http">http://</option>
                                    </select>
                                </div>


                                <TextField
                                    fullWidth
                                    label="Monitor URL"
                                    variant="filled"
                                    placeholder="mywebsitename.com/"
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
                                />




                                <TextField

                                    label="Keyword"
                                    variant="Zoop_Time"
                                    placeholder="4536"
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
                                />
                            </section>



                            <div className="flex flex-col">

                                <select className="border rounded-lg px-3 py-4 bg-white">
                                    <option>Every 5 minutes</option>
                                    <option>Every 10 minutes</option>
                                    <option>Every 30 minutes</option>
                                    <option>Every 1 hour</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}



                <AlertComp />
                <AdditionalSet />
                <WhitelistIPAccordion />
            </div>
            <footer className="mx-auto max-w-[1400px] mt-5">
                {/* <Mainpagefooter/> */}
            </footer>

        </div>
    );
};

export default CreateMonitor;
