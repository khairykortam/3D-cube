const forecolor = document.getElementById('color');
let fore = "#00ff00";
forecolor.addEventListener('input', (event)=>{
    fore = event.target.value;
})
const back = "#101011";
//const fore = "green";
const canvas = document.getElementById("canvas");
console.log(canvas);
canvas.width = 1000;
canvas.height = 1000;
const context = canvas.getContext("2d");
console.log(context);
function clear() {
    context.fillStyle = back;
context.fillRect(0,0,canvas.width,canvas.height);
}

function pt({x,y}){
    const s=20;
    const offset = s/2;
    context.fillStyle = fore;
    context.fillRect(x-offset,y-offset,s,s);
}

function line(p1,p2){
    context.lineWidth = 3;
    context.strokeStyle = fore;
    context.beginPath();
    context.moveTo(p1.x,p1.y);
    context.lineTo(p2.x,p2.y);
    context.stroke();
}

function screen(p){
    return {
        x:(p.x+1)/2*canvas.width,
        y:(1-(p.y+1)/2)*canvas.height,
    } 
}
function proj({x,y,z}){
        return {
            x: x/z,
            y: y/z,
        }
    }
const frames = 60;
let dz=1;
let angle=0;
function rotate_xz({x,y,z},angle){
    xprime = x*Math.cos(angle)-z*Math.sin(angle);
    zprime = x*Math.sin(angle)+z*Math.cos(angle);
    return {
        x: xprime,
        y,
        z: zprime,
    }
    
}

const points = [
  { x: 0.25, y: 0.25, z: 0.25 },
  { x: -0.25, y: 0.25, z: 0.25 },
  { x: -0.25, y: -0.25, z: 0.25 },
  { x: 0.25, y: -0.25, z: 0.25 },

  { x: 0.25, y: 0.25, z: -0.25 },
  { x: -0.25, y: 0.25, z: -0.25 },
  { x: -0.25, y: -0.25, z: -0.25 },
  { x: 0.25, y: -0.25, z: -0.25 },
];

const faces = [
    [0,1,2,3],
    [4,5,6,7],
    [0,4],
    [1,5],
    [2,6],
    [3,7],
];

function add_dz({x,y,z},dz){
    return {x,y, z: z+dz};
}
function frame(){
    const dt = 1/frames;
    //dz+=1*dt;
    angle+= Math.PI*dt;
    clear();
    for (const v of points){
        pt(screen(proj(add_dz(rotate_xz(v,angle),dz))))
    }
    for(const f of faces){
    for(let i=0;i<f.length;i++){
        const a = points[f[i]];
        const b = points[f[(i+1)%f.length]];
        line(screen(proj(add_dz(rotate_xz(a,angle),dz))),
        screen(proj(add_dz(rotate_xz(b,angle),dz))))
    }
}
    setTimeout(frame,1000/frames);
}
frame();


