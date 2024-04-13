// React Component InputBar
import React, { useState } from "react"
import {
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputGroup,
  } from '@chakra-ui/react'

  import {nanoid} from "nanoid"

  import {FiPlus} from 'react-icons/fi'
import { useTask } from "../../context/Task.jsx"
import { addTask } from "../../store/taskSlice"
import { useSelector, useDispatch } from "react-redux"


export default function TaskInput(){
    const [value,setValue]=useState('')
    const dispatch=useDispatch()

    // Create New Task
    const createNewTask=()=>{
        const newTask={id:nanoid(),title:value,status:'Pending',createdAt:new Date().toJSON()}
        dispatch(addTask(newTask))
    }

    // Handle Change
    const handleChange=(e)=>{
        setValue(e.target.value)
    }

    // Save Task
    const saveTask=()=>{
        if(value!==''){
            createNewTask()
            setValue('')
        }
    }

    //Handle Enter Button
    const handlePress=(e)=>{
        if(e.key==="Enter"){
            saveTask()
        }
    }

    return(
        <div className="border-[1px] px-5 py-2 rounded-md w-[350px]">
            <FormControl
            onSubmit={saveTask}
            >

                <InputGroup className="flex flex-row items-center justify-between gap-2">
                {/* Input Group for Task Title */}
                <Input type='text'
                color='white'
                value={value}
                _focus={{borderColor:'rgb(239 68 68)',boxShadow:'none'}}
                onChange={handleChange}
                onKeyDown={handlePress}
                />
                <IconButton
                 icon={<FiPlus/>} 
                 aria-label="Submit Button" 
                 bg='rgb(239 68 68)'
                 onClick={saveTask}
                 />
                </InputGroup>
                <FormHelperText>Enter your task</FormHelperText>

            </FormControl>
        </div>
    )
}