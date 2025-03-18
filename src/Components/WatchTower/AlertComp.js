import { useState } from "react";
import { Switch, Button, MenuItem, Select, FormControl, InputLabel, ToggleButton, ToggleButtonGroup } from "@mui/material";

const AlertComp = () => {
    const [alertsEnabled, setAlertsEnabled] = useState(false);
    const [resendInterval, setResendInterval] = useState("5 minutes");
    const [notifyAll, setNotifyAll] = useState(true);
    const [focused, setFocused] = useState(false);
    const [collaborators, setCollaborators] = useState([]);
    const [inAppSelected, setInAppSelected] = useState(true);
    const [emailSelected, setEmailSelected] = useState(false);


    const toggleInApp = () => {
        setInAppSelected(!inAppSelected);
    }

    const toggleEmail = () => {
        setEmailSelected(!emailSelected);
    }

    const toggleAlerts = () => {
        setAlertsEnabled(!alertsEnabled);
    };



    return (
        <div className="">
            <div className="bg-white border rounded-lg p-6">
                <div className="flex flex-wrap lg:flex-nowrap gap-20 ">
                    <div>
                        <p className="font-semibold text-lg mb-4">
                            Alerts
                        </p>

                        <div className="flex gap-5">
                            <p className="text-gray-500 max-w-md">
                                When a monitor goes down, enable alerts to receive notifications and customize the intervals to stay informed as the issue progresses.
                            </p>

                        </div>

                    </div>


                    <section className="w-full">
                        <div className="flex justify-between items-center gap-5 w-full">
                            <p className="">Turn On / Off the Alerts</p>

                            <Switch checked={alertsEnabled} onChange={toggleAlerts} color="primary" />
                        </div>


                        {alertsEnabled && (

                            <section>
                                <div className="mt-4 space-y-2">

                                    <div className="flex gap-4 p-2">

                                        <button
                                            className={`flex items-center rounded border px-3 py-2 ${inAppSelected ? ' border' : 'bg-gray-100'}`}
                                            onClick={toggleInApp}
                                        >
                                            <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 2H7c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2M7 16.999V5h10l.002 11.999z" /></svg></span>
                                            <span className="pr-2">In App Notification</span>
                                            <input
                                                type="checkbox"
                                                checked={inAppSelected}
                                                readOnly
                                                className="h-5 w-5"
                                            />
                                        </button>


                                        <button
                                            className={`flex items-center rounded border px-3 py-2 ${emailSelected ? ' border' : 'bg-gray-100'}`}
                                            onClick={toggleEmail}
                                        >
                                            <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z" /></svg></span>
                                            <span className="pr-2">Email</span>

                                            <input
                                                type="checkbox"
                                                checked={emailSelected}
                                                readOnly
                                                className="h-5 w-5"
                                            />


                                        </button>
                                    </div>



                                    <FormControl fullWidth
                                        variant="filled" sx={{
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
                                        }}>
                                        <InputLabel>Alert Resend Interval</InputLabel>
                                        <Select value={resendInterval} onChange={(e) => setResendInterval(e.target.value)}>
                                            <MenuItem value="5 minutes">5 minutes</MenuItem>
                                            <MenuItem value="10 minutes">10 minutes</MenuItem>
                                            <MenuItem value="30 minutes">30 minutes</MenuItem>

                                        </Select>

                                    </FormControl>

                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-gray-700">Notify all teammates by default / turn off to select specific members.</p>
                                        <Switch checked={notifyAll} onChange={() => setNotifyAll(!notifyAll)} />
                                    </div>

                                    {!notifyAll && (
                                        <FormControl fullWidth className="mb-4">
                                            <InputLabel>Select required Collaborators</InputLabel>
                                            <Select multiple value={collaborators} onChange={(e) => setCollaborators(e.target.value)}>
                                                <MenuItem value="User1">User 1</MenuItem>
                                                <MenuItem value="User2">User 2</MenuItem>
                                                <MenuItem value="User3">User 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                </div>
                            </section>
                        )}
                    </section>
                </div>


            </div>
        </div>
    );
};

export default AlertComp;
