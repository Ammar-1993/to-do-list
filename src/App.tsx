import { useState, useMemo, useRef } from "react"
import type { TaskList } from "./types/Task"




function App() {
  const [tasks, setTasks] = useState<TaskList>([]);

  const newTaskRef = useRef<HTMLInputElement>(null)

  const remainingTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  const handleAddTask = () => {
    const title = newTaskRef.current?.value

    if(!title || title.trim() === ""){
      return
    }       
   
    setTasks(prev => [...prev, { id: tasks.length + 1, title: title.trim(), completed: false}])
    newTaskRef.current!.value = ""
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold underline">Todo List</h1>
        <div className="flex my-4 w-full gap-2">
          <input ref={newTaskRef} className="border-b-2 border-gray-300 px-2 py-1 grow" type="text" placeholder="Add a new task"/>
          <button type="button" onClick={handleAddTask} className="bg-blue-500 text-white px-2 py-1 rounded-r-lg border-b-2 cursor-pointer border-gray-300 w-14">+</button>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {tasks.map((task) => (
            <div className="flex items-center justify-between gap-2 border-2 border-gray-300 rounded px-2 py-1 w-full" key={task.id}>
              <div className="flex items-center gap-2 flex-1">
                <input className="border-b-2 border-gray-300 rounded px-2 py-1 cursor-pointer" type="checkbox" checked={task.completed} />
                <span className={task.completed ? "line-through text-gray-500" : "text-lg font-medium"}>{task.title}</span>
              </div>
              <button className="text-red-500 cursor-pointer" >❌</button>
            </div>
          ))}
        </div>
        <div> Remaining tasks: {remainingTasks}</div>
      </div>
    </div>
  )
}

export default App
