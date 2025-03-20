import { useEffect } from "react";

function Bullet({ context, x, y }) {
    useEffect(() => {
        if (!context) return;
        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(x, y, 5, 0, Math.PI * 2);
        context.fill();
    }, [context, x, y]);

    return null;
}

export default Bullet;