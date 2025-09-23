import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export default function Portal({ children, containerId = 'root' }) {
    const [container, setContainer] = useState(null);

    useEffect(() => {
        let containerElement = document.getElementById(containerId);

        setContainer(containerElement);

        return () => {
            if (containerElement && containerElement.parentNode && !document.getElementById(containerId)) {
                containerElement.parentNode.removeChild(containerElement);
            }
        };
    }, [containerId]);

    if (!container) {
        return null;
    }
    return createPortal(children, container);
}
