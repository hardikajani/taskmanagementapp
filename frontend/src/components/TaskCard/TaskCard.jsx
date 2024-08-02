import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import PropTypes from 'prop-types';
import { useState } from "react";
import { AddEditTask } from "../../pages/Home/AddEditTask";

const getStatusColor = (status) => {
  switch (status) {
    case "To Do":
      return "text-orange-500";
    case "In Progress":
      return "text-blue-900";
    case "Done":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

const TaskCard = ({ task }) => {
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [open, setOpen] = useState(false);

  const truncatedTitle = task.title.substring(0, 16) + (task.title.length > 16 ? '...' : '');

  const truncatedDescription = task.description.substring(0, 60) + (task.description.length > 60 ? '...' : '');

  const handleDelete = (id) => {
    
    console.log('Deleting id:', id);
  };


  return (
    <div className="flex w-full md:w-[350px] flex-col rounded-xl bg-white bg-clip-border shadow-md md:shadow-lg">
      <div className="p-3 md:p-3">
        <div className="flex items-center justify-between mb-3">
          {/* title */}
          <h5 className="block font-sans text-xl antialiased font-bold leading-snug tracking-normal">
          {showFullTitle ? task.title : truncatedTitle}
          {task.title.length > 16 && (
            <span
              className="text-blue-600 cursor-pointer text-sm ml-2"
              onClick={() => setShowFullTitle(!showFullTitle)}
            >
              {showFullTitle ? 'Less' : 'More'}
            </span>
          )}            
          </h5>
          {/* status */}
          <span
            className={`text-sm font-bold ${getStatusColor(task.status)}`}
          >
            {task.status}
          </span>
        </div>
        {/* description */}
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
          {showFullDescription ? task.description : truncatedDescription}
          {task.description.length > 60 && (
            <span
              className="text-blue-600 cursor-pointer text-sm ml-2"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Less' : 'More'}
            </span>
          )}
        </p>
        <div className="inline-flex flex-wrap items-center gap-3 mt-2 md:mt-4 group">
          {/* edit button */}
          <button
            className="cursor-pointer rounded-full border border-[#f7f7f7] bg-[#f7f7f7] p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-indigo-600 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            <FaEdit />
          </button>
          <AddEditTask
          open={open}
          setOpen={setOpen}
          mode="edit"
          initialFormData={{ title: task.title, description: task.description, status: task.status }}
        />
          {/* delete button */}
          <button
            className="cursor-pointer rounded-full border border-[#f7f7f7] bg-[#f7f7f7] p-3 text-gray-900 transition-colors hover:text-white hover:border-gray-900/10 hover:bg-red-600 hover:!opacity-100 group-hover:opacity-70"
            onClick={handleDelete(task._id)}
          >
            <RiDeleteBin6Fill />
          </button>
        </div>
      </div>
    </div>
  )
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.oneOf(['To Do', 'In Progress', 'Done']).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;