import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

const App = () => {
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Dr. Apt',
        day: 'Feb 5th at 2:30pm',
        reminder: true,
    },
    {
        id: 2,
        text: 'Mtg at School',
        day: 'Feb 6th at 1:30pm',
        reminder: true, 
    },
    {
        id: 3,
        text: 'Food Shopping',
        day: 'Feb 5th at 2:30pm',
        reminder: false, 
    }
])

/* Delete Task 
* Takes in: task id 
* Show task ids that do not match the deleted task id
* Actaul button located in Task.js 
*/
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
}


/* DToggle Reminder 
* Takes in: task id 
* Sets the Reminderto the opposite of what is currently is
* Actaul button (x2 click) located in Task.js 
*/
const toggleReminder = (id) => {
  //console.log(id) for testing 
  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder } : task))

}


  return (
    <div className='container'>
      <Header />
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 
      ('No Tasks To Show')}
    </div>
  )
}

export default App;
