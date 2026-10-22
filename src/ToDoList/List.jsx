import { useState } from 'react';
import './List.css';

function ShowList({ tasks, onTasksChange }) {
    const [category, setCategory] = useState('active');

    function completeTask(id) {
        onTasksChange((previous) =>
            previous.map((task) =>
                task.id === id
                    ? { ...task, done: true }
                    : task
            )
        );
    }

    function restoreTask(id) {
        onTasksChange((previous) =>
            previous.map((task) =>
                task.id === id
                    ? { ...task, done: false }
                    : task
            )
        );
    }

    function deleteTask(id) {
        onTasksChange((previous) =>
            previous.filter((task) => task.id !== id)
        );
    }

    const visibleTasks = tasks.filter((task) =>
        category === 'done' ? task.done : !task.done
    );

    const activeCount = tasks.filter(
        (task) => !task.done
    ).length;

    const doneCount = tasks.filter(
        (task) => task.done
    ).length;

    return (
        <section className="show-list-container">
            <div
                className="category-tabs"
                role="tablist"
                aria-label="Task categories"
            >
                <button
                    type="button"
                    role="tab"
                    aria-selected={category === 'active'}
                    className={`category-tab ${
                        category === 'active' ? 'selected' : ''
                    }`}
                    onClick={() => setCategory('active')}
                >
                    Active
                    <span className="category-count">
                        {activeCount}
                    </span>
                </button>

                <button
                    type="button"
                    role="tab"
                    aria-selected={category === 'done'}
                    className={`category-tab ${
                        category === 'done' ? 'selected' : ''
                    }`}
                    onClick={() => setCategory('done')}
                >
                    Done
                    <span className="category-count">
                        {doneCount}
                    </span>
                </button>
            </div>

            <ul className="list-container submitted-list">
                {visibleTasks.map((task) => (
                    <li
                        key={task.id}
                        className={`list-item submitted-task ${
                            task.done ? 'is-done' : ''
                        }`}
                    >
                        <span className="text-container">
                            <p className="text">
                                {task.text}
                            </p>
                        </span>

                        {task.done ? (
                            <button
                                className="restore-task-btn"
                                type="button"
                                onClick={() =>
                                    restoreTask(task.id)
                                }
                                aria-label={`Move ${task.text} back to Active`}
                                title="Move back to Active"
                            >
                                ↶
                            </button>
                        ) : (
                            <button
                                className="complete-task-btn"
                                type="button"
                                onClick={() =>
                                    completeTask(task.id)
                                }
                                aria-label={`Mark ${task.text} as done`}
                                title="Mark as done"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M4.5 12.5 9.5 17 19.5 6.5" />
                                </svg>
                            </button>
                        )}

                        <button
                            className="delete-btn list-delete-btn"
                            type="button"
                            onClick={() => deleteTask(task.id)}
                            aria-label={`Delete ${task.text}`}
                            title="Delete task"
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>

            {visibleTasks.length === 0 && (
                <div className="list-empty-state">
                    <span
                        className="empty-check"
                        aria-hidden="true"
                    >
                        {category === 'done' ? '✓' : '✦'}
                    </span>

                    <p>
                        {category === 'done'
                            ? 'No completed tasks yet.'
                            : 'Your active list is empty.'}
                    </p>

                    <span>
                        {category === 'done'
                            ? 'Completed tasks will appear here.'
                            : 'Submit tasks from Add Task to see them here.'}
                    </span>
                </div>
            )}
        </section>
    );
}

export default ShowList;