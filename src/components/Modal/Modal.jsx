import styles from "./Modal.module.css";
import { useModalStore } from "./../../modalStore";
import { useEffect } from "react";
import { useCallback } from "react";
import Portal from "../Portal/Portal";

export default function Modal({ children }) {
    const onClose = useModalStore((store) => store.onClose);
    const isClosing = useModalStore((store) => store.isClosing);

    const handleClose = useCallback((e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget || e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", handleClose);
        return () => {
            document.removeEventListener("keydown", handleClose);
        };
    }, [handleClose]);

    return (
        <Portal>
            <div
                className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`}
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
//TODO Add form for adding new task
//TODO 29:38