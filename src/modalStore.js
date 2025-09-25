import { create } from "zustand";

const store = (set) => ({
    isOpen: false,
    isClosing: false,
    modalType: null,
    editingTask: null,
    columnState: null,
    
    onOpenAdd: (state) => set({ 
        isOpen: true, 
        isClosing: false, 
        modalType: 'add',
        editingTask: null,
        columnState: state 
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
            editingTask: null,
            columnState: null
        }), 300);
    },
});

export const useModalStore = create(store);