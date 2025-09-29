import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (title, state) =>
        set(
            (store) => ({
                tasks: [
                    ...store.tasks,
                    { id: store.tasks.length + 1, title, state },
                ],
            }),
            false,
            "add task"
        ),
    deleteTask: (id) =>
        set(
            (store) => ({
                tasks: store.tasks.filter((task) => task.id !== id),
            }),
            false,
            "delete task"
        ),
    updateTask: (task) =>
        set(
            (store) => ({
                tasks: store.tasks.map((t) => (t.id === task.id ? task : t)),
            }),
            false,
            "update task"
        ),
    setDraggedTask: (task) =>
        set({ draggedTask: task }, false, "set dragged task"),
    moveTask: (id, state) =>
        set(
            (store) => ({
                tasks: store.tasks.map((t) =>
                    t.id === id ? { ...t, state } : t
                ),
            }),
            false,
            "move task"
        ),
});

const log = (config) => (set, get, api) =>
    config(
        (...args) => {
            console.log(args);
            set(...args);
        },
        get,
        api
    );

export const useStore = create(
    log(persist(devtools(store), { name: "tasks store" }))
);

//* File for Zustand state management. Arrow function accepts "set" function, which is used to update the state. Function returns the object with state itself (tasks, in this case) and methods, which can be used to update this state (adding, deleting, updating tasks). addTask - method receives task object and adds it to the state (make a new array and append the task to it). deleteTask - method receives id of task to delete and removes it from the state by filtering out the task with this id. updateTask - method receives task object and updates it in the state by mapping over the tasks array and replacing the task with the same id.

//? set() receives three parameters - function, which works as a method to update the state; boolean value, which tells that will be updated just part of the state (such as "tasks" or "draggedTask") without rewriting the whole state (if true - while update the tasks, f.e., draggedTask will be deleted from the state); and string, which is a name of the action (for debugger such as devtools (to not see "anonymous" as the name of the action)).

//? "persist" middleware is used to save the state in the localStorage. The same can do to modal store.

//? "log" - example of custom middleware, which intercepts the state update and logs it to the console.
