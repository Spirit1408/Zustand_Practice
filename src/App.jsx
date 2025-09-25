import "./App.css";
import Column from "./components/Column/Column";
import { states } from "./constants";
import { useModalStore } from "./modalStore";
import Modal from "./components/Modal/Modal";
import { TaskForm } from "./components/TaskForm/TaskForm";

function App() {
    const isOpen = useModalStore((store) => store.isOpen);
    const modalType = useModalStore((store) => store.modalType);

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
                    <TaskForm mode={modalType} />
                </Modal>
            )}
        </div>
    );
}

export default App;
//* Simple exaple of a react app (task manager) with Zustand state management
