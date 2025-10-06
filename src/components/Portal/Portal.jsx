import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function Portal({ children, containerId = "root" }) {
    const [container, setContainer] = useState(null);

    useEffect(() => {
        let containerElement = document.getElementById(containerId);

        setContainer(containerElement);
    }, [containerId]);

    if (!container) {
        return null;
    }
    return createPortal(children, container);
}
//* Component for rendering a modal window on the page. Parent element for Modal component. Receives the modal window and parent element (by default div with id "root", where the modal window will be rendered) as props. Creeates a portal and renders the modal window on the page.

//* Logic is to find the container element by id, create a portal (teleport of the modal window to the container element) and render the modal window inside it.