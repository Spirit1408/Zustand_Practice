import styles from "./Modal.module.css";
import { useModalStore } from "./../../modalStore";
import { useEffect } from "react";
import { useCallback } from "react";
import Portal from "../Portal/Portal";

export default function Modal({ children }) {
    const onClose = useModalStore((store) => store.onClose);
    const isClosing = useModalStore((store) => store.isClosing);

    const handleClose = useCallback(
        (e) => {
            e.stopPropagation();
            if (e.target === e.currentTarget || e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleClose);
        return () => {
            document.removeEventListener("keydown", handleClose);
        };
    }, [handleClose]);

    return (
        <Portal>
            <div
                className={`${styles.modalOverlay} ${
                    isClosing ? styles.closing : ""
                }`}
                onClick={handleClose}
                onKeyDown={handleClose}>
                <div className={styles.modal}>
                    <button
                        className={styles.closeButton}
                        onClick={handleClose}>
                        ×
                    </button>

                    {children}
                </div>
            </div>
        </Portal>
    );
}

//* Component for Modal window. Contains the form for adding or updating a task. Parent element for TaskForm component. Using Portal component to render the modal window on the page (in the root element of the DOM). Contains overlay and modal window itself. Has features for closing the modal window by clicking on the overlay or by pressing the "ESC" key.
