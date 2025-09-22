import { create } from "zustand";

const store = (set) => ({
    isOpen: false,
    isClosing: false,
    onOpen: () => set({ isOpen: true, isClosing: false }),
    onClose: () => {
        set({ isClosing: true });
        setTimeout(() => set({ isOpen: false, isClosing: false }), 300);
    },
});

export const useModalStore = create(store);