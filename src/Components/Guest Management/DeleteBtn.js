import React from 'react';
import { DeleteGuestAPI } from '../../APIconfig/DeleteApiConfig';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';

function DeleteBtn({ isModalOpen, setIsModalOpen, selectedGuest }) {
  const dispatch = useDispatch();
  const[loading,setLoading]=useState(false);

  const handleDelete = (guestId) => {
    if (!guestId) return;
    
    dispatch(DeleteGuestAPI(guestId, setLoading));
    setIsModalOpen(false);
  };

  if (!isModalOpen) 
  return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white rounded-xl shadow-lg max-w-lg lg:w-[500px]">
        <h2 className="text-2xl font-semibold p-4">Confirmation</h2>

        <p className="mt-2 px-4 py-2 text-red-500 flex flex-col">
          <span>Would you like to delete the account ?</span>
          <span className="font-semibold text-[16px]">{selectedGuest?.name}?</span>
        </p>

        <div className="mt-4 flex justify-end space-x-2 p-4">
          <button
            className="px-4 py-2 hover text-gray-400 font-semibold"
            onClick={() => setIsModalOpen(false)} 
          >
            CANCEL
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={() => handleDelete(selectedGuest?.id)}
            disabled={loading}
          >
             {loading ? <CircularProgress/> : "DELETE"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBtn;
