import { useEffect, useState } from 'react';
import AddTask from '../AddTask/AddTask';
import ShowList from '../../TaskList/List';
import './ToDoList.css';

const SUBMITTED_STORAGE_KEY = 'submittedTasks';

function readSubmittedTasks() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(SUBMITTED_STORAGE_KEY) || '[]'
        );

        if (!Array.isArray(saved)) return [];

        return saved
            .map((task, index) => {
                if (typeof task === 'string') {
                    return {
                        id: `legacy-${index}-${Date.now()}`,
                        text: task,
                        done: false,
                    };
                }

                return {
                    id: task.id || `restored-${index}-${Date.now()}`,
                    text: String(task.text || ''),
                    done: Boolean(task.done),
                };
            })
            .filter((task) => task.text.trim());
    } catch {
        return [];
    }
}

function ToDoList() {
    const [showAddTask, setShowAddTask] = useState(true);
    const [tasks, setTasks] = useState(readSubmittedTasks);

    useEffect(() => {
        localStorage.setItem(
            SUBMITTED_STORAGE_KEY,
            JSON.stringify(tasks)
        );
    }, [tasks]);

    function submitTasks(draftTasks) {
        if (!draftTasks.length) return;

        const timestamp = Date.now();

        const newTasks = draftTasks
            .map((text, index) => ({
                id: `${timestamp}-${index}-${Math.random()
                    .toString(36)
                    .slice(2, 8)}`,
                text: String(text).trim(),
                done: false,
            }))
            .filter((task) => task.text);

        if (!newTasks.length) return;

        setTasks((previous) => [
            ...previous,
            ...newTasks,
        ]);

        setShowAddTask(false);
    }

    return (
        <main className="todo-app">
            <div className="btn-container">
                <button
                    className={`nav-btn ${
                        showAddTask ? 'active-nav' : ''
                    }`}
                    type="button"
                    onClick={() => setShowAddTask(true)}
                >
                    Add Task
                </button>

                <button
                    className={`nav-btn ${
                        !showAddTask ? 'active-nav' : ''
                    }`}
                    type="button"
                    onClick={() => setShowAddTask(false)}
                >
                    List
                </button>
            </div>

            <div className="container">
                {showAddTask ? (
                    <AddTask onSubmitTasks={submitTasks} />
                ) : (
                    <ShowList
                        tasks={tasks}
                        onTasksChange={setTasks}
                    />
                )}
            </div>
        </main>
    );
}

export default ToDoList;