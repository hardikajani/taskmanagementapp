import mongoos, {Schema} from 'mongoose';

const taskSchema = new Schema(
    {
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: String, 
            required: true,
            enum : ["To Do", "In Progress", "Done"], 
            default: 'To Do'
        },
        userId: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }    
);


export const Task = mongoos.model('Task', taskSchema);