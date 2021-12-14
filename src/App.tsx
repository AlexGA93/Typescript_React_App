import React, { useState, useRef } from 'react';


// typescript types
type FormElement = React.FormEvent<HTMLFormElement>; // Our event is a React's form event refering from a html form element

interface ITask {
  name: string,
  done: boolean
}

// App function is returning a JSX element
function App(): JSX.Element {
  // states
  const [newTask, setNewTask] = useState<string>(""); // we want to type ths state asa string
  const [tasks, setTasks] = useState<ITask[]>([]);

  //ref
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();

    addTask(newTask);
    setNewTask('');
    // console.log(tasks);

    taskInput.current?.focus();
  }

  // add tasks
  const addTask = (name: string): void => {
    // compile task array and add a new task
    const newTasks: ITask[] = [...tasks, {name, done: false}];
    setTasks(newTasks);
  }

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];

    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
          <div className="card-body">
            <h1 className='card-title text-center'>TODO TASKS</h1>
            <form onSubmit={handleSubmit}>
              <input 
              type="text" 
              value={newTask}
              onChange={e => setNewTask(e.target.value)} 
              className="form-control"
              ref={taskInput}
              autoFocus
              />
              <button className='btn btn-success btn-block mt-2'>
                Save
              </button>
            </form>
          </div>
      </div>
      
      {
        tasks.map((task: ITask, i: number) => (
          <div className="card card-body mt-2" key={i}>
            <h2 style={{
              textDecoration:task.done ? 'line-through': ''
              }}>
              {task.name}
            </h2>
            <p>
              {task.done}
            </p>

            <button className='btn btn-secondary btn-block' onClick={() => toggleDoneTask(i)}>
              {
                task.done ? '✓' : 'x' 
              }
            </button>
            <button className='btn btn-danger' onClick={() =>  removeTask(i)}>
            🗑
            </button>
          </div>
        ))
      }
        </div>
      </div>
    </div>
  );
}

export default App;
