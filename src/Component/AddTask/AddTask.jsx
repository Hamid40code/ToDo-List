import { useEffect, useState } from 'react';
import './AddTask.css';

import arrowDownImg from '../../assets/arrow-big-down-dash.png';
import arrowUpImg from '../../assets/arrow-big-up-dash.png';
import deleteImg from '../../assets/circle-x.png';

const DRAFT_STORAGE_KEY = 'tasks';

function readDraftTasks() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(DRAFT_STORAGE_KEY) || '[]'
        );

        return Array.isArray(saved)
            ? saved
                .map((task) =>
                    typeof task === 'string' ? task : task.text
                )
                .filter(Boolean)
            : [];
    } catch {
        return [];
    }
}

function AddTask({ onSubmitTasks }) {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState(readDraftTasks);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        localStorage.setItem(
            DRAFT_STORAGE_KEY,
            JSON.stringify(items)
        );
    }, [items]);

    useEffect(() => {
        if (!showSuccess) return undefined;

        const timer = window.setTimeout(() => {
            setShowSuccess(false);
            setIsSubmitting(false);
        }, 1500);

        return () => window.clearTimeout(timer);
    }, [showSuccess]);

    function handleAdd() {
        const task = inputValue.trim();

        if (!task || isSubmitting) return;

        setItems((previous) => [...previous, task]);
        setInputValue('');
    }

    function handleDelete(index) {
        setItems((previous) =>
            previous.filter((_, i) => i !== index)
        );
    }

    function handleMove(index, direction) {
        setItems((previous) => {
            const nextIndex = index + direction;

            if (
                nextIndex < 0 ||
                nextIndex >= previous.length
            ) {
                return previous;
            }

            const updated = [...previous];

            [
                updated[index],
                updated[nextIndex],
            ] = [
                updated[nextIndex],
                updated[index],
            ];

            return updated;
        });
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleAdd();
        }
    }

    function handleSubmit() {
        if (isSubmitting || items.length === 0) return;

        setIsSubmitting(true);
        setShowSuccess(true);

        // Transfer the tasks after the checkmark animation.
        window.setTimeout(() => {
            onSubmitTasks(items);

            setItems([]);
            setInputValue('');

            localStorage.setItem(
                DRAFT_STORAGE_KEY,
                JSON.stringify([])
            );
        }, 1050);
    }

    return (
        <div className="add-task-container">
            <div className="task-input-row">
                <input
                    type="text"
                    className="user-task-input"
                    value={inputValue}
                    onChange={(event) =>
                        setInputValue(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Write a task..."
                    aria-label="New task"
                    disabled={isSubmitting}
                />

                <button
                    className="add-btn"
                    type="button"
                    onClick={handleAdd}
                    disabled={isSubmitting}
                >
                    Add
                </button>
            </div>

            <ul
                className="list-container"
                aria-label="Tasks ready to submit"
            >
                {items.map((item, index) => (
                    <li
                        key={`${item}-${index}`}
                        className="list-item task-enter"
                    >
                        <span className="text-container">
                            <p className="text">{item}</p>
                        </span>

                        <button
                            className="movement-btn"
                            type="button"
                            onClick={() =>
                                handleMove(index, -1)
                            }
                            disabled={
                                index === 0 || isSubmitting
                            }
                            aria-label="Move task up"
                        >
                            <img src={arrowUpImg} alt="" />
                        </button>

                        <button
                            className="delete-btn"
                            type="button"
                            onClick={() => handleDelete(index)}
                            disabled={isSubmitting}
                            aria-label="Delete task"
                        >
                            <img src={deleteImg} alt="" />
                        </button>

                        <button
                            className="movement-btn"
                            type="button"
                            onClick={() =>
                                handleMove(index, 1)
                            }
                            disabled={
                                index === items.length - 1 ||
                                isSubmitting
                            }
                            aria-label="Move task down"
                        >
                            <img src={arrowDownImg} alt="" />
                        </button>
                    </li>
                ))}
            </ul>

            <button
                className="info-sender-btn"
                type="button"
                onClick={handleSubmit}
                disabled={
                    isSubmitting || items.length === 0
                }
            >
                Submit
            </button>

            {showSuccess && (
                <div
                    className="submit-success-overlay"
                    role="status"
                    aria-live="polite"
                >
                    <div className="success-checkmark">
                        <svg
                            viewBox="0 0 72 72"
                            aria-hidden="true"
                        >
                            <circle
                                className="success-circle"
                                cx="36"
                                cy="36"
                                r="31"
                            />

                            <path
                                className="success-tick"
                                d="M20 37 L30 47 L52 25"
                            />
                        </svg>
                    </div>

                    <span>Tasks submitted!</span>
                </div>
            )}
        </div>
    );
}

export default AddTask;