import { useState, useEffect } from 'react'
import { BrowserRouter as Router,  Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

    // Fetch Task Singular
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
  
      return data
    }

/* Add Task 
* Takes in task info: text, day and reminder state
*/
const addTask = async (task) => {
  const res= await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }, 
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])

  // if not using a backend 
  //const id = Math.floor(Math.random() * 1000 + 1)
  //const newTask = { id, ...task }
  //setTasks([...tasks, newTask])
}


/* Delete Task 
* Takes in: task id 
* Show task ids that do not match the deleted task id
* Actaul button located in Task.js 
*/
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })

  setTasks(tasks.filter((task) => task.id !== id))
}


/* Toggle Reminder 
* Takes in: task id 
* Sets the Reminderto the opposite of what is currently is
* Actaul button (x2 click) located in Task.js 
*/
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle, 
    reminder: !taskToToggle.reminder }
  
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()
  
  //console.log(id) for testing 
  setTasks(
    tasks.map((task) => 
      task.id === id ? {...task, reminder:
        data.reminder } : task
    )
  )
}

  return (
    <Router>
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      <Route path='/' 
      exact 
      render={(props) => (
        <> 
          {showAddTask && <AddTask onAdd=
          {addTask} />}
          {tasks.length > 0 ? (
            <Tasks 
              tasks={tasks} 
              onDelete={deleteTask} 
              onToggle={toggleReminder} 
            /> 
          ) : (
            'No Tasks To Show'
          )}
          </>
      )} 
      />
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  )
}

export default App;
