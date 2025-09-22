import { useState } from "react";
import css from "./AddTaskForm.module.css";
import { useStore } from "../../store";
import { useModalStore } from "./../../modalStore";

export const AddTaskForm = () => {
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const addTask = useStore((store) => store.addTask);

    const handleClose = useModalStore((store) => store.onClose);

    const handleSubmit = (event) => {
        event.preventDefault();

        const title = event.target[0].value;
        const status = selectedStatus;

        addTask(title, status);

        event.target.reset();

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
                Add
            </button>
        </form>
    );
};
