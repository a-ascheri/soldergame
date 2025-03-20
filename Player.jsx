import { useEffect, useState } from "react";
import soldierSprite from "./soldier.svg";

function Player({ context, x, y, color, isHit, isActive, onShoot, onEndTurn }) {
    const [position, setPosition] = useState({ x, y });

    useEffect(() => {
        if (!context) return;

        function draw() {
            const img = new Image();
            img.src = soldierSprite;
            img.onload = () => {
                if (isHit) {
                    context.globalAlpha = 0.5;
                } else {
                    context.globalAlpha = 1;
                }
                context.drawImage(img, position.x, position.y, 40, 60);
            };
        }

        function handleKeyDown(event) {
            if (!isActive) return;
            let newX = position.x;
            let newY = position.y;

            if (event.key === "w") newY -= 10;
            if (event.key === "s") newY += 10;
            if (event.key === "a") newX -= 10;
            if (event.key === "d") newX += 10;
            
            if (event.key === " ") {
                onShoot(newX + 20, newY + 20, color === "blue" ? 1 : -1);
                onEndTurn();
            }

            setPosition({ x: newX, y: newY });
        }

        window.addEventListener("keydown", handleKeyDown);
        context.clearRect(0, 0, 800, 400);
        draw();
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [context, position, isActive, isHit]);

    return null;
}

export default Player;