import "./App.css";
import { AddTaskForm } from "./components/AddTaskForm/AddTaskForm";
import { UpdateTaskForm } from "./components/UpdateTaskForm/UpdateTaskForm";
import Column from "./components/Column/Column";
import { states } from "./constants";
import { useModalStore } from "./modalStore";
import Modal from "./components/Modal/Modal";

function App() {
    const isOpen = useModalStore((store) => store.isOpen);
    const modalType = useModalStore((store) => store.modalType);

    const renderModalContent = () => {
        switch (modalType) {
            case 'add':
                return <AddTaskForm />;
            case 'edit':
                return <UpdateTaskForm />;
            default:
                return null;
        }
    };

    return (
        <div className="app">
            {states.map((state) => (
                <Column
                    key={state}
                    state={state}
                />
            ))}

            {isOpen && (
                <Modal>
                    {renderModalContent()}
                </Modal>
            )}
        </div>
    );
}

export default App;
//* Simple exaple of a react app (task manager) with Zustand state management
