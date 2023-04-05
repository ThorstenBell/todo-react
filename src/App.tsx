import React, {ChangeEvent, FC, useState} from 'react';
import './App.css';
import {ITask} from "./Interfaces";
import TodoTask from "./Components/TodoTask";

const App: FC = () => {

    const [task, setTask] = useState<string>("")
    const [deadline, setDeadline] = useState<number>(0)
    const [todoList, setTodoList] = useState<ITask[]>([])

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        switch (event.target.name) {
            case 'task':
                setTask(event.target.value);
                break;
            case 'deadline':
                setDeadline(Number(event.target.value));
                break;
        }
    }

    const completeTask = (taskNameToDelete: string): void => {
        setTodoList(todoList.filter((task) => {
            return task.taskName !== taskNameToDelete;
        }))
    }

    const addTask = (): void => {
        setTodoList([...todoList, {taskName: task, deadline: deadline}]);
        setTask("");
        setDeadline(0);
    }

    return (
        <div className="App">
            <header>
                <input type="text" name="task" value={task} placeholder="Task..." onChange={handleChange}/>
                <input type="number" value={deadline} name="deadline" placeholder="Deadline (in Days)" onChange={handleChange}/>
                <button onClick={addTask}>Add Task</button>
            </header>
            <div className="todoList">
                {todoList.map((task: ITask, key: number) => {
                    return <TodoTask key={key} task={task} completeTask={completeTask}/>;
                })}
            </div>
        </div>
    );
}

export default App;
