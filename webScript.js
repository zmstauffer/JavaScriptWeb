import Particle from "./Particles.js";
import QuadTree from "./QuadTree.js";

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

const MOUSE_RADIUS = .0075;                   //area of effect for mouse
const MAX_PARTICLES = .00015;                 //how many particles
const CONNECTING_BAR_LENGTH = .0065;          //how long are the "bars" that connect the dots
const MIN_SIZE = 5;
const MIN_SPEED = 5;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];         //array to hold particles

let mouse = {               //setup our mouse object
    x: null,
    y: null,
    radius: (canvas.height*MOUSE_RADIUS) * (canvas.width*MOUSE_RADIUS),
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function (event) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = (canvas.height*MOUSE_RADIUS) * (canvas.width*MOUSE_RADIUS);
    createParticles();
});

window.addEventListener('mouseout', function (event) {
    mouse.x = undefined;
    mouse.y = undefined;
});

function createParticles(){
    particles = []
    const numParticles = (canvas.height * canvas.width) * MAX_PARTICLES;
    for (let i = 0; i < numParticles; i++){
        let size = Math.random() * MAX_SIZE + 1;
        let x = Math.random() * innerWidth - MAX_SIZE * 2;
        let y = Math.random() * innerHeight - MAX_SIZE*2;
        let velocityX = Math.random() * MIN_SPEED - MIN_SPEED/2;
        let velocityY = Math.random() * MIN_SPEED - MIN_SPEED/2;
        let color = "#2baba9";
        particles.push(new Particle(x, y, velocityX, velocityY, size, color));
    }
}

function mainLoop() {
    ctx.clearRect(0,0, innerWidth, innerHeight);
    for(let particle of particles){
        particle.update(mouse);
        particle.draw(ctx);        
    }
    connectParticles();
    requestAnimationFrame(mainLoop);
}

function connectParticles(){
    let opacity = 1;
    for (let a = 0; a < particles.length; a++){
        for (let b = a; b < particles.length; b++){
            let distance = particles[a].calcDistance(particles[b].x, particles[b].y);
            if (distance < (canvas.width * CONNECTING_BAR_LENGTH) * (canvas.height * CONNECTING_BAR_LENGTH)) {
                opacity = 1 - (distance/150);
                ctx.strokeStyle = 'rgba(43,171,169,'+ opacity + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

createParticles();
mainLoop();

