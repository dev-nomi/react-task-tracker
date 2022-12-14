import { useState } from 'react'
import { toast } from 'react-toastify';

const AddTask = ({ onAdd, onCloseAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if(!text){
      toast.error("Oops! Task title can't blank.");
      return
    }
    onAdd({ text, day, reminder })

    setText('')
    setDay('')
    setReminder(false)
    onCloseAdd()
  }

  return(
    <form className="add-form" onSubmit={onSubmit} >
      <div className="form-control">
        <label>Task</label>
        <input 
          type="text" 
          placeholder="Add Task" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        /> 
      </div>

      <div className="form-control">
        <label>Day & Time</label>
        <input 
          type="text" 
          placeholder="Add Day & Time" 
          value={day} 
          onChange={(e) => setDay(e.target.value)}
        /> 
      </div>

      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input 
          type="checkbox" 
          value={reminder} 
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        /> 
      </div>

      <div>
        <input type="submit" value="Save task" className="btn btn-block" />
      </div>
    </form>
  )
}

export default AddTask;