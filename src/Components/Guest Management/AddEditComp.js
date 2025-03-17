import { Button, Checkbox, FormControlLabel, Modal, TextField, CircularProgress } from '@mui/material'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddGuestAPI } from '../../APIconfig/PostApiconfig';
import { UpdateGuestAPI } from '../../APIconfig/PutApiconfig';

export const AddEditComp = ({ open, handleClose, formData, setFormData, viewMode }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const isEditMode = Boolean(formData?.id);

    // const handleSubmit = () => {
    //     dispatch(AddGuestAPI(formData, setLoading));
    //     handleClose();
    // };


    const handleSubmit = () => {
        if (isEditMode) {
            dispatch(UpdateGuestAPI(formData, setLoading));
        } else {
            dispatch(AddGuestAPI(formData, setLoading));
        }
        handleClose();
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <div className="bg-white p-6 w-full z-20">
                <h2 className="text-lg font-semibold mb-4">Add Guest</h2>

                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="First Name *"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        fullWidth
                        disabled={viewMode}
                    />
                    <TextField
                        label="Last Name *"
                        name="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        fullWidth
                        disabled={viewMode}
                    />
                    <TextField
                        label="Email *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        fullWidth
                        disabled={viewMode}
                    />
                    <TextField
                        label="Contact *"
                        name="contact"
                        value={formData.phoneNo}
                        onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                        fullWidth
                        disabled={viewMode}
                    />
                </div>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.allowLogbook}
                            onChange={(e) => setFormData({ ...formData, allowLogbook: e.target.checked })}
                            name="allowLogbook"
                            disabled={viewMode}
                        />
                    }
                    label="Allow guest to access Tanker Logbook"
                    className="mt-3"
                />


                {!viewMode && (
                    <div className="flex justify-end gap-4 mt-4">
                        <button onClick={handleClose} className="text-gray-600 hover:bg-gray-200 font-semibold px-3 py-2 rounded-xl">
                            CANCEL
                        </button>
                        <button
                            variant="contained"
                            className="text-white font-semibold px-3 py-2 rounded-xl bg-indigo-500"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress /> : isEditMode ? "UPDATE" : "SUBMIT"}
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};
