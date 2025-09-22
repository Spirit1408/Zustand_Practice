import { useMemo } from "react";
import { useStore } from "../../store";
import style from "./Column.module.css";
import Task from "../Task/Task";
import { shallow } from "zustand/shallow";
import { useModalStore } from "./../../modalStore";

export default function Column({ state }) {
    const tasks = useStore((store) => store.tasks, shallow);
    const filter = useMemo(
        () => tasks.filter((task) => task.state === state.toUpperCase()),
        [tasks, state]
    );
    const onOpen = useModalStore((store) => store.onOpen);

    const handleAddClick = () => {
        onOpen();
    };

    return (
        <div className={style.column}>
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
                            title={task.title}
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

//? shallow - function to compare objects (previous and current) and return true if they are equal (on first level, not a deep comparison!). Used for objects and arrays in the store, not for primitive values. Prevent to re-render component if object in store is not changed.

//? In this example has a representative purpose more than practical one, because methods in the store aren't mutating the state, but always creating a new one (copy of array). Mutation of object in store can be when we are sorting the array, for example. Or when selector filtering the tasks by itself (without using "filter" constant).
