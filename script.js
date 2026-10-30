const g=document.getElementById('ghost');
const ob=document.getElementById('ob');
const sc=document.getElementById('sc');
const go=document.getElementById('go');
const fs=document.getElementById('fs');
const mus=new Audio('music.mp3');
mus.loop=true;
mus.volume=0.4;
const sj=new Audio('jump.wav');
const so=new Audio('over.wav');
const sl=new Audio('level.wav');
const mons=[
  {img:'small.png',w:100,h:80,n:2,b:0,l:1},
  {img:'big.png',w:92,h:128,n:6,b:0,l:1},
  {img:'bat.png',w:160,h:125,n:2,b:20,l:2},
  {img:'bat.png',w:160,h:125,n:2,b:145,l:3},
  
];

let y=0,v=0,x=innerWidth,m,f=0,t=0,s=0,sp=8,dead=false,dt=0,last=0,lv=1,pl=1;
 
 
function pick(){
  const ok=mons.filter(q=>q.l<=lv);
  m=ok[Math.floor(Math.random()*ok.length)];
  ob.style.bottom='calc(max(5.4vw,9.6vh) + '+m.b+'px)';
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
  y=0;v=0;s=0;sp=8;t=0;lv=1;pl=1;
  g.style.translate='0 0';
  pick();
  go.style.display='none';
  dead=false;
  last=performance.now();
  requestAnimationFrame(loop);
  mus.currentTime=0;
  mus.play();
}

function end(){
  dead=true;
  dt=Date.now();
  fs.textContent=Math.floor(s/6);
  go.style.display='flex';
  mus.pause();
  so.play();
}

function jump(){
  if(dead){
    if(Date.now()-dt>400)start();
    return;
  }
  mus.play();
  if(y===0){
    v=20;
    sj.currentTime=0;
    sj.play();
  }
}

document.addEventListener('keydown',e=>{
  if(e.code==='Space'||e.key===' '||e.key==='ArrowUp'||e.key==='w'){
    e.preventDefault();
    jump();
  }
});

addEventListener('pointerdown',jump);
 
function loop(now){
  const d=Math.max(0,Math.min((now-last)/16.667,3));
last=now;
  v-=0.799*d;
  y+=v*d;
  if(y<0){y=0;v=0}
  g.style.translate='0 '+(-y)+'px';
 

 s+=d;
  lv=1+Math.floor(s/600);
  if(lv>pl){
  pl=lv;
  sl.currentTime=0;
  sl.play();
}

sp=8+4*Math.sqrt(Math.max(lv-1,0));
  x-=sp*d;
  sc.textContent='LV '+lv+'  '+Math.floor(s/6);
  if(x<-m.w)pick();
  t+=d;
  if(t>=10){
    t-=10;
    f=(f+1)%m.n;
    ob.style.backgroundPosition=(-f*m.w)+'px 0';
  }
  ob.style.left=x+'px';
 
  const a=g.getBoundingClientRect();
  const b=ob.getBoundingClientRect();
  if(a.right-20>b.left+20&&a.left+20<b.right-20&&a.bottom-20>b.top+20&&a.top+20<b.bottom-20){
    end();
    return;
  }
  requestAnimationFrame(loop);
}

last=performance.now();
requestAnimationFrame(loop);
 