// React Component for Task List
import React, { useState } from "react";
import {
     AlertDialog, 
    AlertDialogBody, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogOverlay, 
    Box, 
    Button, 
    Divider, 
    Flex, 
    FormControl, 
    FormHelperText, 
    FormLabel, 
    HStack, 
    Input, 
    InputGroup, 
    List, 
    ListIcon, 
    ListItem, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Radio, 
    RadioGroup, 
    useDisclosure 
} from "@chakra-ui/react";
import { FiDisc, FiEdit2, FiTrash2,FiCheckCircle  } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useTask } from "../../context/Task";
import { removeTask, updateTaskList } from "../../store/taskSlice";

// Edit Modal 
const EditModal=({isOpen,onClose,task})=>{

    const [title,setTitle]=useState(task?.title)
    const [status,setStatus]=useState(task?.status)
    const dispatch=useDispatch()
    
    const saveUpdatedTask=()=>{
        // Save Updated Task
        const {id}=task // Task Id
        dispatch(updateTaskList({id,title,status}))
        onClose()
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
            <ModalContent  bgColor='#121313' borderWidth='2px' borderColor='white'>
                <ModalHeader color='white'>Edit Task</ModalHeader>
                <ModalCloseButton color='white'/>
                <ModalBody>
                    <FormControl 
                    className="flex flex-col gap-2 items-center">
                        <FormLabel color='white'>Update the fields</FormLabel>
                        <InputGroup className="flex flex-col">
                            <Input type='text'
                            color='white'
                            defaultValue={task?.title}
                            value={title}
                            onChange={e=>setTitle(e.target.value)}
                            />
                            <FormHelperText>Enter New Title</FormHelperText>
                        </InputGroup>
                        <Divider/>


                        <RadioGroup defaultValue={task?.status} name="status" 
                        onChange={setStatus}
                        >
                            <HStack>
                                <Flex as='label'>
                                    <Radio value='Pending'/>
                                    <Box color='white' ml={2}>Pending</Box>
                                </Flex>

                                <Flex as='label'>
                                    <Radio value='Completed'/>
                                    <Box color='white' ml={2}>Completed</Box>
                                </Flex>
                            </HStack>
                        </RadioGroup>

                    </FormControl>

                        <ModalFooter>
                            <Button
                            onClick={saveUpdatedTask}
                            colorScheme='blackAlpha' mr={3} borderWidth='2px' borderColor='white'>
                                Save
                            </Button>
                            <Button onClick={onClose} colorScheme="red">Cancel</Button>
                        </ModalFooter>

                </ModalBody>
            </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}

// Delete Alert
const DeleteAlert=({isOpen,onClose,cancelRef,id})=>{
    const dispatch=useDispatch()
    const deleteTask=()=>{
        console.log('hello')
        dispatch(removeTask(id))
        onClose()
    }

    return(
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        >
            <AlertDialogOverlay>
            <AlertDialogContent  bgColor='#121313' borderWidth='2px' borderColor='white'>
                <AlertDialogHeader color='white'>Delete Task</AlertDialogHeader>

            {/* Display Message */}
            <AlertDialogBody color='white'>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            {/* Footer */}
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>deleteTask()} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>

            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}


export default function TaskList(){
    const Edit=useDisclosure()   // Control the Edit Modal
    const Delete=useDisclosure() // Control the Delete Alert Dialog
    const finalRef=React.useRef(null)   // Ref to bring back focus after Modal Close
    const deleteRef=React.useRef(null) // Ref to bring back focus after Dialog Close


    const {task,dispatch}=useTask()

    const [taskSelected,setTaskSelected]=useState(null)

    const handleEdit=(task)=>{
        setTaskSelected(task)
        Edit.onOpen()
    }

    const handleDelete=(id)=>{
        setTaskSelected(id)
        Delete.onOpen()
    }

    return(
        <List spacing={3} ref={finalRef} className="w-[350px]">
            {task.map(t=>(
            <ListItem className="flex flex-row w-full justify-between items-center p-2"
            key={t.id}
            >
                <>
                <ListIcon as={t.status==='Completed'?FiCheckCircle:FiDisc} 
                className="cursor-pointer"
                color={t.status==='Completed'?'green':'yellow.600'}
                // Toggle Icon
                onClick={()=>dispatch(updateTaskList({id:t.id,status:t.status==='Completed'?'Pending':'Completed'}))}/>
                <p className="text-white">{t.title}</p>
                </>
                <div className="flex flex-row items-center gap-2">
                        <div className="cursor-pointer" onClick={()=>handleEdit(t)}>
                            <FiEdit2 color="white"/>
                        </div>
                        <div onClick={()=>handleDelete(t.id)}>
                        <FiTrash2 color='red' className="cursor-pointer"/>
                        </div>
                </div>
            </ListItem>
            ))}
            <EditModal isOpen={Edit.isOpen} onClose={Edit.onClose} task={taskSelected}/>
            <DeleteAlert isOpen={Delete.isOpen} onClose={Delete.onClose} cancelRef={deleteRef} id={taskSelected}/>
        </List>
    )
}