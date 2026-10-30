const g=document.getElementById('ghost');
const ob=document.getElementById('ob');
const sc=document.getElementById('sc');
const go=document.getElementById('go');
const fs=document.getElementById('fs');

const mons=[
  {img:'small.png',w:100,h:80,n:2},
  {img:'big.png',w:92,h:128,n:6},
  {img:'bat.png',w:160,h:125,n:2}
];

let y=0,v=0,x=innerWidth,m,f=0,t=0,s=0,sp=8,dead=false,dt=0;

function pick(){
  m=mons[Math.floor(Math.random()*mons.length)];
  ob.style.width=m.w+'px';
  ob.style.height=m.h+'px';
  ob.style.backgroundImage='url('+m.img+')';
  ob.style.backgroundSize=(m.w*m.n)+'px '+m.h+'px';
  ob.style.backgroundPosition='0 0';
  f=0;
  x=innerWidth;
}
pick();

function start(){
  y=0;v=0;s=0;sp=8;t=0;
  g.style.translate='0 0';
  pick();
  go.style.display='none';
  dead=false;
  loop();
}

function end(){
  dead=true;
  dt=Date.now();
  fs.textContent=Math.floor(s/6);
  go.style.display='flex';
}

function jump(){
  if(dead){
    if(Date.now()-dt>400)start();
    return;
  }
    if(y===0)v=20;
}

document.addEventListener('keydown',e=>{
  if(e.code==='Space'||e.key===' '||e.key==='ArrowUp'||e.key==='w'){
    e.preventDefault();
    jump();
  }
});

addEventListener('pointerdown',jump);
 
function loop(){
  v-=0.799;
  y+=v;
  if(y<0){y=0;v=0}
  g.style.translate='0 '+(-y)+'px';
 
 s++;
sp=Math.min(24,11+s/600);
x-=sp;
sc.textContent=Math.floor(s/6);
  if(x<-m.w)pick();
  t++;
  if(t%10===0){
    f=(f+1)%m.n;
    ob.style.backgroundPosition=(-f*m.w)+'px 0';
  }


  ob.style.left=x+'px';
 
  const a=g.getBoundingClientRect();
  const b=ob.getBoundingClientRect();

  if(a.right-20>b.left+20&&a.left+20<b.right-20&&a.bottom-20>b.top+20){
    end();
    return; 
  }

  requestAnimationFrame(loop);
}

loop();
        