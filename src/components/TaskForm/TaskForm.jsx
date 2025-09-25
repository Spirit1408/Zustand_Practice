import { useEffect, useState } from "react";
import css from "./TaskForm.module.css";
import { useStore } from "./../../store";
import { useModalStore } from "./../../modalStore";

export const TaskForm = ({ mode = "add" }) => {
    const [selectedStatus, setSelectedStatus] = useState("");
    const [title, setTitle] = useState("");

    const addTask = useStore((state) => state.addTask);
    const updateTask = useStore((state) => state.updateTask);
    const editingTask = useModalStore((state) => state.editingTask);
    const handleClose = useModalStore((state) => state.onClose);
    const state = useModalStore((state) => state.columnState);

    useEffect(() => {
        if (mode === "edit" && editingTask) {
            setTitle(editingTask.title);
            setSelectedStatus(editingTask.state);
        } else if (mode === "add") {
            setTitle("");
            setSelectedStatus(state.toUpperCase());
        }
    }, [mode, state, editingTask]);

    const handleStatusChange = (e) => {
        if (mode === "edit") {
            setSelectedStatus(e.target.value);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === "add") {
            addTask(title, selectedStatus);
            setTitle("");
            setSelectedStatus("");
        } else if (mode === "edit" && editingTask) {
            if (!editingTask) return;

            const updatedTask = {
                ...editingTask,
                title,
                state: selectedStatus,
            };

            updateTask(updatedTask);
        }

        handleClose();
    };

    return (
        <form
            className={css.form}
            onSubmit={handleSubmit}>
            <input
                className={css.title}
                type="text"
                placeholder="Task name"
                value={title}
                onChange={handleTitleChange}
                required
            />

            <div
                className={`${css.selectStatus} ${
                    mode === "add" && css.hidden
                }`}>
                <label>
                    <p
                        className={`${css.planned} ${
                            selectedStatus === "PLANNED" ? css.selected : ""
                        }`}>
                        Planned
                    </p>

                    <input
                        type="radio"
                        name="status"
                        value="PLANNED"
                        checked={selectedStatus === "PLANNED"}
                        onChange={handleStatusChange}
                        style={{ display: `none` }}
                        required
                    />
                </label>

                <label>
                    <p
                        className={`${css.ongoing} ${
                            selectedStatus === "ONGOING" ? css.selected : ""
                        }`}>
                        Ongoing
                    </p>

                    <input
                        type="radio"
                        name="status"
                        value="ONGOING"
                        checked={selectedStatus === "ONGOING"}
                        onChange={handleStatusChange}
                        style={{ display: `none` }}
                    />
                </label>

                <label>
                    <p
                        className={`${css.done} ${
                            selectedStatus === "DONE" ? css.selected : ""
                        }`}>
                        Done
                    </p>

                    <input
                        type="radio"
                        name="status"
                        value="DONE"
                        checked={selectedStatus === "DONE"}
                        onChange={handleStatusChange}
                        style={{ display: `none` }}
                    />
                </label>
            </div>

            <button
                className={css.submit}
                type="submit">
                {mode === "add" ? "Add" : "Update"}
            </button>
        </form>
    );
};
