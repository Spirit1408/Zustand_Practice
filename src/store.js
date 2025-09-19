import { create } from "zustand";

const store = (set) => ({
    tasks: [
        { title: "Tesk task", state: "PLANNED" },
        { title: "Tesk task 1", state: "ONGOING" },
        { title: "Tesk task 2", state: "DONE" },
        { title: "Tesk task 3", state: "PLANNED" },
    ],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
});

export const useStore = create(store);

//* File for Zustand state management
