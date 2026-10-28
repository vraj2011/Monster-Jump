const g=document.getElementById('ghost');
let y=0,v=0;

function jump(){
    if(y===0)v=20;
}

document.addEventListener('keydown',e=>{
  console.log(e.code,e.key);
  if(e.code==='Space'||e.key===' '||e.key==='ArrowUp'||e.key==='w'){
    e.preventDefault();
    jump();
  }
});
addEventListener('pointerdown',jump);
 
function loop(){
  v-=0.8;
  y+=v;
  if(y<0){y=0;v=0}
  g.style.translate='0 '+(-y)+'px';
  requestAnimationFrame(loop);
}
loop();