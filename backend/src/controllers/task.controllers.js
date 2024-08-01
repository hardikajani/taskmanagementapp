import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js'
import { Task } from '../models/task.model.js'



// Create a new task
const createTask = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body;

    if ([title, status].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "title and status fields are required");
    }

    const task = new Task({
        title,
        description,
        status,
        userId: req.user.uid,
    });
    await task.save();
    return res
        .status(201)
        .json(new ApiResponse(201, task, "Task created successfully"));
});

// Get all tasks
const getAllTasks = asyncHandler(async (req, res) => {
    const userId = req.user.uid;
    const tasks = await Task.find({ userId: userId });
    return res.status(200).json(new ApiResponse(200, tasks,));
});

// Get a single task
const getTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    return res.status(200).json(new ApiResponse(200, task, "Task retrieved successfully"));
});

// Update a task
const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    const { title, description, status } = req.body;
    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();
    return res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
});

// Delete a task
const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findByIdAndRemove(taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    return res.status(204).json(new ApiResponse(204, null, "Task deleted successfully"));
});

export {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
}