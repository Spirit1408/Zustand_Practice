import classNames from "classnames";
import style from "./Task.module.css";

export default function Task({ title, state }) {
    const upperState = state.toUpperCase();
    const status = ["PLANNED", "ONGOING", "DONE"].includes(upperState) ? upperState : "PLANNED";

    return (
        <div className={style.task}>
            <p>{title}</p>

            <div className={style.status}>
                <p className={classNames(style.statusLabel, style[status])}>
                    {status}
                </p>
            </div>
        </div>
    );
}

//? classNames (like clsx) can be used to add multiple classes cobditionally. First argument - main class, other arguments - classes to add. Here searching the value of second class by it's name (from the constant). If class name exist in CSS module - it will be added.
