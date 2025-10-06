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
        moveTask(draggedTask.id, state.toUpperCase());
        setDraggedTask(null);
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

//* Component for set of tasks, which are in the same state.

//? shallow - function to compare objects (previous and current) and return true if they are equal (on first level, not a deep comparison!). Used for objects and arrays in the store, not for primitive values. Prevent to re-render component if object in store is not changed. In this example has a representative purpose more than practical one, because methods in the store aren't mutating the state, but always creating a new one (copy of array). Mutation of object in store can be when we are sorting the array, for example. Or when selector filtering the tasks by itself (without using "filter" constant).

//* Component receives a state of the task as a prop. Appears as a folder of cards (tasks). Tasks receiving from Zustand tasks store and filtering by state (memoizing operation - to not re-render the component if the state is not changed). Renders tasks in the column, based on the filter array. Here can be called a modal window with a form for adding a new task or updating an existing one, depending on the modal type ("add" or "edit").

//* Component has feature of adding a new task. Click on the button calling to the Zustand modal store - opening the modal, setting type of the modal to "add" and sending the state of the column. Modal type and column state are used in the TaskForm component.

//* Component has drag and drop feature. When the task is dragged over (onDragOver), the drop flag is set to true (using for styling the column as a drop zone). When the task is dropped on the column (onDrop), the flag is set to false, the task is removed from the store (draggedTask) and moved to the new column (if the column is different by status). Setting task as dragged is done in the Task component.
