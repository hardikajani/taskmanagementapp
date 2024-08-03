
import { Dialog, DialogHeader, DialogBody, Input, Select, Option, } from "@material-tailwind/react";
import PropTypes from 'prop-types';
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import api from "../../utils/baseURL";

export function AddEditTask({ open, setOpen, mode, initialFormData, getAllTasks }) {
    const [formData, setFormData] = useState(initialFormData)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { userData } = useSelector((state) => state.auth);


    const token = userData?.stsTokenManager.accessToken;


    const addNewTask = async () => {
        setLoading(true);
        if (!validateForm()) return;
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            // Make API request to add task
            const response = await api.post('/api/tasks/create', formData, { headers });
            console.log("Task added successfully:", response.data);
            if (response.data.success == true) {
                setLoading(false);
                getAllTasks();
                handleCancel();
                return;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.message);
                setError("Failed to add task. Please try again.");
            } else {
                console.error("Unexpected error:", error);
                setError("An unexpected error occurred. Please try again.");
            }
            setLoading(false);
        }
    }

    const editTask = async () => {
        setLoading(true);
        if (!validateForm()) return;
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            // Make API request to add task
            const id = initialFormData.id;
            const response = await api.put(`/api/tasks/updateTask/${id}`, formData, { headers });
            console.log("Task added successfully:", response.data);
            if (response.status === 200) {
                setLoading(false);
                getAllTasks();
                handleCancel();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.message);
                setError("Failed to add task. Please try again.");
            } else {
                console.error("Unexpected error:", error);
                setError("An unexpected error occurred. Please try again.");
            }
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mode === "add") {
            addNewTask();
        } else {
            editTask();
        }
        
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.title.trim()) {
            errors.title = "Title is required";
        }
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCancel = () => {
        setOpen(false);
        setFormData({
            title: "",
            description: "",
            status: "To Do",
        });
    };

    return (
        <>
            <Dialog
                open={open}
                handler={!open ? handleCancel : null}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>
                    {mode === "add" ? "Create New Task" : "Edit Task"}
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                aria-invalid={error && error.title ? true : false}
                                aria-describedby={error && error.title ? "title-error" : null}
                            />
                            {error && error.title && (
                                <div id="title-error" className="text-red-600">
                                    {error.title}
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <div className="relative w-full min-w-[200px]">
                                <textarea
                                    className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                                <label
                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Description
                                </label>
                            </div>
                        </div>
                        <div className="mb-4 w-10">
                            <Select
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={(val) => setFormData({ ...formData, status: val })}
                            >
                                <Option value="To Do">To Do</Option>
                                <Option value="In Progress">In Progress</Option>
                                <Option value="Done">Done</Option>
                            </Select>
                        </div>
                        <div className="flex justify-end self-end gap-3">
                            <button
                                type="button"
                                className="bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm rounded-2xl hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm rounded-2xl hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {mode === "add" ? "Create" : "Update"}
                                {loading && <span className="loading loading-spinner"></span>}
                            </button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}

AddEditTask.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    initialFormData: PropTypes.object,
    getAllTasks: PropTypes.func,
};