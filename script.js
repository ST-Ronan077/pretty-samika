const screens = [...document.querySelectorAll(".screen")];
const pinDots = [...document.querySelectorAll("#pin span")];
const error = document.getElementById("pinError");
let entered = "";

function show(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderPin(){
  pinDots.forEach((dot,i)=>dot.classList.toggle("filled",i<entered.length));
}

document.querySelectorAll("[data-key]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(entered.length >= 4) return;
    entered += btn.dataset.key;
    renderPin();
    if(entered.length === 4){
      if(entered === "0315"){
        setTimeout(()=>show("introScreen"),220);
      }else{
        error.classList.add("show");
        entered="";
        renderPin();
        setTimeout(()=>error.classList.remove("show"),1600);
      }
    }
  });
});

document.getElementById("backspace").addEventListener("click",()=>{
  entered=entered.slice(0,-1); renderPin();
});

document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>show(btn.dataset.next));
});

const songUrl = "https://youtu.be/MqzV4hbu8E";
document.getElementById("youtubeBtn").addEventListener("click",()=>{
  window.open(songUrl,"_blank","noopener,noreferrer");
  document.getElementById("toast").classList.add("show");
  setTimeout(()=>document.getElementById("toast").classList.remove("show"),2800);
});

const record = document.querySelector(".record");
document.getElementById("musicBtn").addEventListener("click",()=>{
  window.open(songUrl,"_blank","noopener,noreferrer");
  record.classList.add("playing");
  document.getElementById("musicBtn").textContent="♫ Our song is open";
});

document.getElementById("replay").addEventListener("click",()=>{
  entered=""; renderPin(); show("lockScreen");
});

document.addEventListener("keydown",e=>{
  if(/^\d$/.test(e.key)){
    const btn=document.querySelector(`[data-key="${e.key}"]`);
    if(btn) btn.click();
  }
  if(e.key==="Backspace") document.getElementById("backspace").click();
});
