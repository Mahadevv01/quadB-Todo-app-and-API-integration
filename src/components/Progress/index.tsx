import React from "react";
import { useTask } from "../../context/Task";
import { getCompleteTaskCount, getTaskCount } from "../../utils/getTaskLength";
import { useSelector } from "react-redux";
import getPercentage from "../../utils/percentageCalculator";

// Messages for User for different Scores
const Messages=[
    {key:'0',msg:"Let's get Started! 🚀"},
    {key:'50',msg:"Keep Up The Work 💪"},
    {key:'100',msg:"You are THE GOAT 🏆"}
]

export default function Progress(){
    const task=useSelector(state=>state.task)
    const taskCount=getTaskCount(task)
    const completeTaskCount=getCompleteTaskCount(task)
    const percentage=getPercentage(completeTaskCount,taskCount)

    const message=()=>{
        const pc=parseInt(percentage)
        if(pc===0){
            return Messages[0].msg
        }
        else if(pc<100){
            return Messages[1].msg
        }
        else{
            return Messages[2].msg
        }
    }

    return(
        <div className="grid grid-cols-2 items-center justify-center gap-3 border-2 border-white rounded-xl px-5 py-2 
        w-[350px] h-52">
            <div>
                {/* Message for User */}
                <p className="text-white font-sans text-xl">
                    {
                        message()
                    }
                </p>
            </div>
            <div className="flex flex-col gap-4">
                {/* Completed Tasks */}
                <div className="bg-red-500 rounded-full w-32 h-32 flex justify-center items-center">
                    <p className="text-black text-xl font-medium">{percentage}%</p>
                </div>
                <p className="text-white font-semibold">{completeTaskCount}/{taskCount} Completed</p>
            </div>
        </div>
    )
}