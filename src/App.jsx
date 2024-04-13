import Navbar from "./components/Navbar"
import Progress from "./components/Progress"
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"
import TaskProvider from "./context/Task"
import {Provider} from 'react-redux'
import store from './store/store.js'

const Container=()=>{
  return(
    <>
      {/* Wrapped In Context Provider */}
      <TaskProvider>
        <TaskInput />
        <TaskList />
      </TaskProvider>
    </>
  )
}

function App() {
  return (
    <div className="bg-[#121313] h-screen flex flex-col justify-center items-center relative gap-2">
      <Navbar/>
      <Progress/>
      <Container/>
    </div>
  )
}

export default function AppProvider(){
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}
