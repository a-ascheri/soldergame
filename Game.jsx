import React, { useEffect, useRef, useState } from "react";
import Player from "./Player";
import Bullet from "./Bullet";

function Game() {
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [bullets, setBullets] = useState([]);
    const [players, setPlayers] = useState([
        { x: 50, y: 150, color: "blue", isHit: false },
        { x: 720, y: 150, color: "red", isHit: false }
    ]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 400;
        setContext(ctx);
    }, []);

    function shoot(x, y, direction) {
        setBullets([...bullets, { x, y, direction }]);
    }

    useEffect(() => {
        if (!context) return;
        function update() {
            context.clearRect(0, 0, 800, 400);
            
            players.forEach((player, i) => {
                const img = new Image();
                img.src = "./soldier.svg";
                img.onload = () => {
                    if (player.isHit) {
                        context.globalAlpha = 0.5;
                    } else {
                        context.globalAlpha = 1;
                    }
                    context.drawImage(img, player.x, player.y, 40, 60);
                };
            });
            
            bullets.forEach((bullet, index) => {
                bullet.x += bullet.direction * 5;
                
                players.forEach((player, i) => {
                    if (
                        bullet.x > player.x && bullet.x < player.x + 40 &&
                        bullet.y > player.y && bullet.y < player.y + 60
                    ) {
                        players[i].isHit = true;
                        setTimeout(() => {
                            players[i].isHit = false;
                        }, 300);
                        bullets.splice(index, 1);
                    }
                });
            });
            setBullets([...bullets]);
        }
        const interval = setInterval(update, 50);
        return () => clearInterval(interval);
    }, [context, bullets, players]);

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default Game;