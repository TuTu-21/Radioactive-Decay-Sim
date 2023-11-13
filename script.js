


const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width =window.innerWidth*0.5;
canvas.height =window.innerHeight;





const canvas1 = document.getElementById('canvas2');
const ctx1 = canvas.getContext('2d');
canvas.width =window.innerWidth;
canvas.height =window.innerHeight;



// functions
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }


function radioactiveDecay(N0, lambda, t) {
    return N0 * Math.exp(-lambda * t);
}



let Particles = [];
let Daughter = [];
let decayConstant = parseFloat(document.getElementById('decayConstant').value);
let numberOfParticles= parseInt(document.getElementById('parentParticles').value);

function create () {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    decayConstant = parseFloat(document.getElementById('decayConstant').value);
    numberOfParticles = parseInt(document.getElementById('parentParticles').value);


//Global ctx
ctx.fillStyle = "white"; 

class Particle {
    constructor(effect){
        
        this.velocity=50,
        this.angle = Math.random() * Math.PI * 2;
        this.Radius = randomInRange(10, 100);
        this.x = effect.width / 2 + Math.cos(this.angle) * this.Radius;
        this.y = effect.height / 2 + Math.sin(this.angle) * this.Radius;
        this.radius = 0.5;
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius,0,Math.PI*2);
        context.fill();
    }

    ray(ctx){

        this.x += this.velocity * Math.cos(this.angle);
        this.y += this.velocity * Math.sin(this.angle);

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 100 * Math.cos(this.angle), this.y + 100 * Math.sin(this.angle));
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

    }
}



class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.numberOfParticles = numberOfParticles;
        this.createParticle();
    }

    createParticle(){
        for(let i=0;i<this.numberOfParticles;i++){
            Particles.push(new Particle(this));
        }
    }

    handleParticle(context){
        Particles.forEach(particle => particle.draw(context))
    }

}



const effect = new Effect(canvas);
effect.handleParticle(ctx);








let animationStartTime = performance.now(); // Record the start time of the animation
let elapsedTime = 0; // Elapsed time since animation started
let lastTimestamp = 0;






function animate(currentTime) {



    // Update particle and ray positions
   
    // Daughter.forEach(particle => {
    //     particle.ray(ctx);
    //     particle.draw(ctx);
    //     ctx.fillStyle = "red";
    //     ctx.fill();
    // });

   
    // Calculate deltaTime based on the difference between currentTime and lastTimestamp
    let deltaTime = (currentTime - lastTimestamp) / 1000;
    lastTimestamp = currentTime;

    // Calculate elapsed time since the animation started
    elapsedTime = (currentTime - animationStartTime) / 1000;

    // Output deltaTime and elapsedTime
    // const decayConstant = 0.000001; // Example decay constant

    // Check if 1 second has passed
    if (elapsedTime > 1) {
    let initialAtoms = Particles.length; // Initial number of atoms
    let finalAtom = radioactiveDecay(initialAtoms, decayConstant, deltaTime);
    
let decayed =initialAtoms-finalAtom;


for (let i = 0;i < decayed;i++) {
let randomIndex = Math.floor(Math.random() * Particles.length);
let decayedAtom = Particles.splice(randomIndex, 1)[0];
// Move the selected element to the destination array
Daughter.push(decayedAtom);
}


Daughter.forEach(particle => {
   
    particle.draw(ctx);
    ctx.fillStyle = "red";
    ctx.fill();
});





}

requestAnimationFrame(animate);
}

  
requestAnimationFrame(animate);

}


create ();


document.getElementById('startButton').addEventListener('click', () => {
    // Remove the canvas and recreate it to clear the previous animation
 Particles = [];
 Daughter = [];
 create();

     // Call the function to start the animation
});

