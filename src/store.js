import { create } from "zustand";

const store = (set) => ({
    tasks: [
        { id: 1, title: "Test task", state: "PLANNED" },
        { id: 2, title: "Test task 1", state: "ONGOING" },
        { id: 3, title: "Test task 2", state: "DONE" },
        { id: 4, title: "Test task 3", state: "PLANNED" },
    ],
    draggedTask: null,
    addTask: (title, state) =>
        set((store) => ({
            tasks: [
                ...store.tasks,
                { id: store.tasks.length + 1, title, state },
            ],
        })),
    deleteTask: (id) =>
        set((store) => ({
            tasks: store.tasks.filter((task) => task.id !== id),
        })),
    updateTask: (task) =>
        set((store) => ({
            tasks: store.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
    setDraggedTask: (task) => set({ draggedTask: task }),
    moveTask: (id, state) => set((store) => ({ tasks: store.tasks.map(t => t.id === id ? { ...t, state } : t) }))
});

export const useStore = create(store);

//* File for Zustand state management. Arrow function accepts "set" function, which is used to update the state. Function returns the object with state itself (tasks, in this case) and methods, which can be used to update this state (adding, deleting, updating tasks). addTask - method receives task object and adds it to the state (make a new array and append the task to it). deleteTask - method receives id of task to delete and removes it from the state by filtering out the task with this id. updateTask - method receives task object and updates it in the state by mapping over the tasks array and replacing the task with the same id.
