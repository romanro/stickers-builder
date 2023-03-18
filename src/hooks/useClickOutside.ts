import React, { Dispatch, SetStateAction, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideAlerter = (ref: any, setExpanded: Dispatch<SetStateAction<boolean>>) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setExpanded(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}