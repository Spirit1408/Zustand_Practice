import { create } from "zustand";

const store = (set) => ({
    isOpen: false,
    isClosing: false,
    modalType: null,
    editingTask: null,
    
    onOpenAdd: () => set({ 
        isOpen: true, 
        isClosing: false, 
        modalType: 'add',
        editingTask: null 
    }),
    
    onOpenEdit: (task) => set({ 
        isOpen: true, 
        isClosing: false, 
        modalType: 'edit',
        editingTask: task 
    }),
    
    onClose: () => {
        set({ isClosing: true });
        setTimeout(() => set({ 
            isOpen: false, 
            isClosing: false, 
            modalType: null,
            editingTask: null 
        }), 300);
    },
});

export const useModalStore = create(store);