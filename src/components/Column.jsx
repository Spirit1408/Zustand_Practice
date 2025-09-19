import { useMemo } from "react";
import { useStore } from "../store";
import style from "./Column.module.css";
import Task from "./Task";

export default function Column({ state }) {
    const tasks = useStore((store) => store.tasks);
    const filter = useMemo(
        () =>
            tasks.filter(
                (task) => String(task.state).toUpperCase() === state.toUpperCase()
            ),
        [tasks, state]
    );

    return (
        <div className={style.column}>
            <p>{state}</p>

            <div className={style.tasks}>
                {filter.length ? (
                    filter.map((task) => (
                        <Task
                            key={task.title}
                            title={task.title}
                            state={task.state}
                        />
                    ))
                ) : (
                    <div className={style.noTasks}>No tasks</div>
                )}
            </div>
        </div>
    );
}

//* Component for set of tasks.
