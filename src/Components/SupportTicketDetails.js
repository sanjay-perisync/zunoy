import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Mainpagefooter from "./Mainpagefooter";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import { postComment } from "../APIconfig/PostApiconfig";
import { fetchTicketDetails, fetchChat } from "../APIconfig/getAPIconfig";
const SupportTicketDetails = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    const [chatHistory, setChatHistory] = useState([]);



    const ticket = useSelector((state) => state.TicketSliceReducer.TicketDetailsSlice);

    console.log("ticket info : ", ticket);


    useEffect(() => {
        dispatch(fetchTicketDetails(id, { setLoading }));
    }, [dispatch, id]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const productLogos = {
        FormFlow: "https://account.zunoy.com/images/zoopform.svg",
        Endpoint: "https://account.zunoy.com/images/zoopapi.svg",
        WatchTower: "https://account.zunoy.com/images/zooptime.svg",
        Accounts: "https://dev-account.zoop360.com/images/zunoy.svg",
    };


    // const handlePostMessage = async () => {
    //     if (!message.trim()) return;

    //     const newMessage = await postComment(message, 124);
    //     if (newMessage) {
    //         setChatHistory((prev) => [newMessage, ...prev]);
    //         setMessage("");
    //     }
    // };


    const handlePostMessage = () => {
        if (!message.trim()) return;
    
        dispatch(postComment(message, id, { setLoading }));
        setMessage("");
    };

    
    const postComments=useSelector((state)=>state.TicketSliceReducer.postCommentSlice);
    console.log("comment:", postComments);
    

    // useEffect(() => {
    //     dispatch(fetchChat( id, {setLoading }));
    //   }, [dispatch, id]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        if (newValue === 1) {
            dispatch(fetchChat(id, { setLoading }));
        }
    };


    const chat = useSelector((state) => state.TicketSliceReducer.ChatSlice);


    return (
        <div>
            <header className="top-0 left-0 sticky z-10 bg-white">
                <Navbar />
            </header>

            <div className="max-w-[1350px] mx-auto my-10 px-4">

                <Link to="/support" className="flex items-center mb-4 space-x-1">
                    <ArrowBack fontSize="small" className="text-black" />
                    <span className="hover:underline">Support tickets</span>
                </Link>

                <h2 className="text-3xl font-bold mb-4">Ticket ID: {ticket?.id}</h2>

                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label="Overview" />
                    <Tab label="Chat" />
                </Tabs>
                <hr className="border-t border-gray-300" />

                {loading ? (
                    <div className="flex justify-center py-6">
                        <CircularProgress />
                    </div>
                ) : ticket ? (
                    <>
                        {activeTab === 0 && (
                            <div className="bg-white border rounded-lg mt-6 max-w-[900px]">
                                <div className="flex items-center justify-between px-6 py-4">
                                    <h3 className="text-lg font-semibold mb-4">Support Ticket Details</h3>
                                    <div>
                                        <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${ticket.status?.trim().toLowerCase() === "open" ? "bg-red-500" : "bg-green-500"}`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-y-3 text-sm">
                                    <div className="font-semibold border-y border-gray-300 px-6 py-4">Category</div>
                                    <div className="border-y text-gray-500 border-gray-300 px-6 py-4">{ticket.category}</div>

                                    <div className="font-semibold border-b border-gray-300 px-6 py-3">Product/Service</div>
                                    <div className="flex items-center border-b border-gray-300 px-6 py-3 text-gray-500">
                                        <img
                                            src={productLogos[ticket.product?.name] || "/static/icons/api.svg"}
                                            alt={ticket.product?.name || "Product Icon"}
                                            className="w-7 h-7 mr-2"
                                        />
                                        {ticket.product?.name}
                                    </div>

                                    <div className="font-semibold border-b border-gray-300 px-6 py-3">Description</div>
                                    <div className="border-b border-gray-300 px-6 py-3 text-gray-500">{ticket.description}</div>

                                    <div className="font-semibold border-b border-gray-300 px-6 py-3">Priority</div>
                                    <div className="border-b border-gray-300 px-6 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${ticket.priority?.trim().toLowerCase() === "high"
                                                ? "bg-red-500"
                                                : ticket.priority?.trim().toLowerCase() === "medium"
                                                    ? "bg-orange-500"
                                                    : "bg-sky-500"
                                                }`}
                                        >
                                            {ticket.priority?.charAt(0).toUpperCase() + ticket.priority?.slice(1).toLowerCase()}
                                        </span>
                                    </div>

                                    <div className="font-semibold border-b border-gray-300 px-6 py-3">Created at</div>
                                    <div className="border-b border-gray-300 px-6 py-3 text-gray-500">
                                        {new Date(ticket.createdAt).toLocaleString(undefined, {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </div>

                                    <div className="font-semibold px-6 py-3">Updated at</div>
                                    <div className="px-6 py-3 text-gray-500">{ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleString() : "---"}</div>
                                </div>
                            </div>
                        )}

                        {activeTab === 1 && (
                            <div className="mt-4 rounded-lg">
                                {/* Message Input Section */}
                                <div className="border rounded-lg p-4">
                                    <div className="font-semibold mb-2">Enter the message</div>
                                    <textarea
                                        className="w-full border rounded-lg p-2 text-sm"
                                        placeholder="What's the status of the Ticket"
                                        maxLength={512}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <div className="flex items-center justify-between mt-2">
                                        <label className="cursor-pointer flex items-center gap-1">
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                            />
                                            <Icon icon="mdi:paperclip" className="text-gray-600 text-xl" />
                                            {selectedFile ? (
                                                <div className="flex items-center space-x-2 border px-2 py-1 rounded-lg">
                                                    <span className="text-red-500 text-sm">{selectedFile.name}</span>
                                                    <button onClick={() => setSelectedFile(null)} className="text-red-500">
                                                        <Icon icon="mdi:close-circle" className="text-lg" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <p>Select file from device</p>
                                            )}
                                        </label>

                                        <button
                                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
                                            onClick={handlePostMessage}
                                            disabled={!message.trim()}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>

                                {/* Chat History Section */}
                                <div className="mt-4 border rounded-lg p-4">
                                    <div className="font-semibold border-b py-2 mb-4">Chat History</div>
                                    {chat.length > 0 ? (
                                        chat.map((chat) => (
                                            <div key={chat.id} className="flex items-start space-x-3 mt-2 ">
                                                <img
                                                    src={chat.profilePic}
                                                    alt="User"
                                                    className="w-10 h-10 object-cover rounded-full"
                                                />
                                                <div className="flex-1 flex justify-between bg-gray-100 p-3 rounded-lg">
                                                    <div className="font-semibold">{chat.name}
                                                        <p className="text-gray-600">{chat.comment}</p>
                                                    </div>

                                                    <div>
                                                        <span className="text-gray-400 text-xs">
                                                            {new Date(chat.createdAt).toLocaleString(undefined, {
                                                                hour: 'numeric',
                                                                minute: 'numeric',
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>


                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-gray-500 text-sm mt-2">No data available</div>
                                    )}
                                </div>
                            </div>
                        )}

                    </>
                ) : (
                    <p className="text-red-600 mt-4">Ticket not found.</p>
                )}
            </div>

            <footer className="max-w-[1350px] mx-auto">
                <Mainpagefooter />
            </footer>
        </div>
    );
};

export default SupportTicketDetails;
