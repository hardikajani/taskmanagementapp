import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";
import { Select, Option } from "@material-tailwind/react";
import { MdAdd } from "react-icons/md";
import { AddEditTask } from "./AddEditTask";
import api from "../../utils/baseURL";
import { useSelector } from "react-redux";

function Home() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);
  const tasksPerPage = 6;
  const filteredTasks = Array.isArray(tasks) ? tasks.filter((task) => {
    if (selectedStatus === 'all') {
      return true;
    }
    const statusMap = {
      todo: 'To Do',
      inProgress: 'In Progress',
      done: 'Done',
    };
    return task.status === statusMap[selectedStatus];
  }) : [];

  const totalPages = Math.ceil((filteredTasks?.length ?? 0) / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const paginatedTasks = filteredTasks?.slice(startIndex, endIndex);
  const [open, setOpen] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const token = userData?.stsTokenManager.accessToken;

  const getAllTasks = async () => {
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await api.get('/api/tasks/alltasks', { headers });
      console.log(response.data);
      if (response.data.data.length > 0){
        setTasks(response.data.data);
        setLoading(false);
      }
      else{
        setTasks(null);
        setLoading(false);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTasks();
  },[]);


  if (loading) {
    return <div className="fixed top-0 left-0 w-full h-full bg-black/35 flex flex-col justify-center items-center text-white text-[18px]">Loading...</div>;
  }
  if (!tasks) {
    return <div className="w-full flex flex-col justify-center items-center self-center py-20 px-20">
      <h3 className="text-center text-[18px]">No tasks found, add task here!!</h3>   
      {/* add task button */}
      <button
          className="absolute w-10 h-10 lg:w-16 lg:h-16 flex justify-center items-center bottom-0 lg:bottom-2 right-4 lg:right-10 bg-indigo-600 hover:bg-indigo-500 rounded-2xl"
          onClick={() => setOpen(!open)}
        >
          <MdAdd className="text-[20px] lg:text-[32px] text-white" />
        </button>
        <AddEditTask
          open={open}
          setOpen={setOpen}
          mode="add"
          initialFormData={{ title: "", description: "", status: "To Do" }}
          getAllTasks={getAllTasks}
                    
        />   
      </div>;
  }

  return (
    <div className="w-full flex flex-col justify-center pt-5 px-2 gap-4 mb-2">
      <div className="flex justify-center self-end">
        <Select
          label="Status"
          value={selectedStatus}
          className="w-full"
          onChange={(val) => setSelectedStatus(val)}
        >
          <Option value="all">All</Option>
          <Option value="todo">To Do</Option>
          <Option value="inProgress">In Progress</Option>
          <Option value="done">Done</Option>
        </Select>
      </div>
      {/* Task Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 gap-6 justify-center self-center">
        {paginatedTasks?.map((task, index) => (
          <div
            key={index}
            className={`relative ${expandedCard === index ? 'h-full' : 'h-full'}  transition-all duration-300`}
            onClick={() => setExpandedCard(index)}
          >
            <TaskCard task={task} getAllTasks={getAllTasks} />
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="fixed flex justify-center bottom-0 left-0 right-0 p-2 items-end gap-2 bg-[#f7f7f7]">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`rounded-full px-2 font-bold ${currentPage === index + 1 ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'text-[#333]'}`}
          >
            {index + 1}
          </button>
        ))}
        {/* add task button */}
        <button
          className="absolute w-10 h-10 lg:w-16 lg:h-16 flex justify-center items-center bottom-0 lg:bottom-2 right-4 lg:right-10 bg-indigo-600 hover:bg-indigo-500 rounded-2xl"
          onClick={() => setOpen(!open)}
        >
          <MdAdd className="text-[20px] lg:text-[32px] text-white" />
        </button>
        <AddEditTask
          open={open}
          setOpen={setOpen}
          mode="add"
          initialFormData={{ title: "", description: "", status: "To Do" }}
          getAllTasks={getAllTasks}
                    
        />
      </div>
    </div>
  );
}

export default Home;