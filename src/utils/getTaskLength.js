export const getTaskCount=(tasks)=>{
    return tasks[0]?tasks.length:0
}

export const getCompleteTaskCount=(tasks)=>{
    return tasks.filter(t=>t.status==='Completed').length
}

export const getPendingTaskCount=(task)=>{
    return getTaskCount(task)-getCompleteTaskCount(tasks)
}