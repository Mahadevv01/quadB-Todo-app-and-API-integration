import { createSlice } from "@reduxjs/toolkit";

const tasks=JSON.parse(localStorage.getItem('tasks'))

const taskSlice=createSlice({
    name:'task',
    initialState:[],
    reducers:{
        setTask:(state,action)=>{
            return action.payload
        },
        addTask:(state,action)=>{
            const tasks=[action.payload,...state]
            localStorage.setItem('tasks',JSON.stringify(tasks))
            return tasks
        },
        updateTaskList: (state, action) => {
            console.log(action.payload)
            const { id, title, status } = action.payload;
            const updatedTaskList = state.map(task => {
                if (task.id === id) {
                    // Create a new task object with updates only if there are changes
                    return {
                        id:id,
                        title:title!==undefined?title:task.title,
                        status:status!==undefined?status:task.status,
                        createdAt:task.createdAt,
                        updatedAt:new Date().toJSON()
                    };
                }
                return task;
            });
            console.log(updatedTaskList)
            localStorage.setItem('tasks',JSON.stringify(updatedTaskList))
            return updatedTaskList
        },
        removeTask:(state,action)=>{
            const newTasks= state.filter(task=>task.id!==action.payload) // Filter Out all ID's except for the ID provided in payload
            localStorage.setItem('tasks',JSON.stringify(newTasks))
            return newTasks
        }
    }
})

export const {setTask,updateTaskList,removeTask, addTask}=taskSlice.actions
export default taskSlice.reducer