import { useState, useEffect } from "react";
import css from "./UpdateTaskForm.module.css";
import { useStore } from "../../store";
import { useModalStore } from "./../../modalStore";

export const UpdateTaskForm = () => {
    const [selectedStatus, setSelectedStatus] = useState("");
    const [title, setTitle] = useState("");

    const editingTask = useModalStore((store) => store.editingTask);
    const updateTask = useStore((store) => store.updateTask);
    const handleClose = useModalStore((store) => store.onClose);

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setSelectedStatus(editingTask.state);
        }
    }, [editingTask]);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!editingTask) return;

        const updatedTask = {
            ...editingTask,
            title: title,
            state: selectedStatus
        };

        updateTask(updatedTask);
        handleClose();
    };

    if (!editingTask) {
        return <div>No task selected for editing</div>;
    }

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

            <div className={css.selectStatus}>
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
                Update
            </button>
        </form>
    );
};