import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { viewMonitorDetails } from "../../APIconfig/getAPIconfig";
import Navbar from "../Navbar";
import { Tabs, Tab } from "@mui/material";
import Overview from "./Overview";
import Logs from "./Logs";
import CriticalSettings from "./CriticalSettings";




const View = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (id) {
            dispatch(viewMonitorDetails(id, setLoading));
        }
    }, [dispatch, id]);

    const monitor = useSelector((state) => state?.MonitorSliceReducer?.ViewMonitorSlice || []);

    console.log("details:", monitor);

    const monitorName = monitor?.data?.name;
    const monitorHost =
        monitor?.data?.https?.host ||
        monitor?.data?.ping?.host ||
        monitor?.data?.keyword?.host ||
        monitor?.data?.port?.host ||
        "N/A";

    return (
        <div>
            <Navbar />

            <section className="mx-auto max-w-[1400px] px-4 mt-10">
                <Link to={"/monitors"} className="flex items-center gap-2 mb-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" />
                    </svg>
                    <span className='hover:underline font-semibold'>Monitors</span>
                </Link>

                <div className="flex flex-wrap justify-between gap-4">
                    <div className="flex items-center gap-5">
                        <div>
                            <div className="bg-red-500 h-5 w-5 rounded-full"></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-[28px]">{monitorName}</span>
                            <span className="bg-gray-300 px-2 py-[1px] rounded-xl">{monitorHost}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="bg-indigo-500 rounded-xl font-semibold text-white px-2 py-1 lg:px-3 lg:py-2">
                            Check Status
                        </button>

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0m0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0m0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0"/>
                            </svg>
                        </button>
                    </div>
                </div>

           <div className="border-b border-gray-300 overflow-x-auto scrollbar-hide">
    <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Tabs
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            aria-label="Monitor Tabs"
            textColor="primary"
            indicatorColor="primary"
            sx={{
                "& .MuiTab-root": { textTransform: "none", fontSize: "1rem", fontWeight: 500 },
                "& .Mui-selected": { color: "#6366F1" }, 
                display: "flex",
                flexWrap: "nowrap",
                minWidth: "max-content"
            }}
        >
            <Tab label="Overview" />
            <Tab label="Logs (beta)" />
            <Tab label="Settings" />
            <Tab label="Integration" />
            <Tab label="Critical Settings" sx={{ color: "#DC2626" }} />
        </Tabs>
    </div>
</div>


                <div className="mt-6">
                    {value === 0 && <Overview monitor={monitor}/>}
                    {value === 1 && <Logs />}
                    {/* {value === 2 && <Settings />}
                    {value === 3 && <Integration />} */}
                    {value === 4 && <CriticalSettings />}
                </div>
            </section>
        </div>
    );
};

export default View;
