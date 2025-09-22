import "./App.css";
import { AddTaskForm } from "./components/AddTaskForm/AddTaskForm";
import Column from "./components/Column/Column";
import { states } from "./constants";
import { useModalStore } from "./modalStore";
import Modal from "./components/Modal/Modal";

function App() {
    const isOpen = useModalStore((store) => store.isOpen);

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
                    <AddTaskForm />
                </Modal>
            )}
        </div>
    );
}

export default App;
//* Simple exaple of a react app (task manager) with Zustand state management
