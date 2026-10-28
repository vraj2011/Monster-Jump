const g=document.getElementById('ghost');
let y=0,v=0;

addEventListener('keydown',e=>{
    if(e.code==='space'&&y===0)v=14;
});

function loop(){
    v-=0.7;
    y+v;
    if(y<0){y=0;v=0}
    g.style.bottom='calc(9vh + '+y+'px)';
    requestAnimationFrame(loop);
}
loop();