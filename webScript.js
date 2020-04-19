import Particle from "./Particles.js";
import QuadTree from "./QuadTree.js";
import Rectangle from "./Rectangle.js";
import Point from "./Point.js";
import Circle from "./Circle.js";

const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

const MOUSE_RADIUS = 0.0075; //area of effect for mouse
const MAX_PARTICLES = 0.0002; //how many particles
const CONNECTING_BAR_LENGTH = 0.0065; //how long are the "bars" that connect the dots
const MIN_RADIUS = 2.5;
const MIN_SPEED = 6;
const DEFAULT_SPLIT_COUNT = 4; //how many particles per quadtree before it splits

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//create QuadTree
let boundary = new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
let qtree = new QuadTree(boundary, DEFAULT_SPLIT_COUNT);

let particles = []; //array to hold particles

let mouse = {
  //setup our mouse object
  x: undefined,
  y: undefined,
  radius: canvas.height * MOUSE_RADIUS * (canvas.width * MOUSE_RADIUS),
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function (event) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = canvas.height * MOUSE_RADIUS * (canvas.width * MOUSE_RADIUS);
  createParticles();
});

window.addEventListener("mouseout", function (event) {
  mouse.x = undefined;
  mouse.y = undefined;
});

function createParticles() {
  particles = [];
  const numParticles = canvas.height * canvas.width * MAX_PARTICLES;
  for (let i = 0; i < numParticles; i++) {
    let size = Math.random() * MIN_RADIUS + 1;
    let x = Math.random() * innerWidth - MIN_RADIUS * 4;
    let y = Math.random() * innerHeight - MIN_RADIUS * 4;
    let velocityX = Math.random() * MIN_SPEED - MIN_SPEED / 2;
    let velocityY = Math.random() * MIN_SPEED - MIN_SPEED / 2;
    let color = "#2baba9";
    particles.push(new Particle(x, y, velocityX, velocityY, size, color));
  }
}

function mainLoop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let particle of particles) {
    particle.update(mouse);
    particle.draw(ctx);
  }
  connectParticles();
  requestAnimationFrame(mainLoop);
}

function connectParticles() {
  //create QuadTree
  let boundary = new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
  let qtree = new QuadTree(boundary, DEFAULT_SPLIT_COUNT);

  for (let p of particles) {
    let point = new Point(p.x, p.y, p);
    qtree.insert(point);
  }

  let maxDistance = canvas.width * canvas.height * CONNECTING_BAR_LENGTH ** 2;
  let opacity = 1;

  let count = 0;

  for (let p of particles) {
    let point = new Point(p.x, p.y, p);
    let range = new Circle(p.x, p.y, maxDistance);
    let matches = qtree.query(range);

    for (let match of matches) {
      let distance = p.calcDistance(match.x, match.y);

      if (p !== match && distance <= maxDistance) {
        opacity = 1 - distance / maxDistance;
        ctx.strokeStyle = "rgba(43,171,169," + opacity + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(match.x, match.y);
        ctx.stroke();
      }
    }
  }
}

createParticles();
mainLoop();
