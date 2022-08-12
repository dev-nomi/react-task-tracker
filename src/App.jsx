import Header from './components/header'
import Tasks from './components/tasks'
import AddTask from './components/AddTask'
import { ToastContainer,toast } from 'react-toastify';
import { useState, useEffect } from 'react'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] =  useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksfromserver = await fetchTasks()
      setTasks(tasksfromserver)
    }

    getTasks()
  }, [])

  // Delete task
  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    toast.success("Successfully Deleted Task!");
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    console.log(updateTask)

    const response = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask),
    })

    const data = await response.json()
    toast.success("Successfully Toggle Reminder!");
    setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder: data.reminder } : task))
  }

  // Add task
  const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    })

    const data = await response.json()
    toast.success("Successfully Added Task!");

    setTasks([...tasks, data])
  }

  // Fetch tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()

    return data
  }

  // Fetch task
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()

    return data
  }

  return (
    <div className='container'>
      <ToastContainer           
      />
      <Header 
        onAdd={() => setShowAddTask(!showAddTask)} 
        showAdd={showAddTask}
      />
      { 
        showAddTask && 
        <AddTask 
          onAdd={addTask} 
          onCloseAdd={() => setShowAddTask(false) } 
        />
      }
      { tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No tasks to show'
      )}
    </div>
  );
}

export default App;
