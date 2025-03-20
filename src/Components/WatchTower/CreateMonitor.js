import { useState } from "react";
import { TextField, Button, Box, FormControlLabel, Switch, ToggleButton, ToggleButtonGroup, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar";
import AlertComp from "./AlertComp";
import WhitelistIPAccordion from "./WhitelistIPAccordion ";
import Mainpagefooter from "../Mainpagefooter";
import AdditionalSet from "./AdditionalSet";
import { AddMonitorAPI } from "../../APIconfig/PostApiconfig";

const CreateMonitor = () => {


    const [formData, setFormData] = useState({
        name: "",
        type: "",
        monitorURL: "",
        protocol: "https",
        port: "",
        keyword: "",
        interval: "5",
        keyFound: true,
        keyNotFound: false,
        caseSensitive: false
    });

    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();




    const monitor = useSelector((state) => state?.MonitorSliceReducer?.MonitorSlice || []);

    console.log("monitor data:", monitor);

    const handleSubmit = () => {
        setLoading(true);

        const intervalMapping = {
            "5": 300,
            "10": 600,
            "30": 1800,
            "60": 3600,
        };

       
        let payload = {
            type: formData.type.toLowerCase(),
            alert: true,
            name: formData.name,
            alertInterval: 5,
            location: ["MUMBAI"],
            incident: true,
            alertInfo: {
                notification: true,
                call: false,
                sms: false,
                email: false,
                whatsApp: true,
                bulkAlert: true,
                members: []
            },
            certificateExpire: {
                status: false,
                notify: {
                    From: 2,
                    frequency: 1
                }
            },
            domainExpire: {
                status: false,
                notify: {
                    From: 2,
                    frequency: 1
                }
            },
            statusCode: [200],
            tags: []
        };

        switch (formData.type.toLowerCase()) {
            case "https":
                payload = {
                    ...payload,
                    https: {
                        host: formData.monitorURL?.trim(),
                        protocol: formData.protocol + "://",
                        redirect: false,
                        interval: intervalMapping[formData.interval] || 300,
                        timeout: 30,
                        method: "HEAD",
                        advanced: {
                            authentication: {
                                username: "",
                                password: ""
                            },
                            customHeaders: [],
                            queryParam: [],
                            body: ""
                        }
                    }
                };
                break;

            case "port":
                payload = {
                    ...payload,
                    port: {
                        host: formData.monitorURL?.trim(),
                        protocol: formData.protocol + "://",
                        port: parseInt(formData.port),
                        interval: intervalMapping[formData.interval] || 300,
                        timeout: 30
                    }
                };
                break;

            case "keyword":
                payload = {
                    ...payload,
                    keyword: {
                        host: formData.monitorURL?.trim(),
                        protocol: formData.protocol + "://",
                        keyword: formData.keyword,
                        alertWhen: formData.keyFound ? "found" : "notFound",
                        caseSensitive: formData.caseSensitive,
                        method: "GET",
                        redirect: false,
                        interval: intervalMapping[formData.interval] || 300,
                        timeout: 30,
                        advanced: {
                            authentication: {
                                username: "",
                                password: ""
                            },
                            customHeaders: [],
                            queryParam: [],
                            body: ""
                        }
                    }
                };
                break;

            case "ping":
                payload = {
                    ...payload,
                    ping: {
                        host: formData.monitorURL?.trim(),
                        interval: intervalMapping[formData.interval] || 300
                    }
                };
                break;

            default:
                break;
        }

        console.log("payload data:", payload);
        dispatch(AddMonitorAPI(payload, setLoading));
    };

    // const handleSubmit = () => {
    //     setLoading(true);


    //     const intervalMapping = {
    //         "5": 300,
    //         "10": 600,
    //         "30": 1800,
    //         "60": 3600,
    //     };

    //     const payload = {

    //         type: formData.type.toLowerCase(),
    //         alert: true,
    //         name: formData.name,
    //         alertInterval: 5,
    //         location: ["MUMBAI"],
    //         incident: true,
    //         alertInfo: {
    //             notification: true,
    //             call: false,
    //             sms: false,
    //             email: false,
    //             whatsApp: true,
    //             bulkAlert: true,
    //             members: []
    //         },
    //         certificateExpire: {
    //             status: false,
    //             notify: {
    //                 From: 2,
    //                 frequency: 1
    //             }
    //         },
    //         domainExpire: {
    //             status: false,
    //             notify: {
    //                 From: 2,
    //                 frequency: 1
    //             }
    //         },
    //         https: {
    //             host: formData.monitorURL?.trim(),
    //             protocol: formData.protocol + "://",
    //             redirect: false,
    //             interval: intervalMapping[formData.interval] || 300,
    //             timeout: 30,
    //             method: "HEAD",
    //             advanced: {
    //                 authentication: {
    //                     username: "",
    //                     password: ""
    //                 },
    //                 customHeaders: [],
    //                 queryParam: [],
    //                 body: ""
    //             }
    //         },
    //         statusCode: [200],
    //         tags: []
    //     };

    //     console.log("payload data:", payload);
    //     dispatch(AddMonitorAPI(payload, setLoading));
       

    // };

    return (
        <div className="">
            <header className="top-0 left-0 sticky bg-white z-10">
                <Navbar />
            </header>

            <div className="mx-auto max-w-[1400px] space-y-4 mt-5 px-4">
                <Link to={"/monitors"} className="flex items-center gap-2 mb-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" />
                    </svg>
                    <span className='hover:underline'>Monitors</span>
                </Link>

                <h1 className="font-semibold text-[32px] mb-4">
                    Create a new Monitor
                </h1>

                <Box className="bg-white border rounded-xl ">

                    <section className="flex flex-wrap lg:flex-nowrap gap-5 w-full p-6 ">
                        <div className="space-y-2">
                            <p className="font-semibold text-lg">
                                Monitor Name & Type
                            </p>
                            <p className="text-gray-500  mb-4 mx-auto max-w-xl">
                                Give your monitor a unique name to make it easy to identify in your workspace. Then, choose the monitor type that suits your needs.
                            </p>
                        </div>


                        <div className="w-full space-y-2">
                            <TextField
                                fullWidth
                                label="Monitor Name"
                                variant="filled"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                inputProps={{ maxLength: 32 }}
                                helperText={`${formData.name.length}/32`}
                                className="mb-4 flex justify-end items-end"
                                sx={{
                                    "& .MuiInputBase-root": {
                                        border: "3px solid",
                                        borderColor: "#F8F8F8",
                                        borderRadius: "8px",
                                        backgroundColor: "white",
                                        transition: "border-color 0.3s ease",
                                    },
                                    "& .MuiInputBase-root:hover": {
                                        borderColor: "#BEBEBE",
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
                            // onFocus={() => setFocused(true)}
                            // onBlur={() => setFocused(false)}
                            />
                            <p className=" text-gray-500 mb-2">
                                Select Monitor type <a href="#" className="text-blue-500">Need help?</a>
                            </p>

                            <ToggleButtonGroup
                                value={formData.type}
                                exclusive
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="mb-4"
                            >
                                <ToggleButton value="HTTPS">HTTP(S)</ToggleButton>
                                <ToggleButton value="PORT">PORT</ToggleButton>
                                <ToggleButton value="KEYWORD">KEYWORD</ToggleButton>
                                <ToggleButton value="PING">PING (ICMP)</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </section>

                    {!formData.type && (
                        <div className="flex justify-end">
                            <Link to="/monitors" className="font-semibold hover:bg-gray-100 rounded-lg px-4 py-2 m-2">
                                Cancel
                            </Link>
                        </div>
                    )}

                </Box>

                {/* HTTPS */}
                {formData.type === "HTTPS" && (
                    <div className="bg-white flex flex-wrap lg:flex-nowrap border rounded-xl p-6 mt-4">
                        <div>
                            <p className="font-semibold text-lg">Monitor Information</p>
                            <p className="text-gray-500 max-w-lg mb-4">
                                The provided URL will be monitored, and the specified interval will ensure continuous site performance and optimal uptime.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <section className="flex gap-5">
                                <div className="flex items-center gap-4">
                                    <select
                                        className="border rounded-lg px-3 py-4 bg-white"
                                        value={formData.protocol}
                                        onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                                    >
                                        <option value="https">https://</option>
                                        <option value="http">http://</option>
                                    </select>
                                </div>

                                <TextField
                                    fullWidth
                                    label="Monitor URL"
                                    variant="filled"
                                    placeholder="mywebsitename.com/"
                                    value={formData.monitorURL}
                                    onChange={(e) => setFormData({ ...formData, monitorURL: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            border: "3px solid",
                                            borderColor: "#F8F8F8",
                                            borderRadius: "8px",
                                            backgroundColor: "white",
                                            transition: "border-color 0.3s ease",
                                        },
                                        "& .MuiInputBase-root:hover": {
                                            borderColor: "#BEBEBE",
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
                                <select
                                    className="border rounded-lg px-3 py-4 bg-white"
                                    value={formData.checkInterval}
                                    onChange={(e) => setFormData({ ...formData, checkInterval: e.target.value })}
                                >
                                    <option value="5">Every 5 minutes</option>
                                    <option value="10">Every 10 minutes</option>
                                    <option value="30">Every 30 minutes</option>
                                    <option value="60">Every 1 hour</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}


                {formData.type === "PORT" && (
                    <div className="bg-white flex flex-wrap lg:flex-nowrap border rounded-xl p-6 mt-4">
                        <div>
                            <p className="font-semibold text-lg">Monitor Information</p>
                            <p className="text-gray-500 max-w-lg mb-4">
                                The provided URL will be monitored, and the specified interval will ensure continuous site performance and optimal uptime.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <section className="flex gap-5">
                                <div className="flex items-center gap-4">
                                    <select
                                        className="border rounded-lg px-3 py-4 bg-white"
                                        value={formData.protocol}
                                        onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                                    >
                                        <option value="https">https://</option>
                                        <option value="http">http://</option>
                                    </select>
                                </div>

                                <TextField
                                    fullWidth
                                    label="Monitor URL"
                                    variant="filled"
                                    placeholder="mywebsitename.com/"
                                    value={formData.monitorURL}
                                    onChange={(e) => setFormData({ ...formData, monitorURL: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            border: "3px solid",
                                            borderColor: "#F8F8F8",
                                            borderRadius: "8px",
                                            backgroundColor: "white",
                                            transition: "border-color 0.3s ease",
                                        },
                                        "& .MuiInputBase-root:hover": {
                                            borderColor: "#BEBEBE",
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
                                    value={formData.port}
                                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            border: "3px solid",
                                            borderColor: "#F8F8F8",
                                            borderRadius: "8px",
                                            backgroundColor: "white",
                                            transition: "border-color 0.3s ease",
                                        },
                                        "& .MuiInputBase-root:hover": {
                                            borderColor: "#BEBEBE",
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
                                <select
                                    className="border rounded-lg px-3 py-4 bg-white"
                                    value={formData.checkInterval}
                                    onChange={(e) => setFormData({ ...formData, checkInterval: e.target.value })}
                                >
                                    <option value="5">Every 5 minutes</option>
                                    <option value="10">Every 10 minutes</option>
                                    <option value="30">Every 30 minutes</option>
                                    <option value="60">Every 1 hour</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {formData.type === "KEYWORD" && (
                    <div className="bg-white flex flex-wrap lg:flex-nowrap border rounded-xl p-6 mt-4">
                        <div>
                            <p className="font-semibold text-lg">Monitor Information</p>
                            <p className="text-gray-500 max-w-lg mb-4">
                                The provided URL will be monitored, and the specified interval will ensure continuous site performance and optimal uptime.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <section className="flex gap-5">
                                <div className="flex items-center gap-4">
                                    <select
                                        className="border rounded-lg px-3 py-4 bg-white"
                                        value={formData.protocol}
                                        onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                                    >
                                        <option value="https">https://</option>
                                        <option value="http">http://</option>
                                    </select>
                                </div>

                                <TextField
                                    fullWidth
                                    label="Monitor URL"
                                    variant="filled"
                                    placeholder="mywebsitename.com/"
                                    value={formData.monitorURL}
                                    onChange={(e) => setFormData({ ...formData, monitorURL: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            border: "3px solid",
                                            borderColor: "#F8F8F8",
                                            borderRadius: "8px",
                                            backgroundColor: "white",
                                            transition: "border-color 0.3s ease",
                                        },
                                        "& .MuiInputBase-root:hover": {
                                            borderColor: "#BEBEBE",
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
                                    variant="filled"
                                    placeholder="Enter keyword"
                                    value={formData.keyword}
                                    onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            border: "3px solid",
                                            borderColor: "#F8F8F8",
                                            borderRadius: "8px",
                                            backgroundColor: "white",
                                            transition: "border-color 0.3s ease",
                                        },
                                        "& .MuiInputBase-root:hover": {
                                            borderColor: "#BEBEBE",
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

                            <div className="flex flex-col gap-5">
                                <select
                                    className="border rounded-lg px-3 py-4 bg-white"
                                    value={formData.checkInterval}
                                    onChange={(e) => setFormData({ ...formData, checkInterval: e.target.value })}
                                >
                                    <option value="5">Every 5 minutes</option>
                                    <option value="10">Every 10 minutes</option>
                                    <option value="30">Every 30 minutes</option>
                                    <option value="60">Every 1 hour</option>
                                </select>

                                <div>
                                    <div className="flex justify-between items-center my-4">
                                        <p>Make Keyword as Case Sensitive</p>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={formData.caseSensitive}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, caseSensitive: e.target.checked })
                                                    }
                                                />
                                            }
                                        />
                                    </div>

                                    <div className="flex gap-5">
                                        <button
                                            className={`flex items-center rounded border px-3 py-2 ${formData.keywordFound ? "border" : "bg-gray-100"
                                                }`}
                                            onClick={() =>
                                                setFormData({ ...formData, keywordFound: !formData.keywordFound, keywordNotFound: false })
                                            }
                                        >
                                            <span className="pr-2">Keyword is Found</span>
                                            <input type="checkbox" checked={formData.keywordFound} readOnly className="h-5 w-5" />
                                        </button>

                                        <button
                                            className={`flex items-center rounded border px-3 py-2 ${formData.keywordNotFound ? "border" : "bg-gray-100"
                                                }`}
                                            onClick={() =>
                                                setFormData({ ...formData, keywordNotFound: !formData.keywordNotFound, keywordFound: false })
                                            }
                                        >
                                            <span className="pr-2">Keyword is Not Found</span>
                                            <input type="checkbox" checked={formData.keywordNotFound} readOnly className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {formData.type === "PING" && (
                    <div className="bg-white flex flex-wrap lg:flex-nowrap border rounded-xl p-6 mt-4">
                        <div>
                            <p className="font-semibold text-lg">Monitor Information</p>
                            <p className="text-gray-500 max-w-lg mb-4">
                                The provided URL will be monitored, and the specified interval will ensure continuous site performance and optimal uptime.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <section className="flex gap-5">
                                <TextField
                                    fullWidth
                                    label="IP address or Domain"
                                    variant="filled"
                                    placeholder="136.198.0.1"
                                    value={formData.monitorURL}
                                    onChange={(e) => setFormData({ ...formData, monitorURL: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            border: "3px solid",
                                            borderColor: "#F8F8F8",
                                            borderRadius: "8px",
                                            backgroundColor: "white",
                                            transition: "border-color 0.3s ease",
                                        },
                                        "& .MuiInputBase-root:hover": {
                                            borderColor: "#BEBEBE",
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
                                <select
                                    className="border rounded-lg px-3 py-4 bg-white"
                                    value={formData.checkInterval}
                                    onChange={(e) => setFormData({ ...formData, checkInterval: e.target.value })}
                                >
                                    <option value="5">Every 5 minutes</option>
                                    <option value="10">Every 10 minutes</option>
                                    <option value="30">Every 30 minutes</option>
                                    <option value="60">Every 1 hour</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}


                {formData.type && (
                    <>
                        <AlertComp />
                        <AdditionalSet />
                        <WhitelistIPAccordion />

                        <div className="sticky bottom-0 left-0 z-20 w-full bg-white/80 backdrop-blur-sm py-4  h-20 flex justify-end gap-4 mx-auto max-w-[1400px]">
                            <button
                                type="button"
                                className="px-6 py-2 font-semibold flex items-center"
                            >
                                <Link to="/monitors">
                                    Cancel
                                </Link>
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 text-white flex items-center"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress />
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>

            <footer className="mx-auto max-w-[1400px] mt-5">
                {/* <Mainpagefooter/> */}
            </footer>
        </div>
    );
};

export default CreateMonitor;