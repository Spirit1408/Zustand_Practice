import { useMemo, useState } from "react";
import { useStore } from "../../store";
import style from "./Column.module.css";
import Task from "../Task/Task";
import { shallow } from "zustand/shallow";
import { useModalStore } from "./../../modalStore";
import Modal from "./../Modal/Modal";
import { TaskForm } from "../TaskForm/TaskForm";
import classNames from "classnames";

export default function Column({ state }) {
    const isOpen = useModalStore((store) => store.isOpen);
    const modalType = useModalStore((store) => store.modalType);
    const setDraggedTask = useStore((store) => store.setDraggedTask);
    const draggedTask = useStore((store) => store.draggedTask);
    const moveTask = useStore((store) => store.moveTask);

    const [drop, setDrop] = useState(false);

    const tasks = useStore((store) => store.tasks, shallow);
    const filter = useMemo(
        () => tasks.filter((task) => task.state === state.toUpperCase()),
        [tasks, state]
    );
    const onOpenAdd = useModalStore((store) => store.onOpenAdd);

    const handleAddClick = () => {
        onOpenAdd(state);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDrop(true);
    };

    const handleDragLeave = () => {
        setDrop(false);
    };

    const handleDrop = () => {
        setDraggedTask(null);
        moveTask(draggedTask.id, state.toUpperCase());
        setDrop(false);
    };

    return (
        <div
            className={classNames(style.column, { [style.drop]: drop })}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}>
            <div className={style.header}>
                <p>{state}</p>
                <button
                    className={style.addButton}
                    onClick={handleAddClick}>
                    Add
                </button>
            </div>

            <div className={style.tasks}>
                {filter.length ? (
                    filter.map((task) => (
                        <Task
                            key={task.id}
                            id={task.id}
                        />
                    ))
                ) : (
                    <div className={style.noTasks}>No tasks</div>
                )}
            </div>

            {isOpen && (
                <Modal>
                    <TaskForm mode={modalType} />
                </Modal>
            )}
        </div>
    );
}

//* Component for set of tasks.

//? shallow - function to compare objects (previous and current) and return true if they are equal (on first level, not a deep comparison!). Used for objects and arrays in the store, not for primitive values. Prevent to re-render component if object in store is not changed.

//? In this example has a representative purpose more than practical one, because methods in the store aren't mutating the state, but always creating a new one (copy of array). Mutation of object in store can be when we are sorting the array, for example. Or when selector filtering the tasks by itself (without using "filter" constant).
