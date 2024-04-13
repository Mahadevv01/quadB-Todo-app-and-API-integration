import { createContext, useContext, useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { setTask } from "../store/taskSlice"

const TaskContext=createContext('')

export default function TaskProvider({children}){
    const dispatch=useDispatch()    // Dispatcher for Task Store
    const task=useSelector((state)=>state.task)  

    useEffect(()=>{
        const tasks=JSON.parse(localStorage.getItem('tasks'))   // Get Tasks from Local Storage API
        // If Tasks exist then Dispatch Payload
        if(tasks){
            dispatch(setTask(tasks))
        }
        else{
            dispatch(setTask([]))
        }
    },[dispatch])

    return(
        <TaskContext.Provider value={{task,dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask=()=>useContext(TaskContext)