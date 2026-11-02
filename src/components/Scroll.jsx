import { useEffect } from "react";
import { useLocation } from "react-router";

function Scroll() {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }

        const target = document.getElementById(hash.slice(1));
        if (!target) {
            return;
        }
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    },  [pathname, hash, key]);
    return null;
}

export default Scroll;