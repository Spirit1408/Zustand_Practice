import classNames from "classnames";
import style from "./Task.module.css";
import { useStore } from "../../store";
import { useModalStore } from "../../modalStore";

export default function Task({ id }) {
    const task = useStore((store) =>
        store.tasks.find((task) => task.id === id)
    );

    const onDelete = useStore((store) => store.deleteTask);
    const onOpenEdit = useModalStore((store) => store.onOpenEdit);
    const setDraggedTask = useStore((store) => store.setDraggedTask);

    const handleDeleteTask = () => onDelete(task.id);
    const handleEditTask = () => {
        onOpenEdit(task);
    };

    return (
        <div className={style.task} draggable onDragStart={() => setDraggedTask(task)}>
            <p>{task.title}</p>

            <div className={style.status}>
                <p className={classNames(style.statusLabel, style[task.state])}>
                    {task.state}
                </p>
            </div>

            <div className={style.actions}>
                <button
                    className={style.editTaskBtn}
                    onClick={handleEditTask}>
                    v
                </button>

                <button
                    className={style.deleteTaskBtn}
                    onClick={handleDeleteTask}>
                    x
                </button>
            </div>
        </div>
    );
}

//? "classNames" (like clsx) can be used to add multiple classes cobditionally. First argument - main class, other arguments - classes to add. Here searching the value of second class by it's name (from the constant). If class name exist in CSS module - it will be added.

//* Instead of throwing status of the task by prop from parent element, we can reach the specific task from the store using useStore hook with "find" method to array (of tasks). It will find the object from the array with the same value of the "title" property as the value of the "title" prop (which, technically, is the same). This is another example how we can reach the state from the store in the component.

//* Component shows text of the task, its status, buttons for editing and deleting the task. Receives id of the task as prop. Also receives functions for deleting/editing the task from the store and function setDraggedTask (to set the task as dragged). Deleting the task - calling the function from the store to filter out the task with the same id, editing the task - opening the modal window and sending the task to it.