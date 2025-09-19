import "./App.css";
import Column from "./components/Column";
import { states } from "./constants";

function App() {
    return (
        <div className="app">
            {states.map((state) => (
                <Column
                    key={state}
                    state={state}
                />
            ))}
        </div>
    );
}

export default App;
//* Simple exaple of a react app (task manager) with Zustand state management
