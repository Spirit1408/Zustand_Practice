import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
    isOpen: false,
    isClosing: false,
    modalType: null,
    editingTask: null,
    columnState: null,

    onOpenAdd: (state) =>
        set(
            {
                isOpen: true,
                isClosing: false,
                modalType: "add",
                editingTask: null,
                columnState: state,
            },
            false,
            "open add modal"
        ),

    onOpenEdit: (task) =>
        set(
            {
                isOpen: true,
                isClosing: false,
                modalType: "edit",
                editingTask: task,
                columnState: null,
            },
            false,
            "open edit modal"
        ),

    onClose: () => {
        set({ isClosing: true }, false, "closing modal");
        setTimeout(
            () =>
                set(
                    {
                        isOpen: false,
                        isClosing: false,
                        modalType: null,
                        editingTask: null,
                        columnState: null,
                    },
                    false,
                    "close modal"
                ),
            300
        );
    },
});

export const useModalStore = create(
    persist(devtools(store), { name: "modal store" })
);

//* Zustand store for modal window. Persist - to save the state in the localStorage, devtools - to see the state in the browser devtools.