import { create } from "zustand";

const store = (set) => ({
    tasks: [
        { title: "Tesk task", state: "PLANNED" },
        { title: "Tesk task 1", state: "ONGOING" },
        { title: "Tesk task 2", state: "DONE" },
        { title: "Tesk task 3", state: "PLANNED" },
    ],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
    updateTask: (task) => set((state) => ({ tasks: state.tasks.map((t) => (t.id === task.id ? task : t)) })),
});

export const useStore = create(store);

//* File for Zustand state management. Arrow function accepts "set" function, which is used to update the state. Function returns the object with state itself (tasks, in this case) and methods, which can be used to update this state (adding, deleting, updating tasks). addTask - method receives task object and adds it to the state (make a new array and append the task to it). deleteTask - method receives id of task to delete and removes it from the state by filtering out the task with this id. updateTask - method receives task object and updates it in the state by mapping over the tasks array and replacing the task with the same id.
