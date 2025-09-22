import classNames from "classnames";
import style from "./Task.module.css";
import { useStore } from "../store";

export default function Task({ title }) {
    const task = useStore((store) =>
        store.tasks.find((task) => task.title === title)
    );

    return (
        <div className={style.task}>
            <p>{task.title}</p>

            <div className={style.status}>
                <p className={classNames(style.statusLabel, style[task.state])}>
                    {task.state}
                </p>
            </div>
        </div>
    );
}

//? "classNames" (like clsx) can be used to add multiple classes cobditionally. First argument - main class, other arguments - classes to add. Here searching the value of second class by it's name (from the constant). If class name exist in CSS module - it will be added.

//* Instead of throwing status of the task by prop from parent element, we can reach the specific task from the store using useStore hook with "find" method. It will find the object from the array with the same value of the "title" property as the value of the "title" prop (which, technically, is the same). This is another example how we can reach the state from the store in the component.
