// =================================
// ===== ELEMENT ====================
// =================================

document.body.classList.add("hero-lock");

const music =
document.getElementById("bgMusic");

const musicBtn =
document.getElementById("musicBtn");

const enterBtn =
document.getElementById("enterBtn");


function startMusic(){

    music.volume = 0.8;

    music.play()
    .then(()=>{

        musicBtn.classList.add("playing");
        musicBtn.innerHTML="♫";

        localStorage.setItem(
            "music",
            "on"
        );

    })
    .catch((err)=>{

        console.log(
            "音乐播放失败:",
            err
        );

    });

}



// ENTER 点击播放

if(enterBtn){

enterBtn.addEventListener(
"click",
()=>{

document.body.classList.remove(
"hero-lock"
);


startMusic();


const hero =
document.getElementById("hero");

const story =
document.querySelector(".story");



hero.classList.add("hide");


setTimeout(()=>{


story.classList.add("show");


setTimeout(()=>{

hero.style.display="none";

},500);


},1200);



}

);


}



// 音乐按钮

if(musicBtn){


musicBtn.addEventListener(
"click",
()=>{


if(music.paused){

startMusic();


}else{


music.pause();


musicBtn.classList.remove(
"playing"
);


musicBtn.innerHTML="×";


localStorage.setItem(
"music",
"off"
);


}


}

);


}








// =================================
// ===== MOMENTS PHOTO SYSTEM =======
// =================================


// ===== MOMENTS TRANSITION =====


const transition =
document.querySelector(
".page-transition"
);


const momentsSection =
document.querySelector(
".moments"
);



if(
momentsSection &&
transition
){


const momentsObserver =
new IntersectionObserver(


(entries)=>{


entries.forEach(
(entry)=>{


if(
entry.isIntersecting
){


transition.classList.add(
"show"
);

momentsSection.classList.remove(
"play-intro"
);

// 强制重新计算
void momentsSection.offsetWidth;


momentsSection.classList.add(
"play-intro"
);

setTimeout(()=>{


transition.classList.remove(
"show"
);


},1000);



}


});


},


{
threshold:.01
}


);



momentsObserver.observe(
momentsSection
);


}



const slider =
document.querySelector(
".photo-slider"
);



const photos =
document.querySelectorAll(
".photo-card"
);



const dotsContainer =
document.querySelector(
".photo-dots"
);








// 创建照片点


if(
dotsContainer
){


photos.forEach(
()=>{


const dot =
document.createElement(
"span"
);



dot.className="dot";


dotsContainer.appendChild(
dot
);



}

);


}





const dots =
document.querySelectorAll(
".dot"
);






if(
dots[0]
){


dots[0].classList.add(
"active"
);


}









// =================================
// ===== 图片加载系统 ===============
// =================================



const imgs =
document.querySelectorAll(
".photo-card img"
);





function loadImage(img){


if(
!img
){

return;

}



if(
img.dataset.src
){


img.src =
img.dataset.src;


img.removeAttribute(
"data-src"
);


}



}







// 当前图片前后加载


function preloadAround(index){



for(
let i=index-2;
i<=index+2;
i++
){


if(
imgs[i]
){


loadImage(
imgs[i]
);


}



}



}






// 初始只加载前几张


preloadAround(0);









// =================================
// ===== 横向滚动监听 ================
// =================================



if(slider){



const observer =
new IntersectionObserver(



(entries)=>{


entries.forEach(
(entry)=>{



if(
entry.isIntersecting
){


const index =
Array.from(
photos
)
.indexOf(
entry.target
);





// 当前图片显示


entry.target.classList.add(
"active"
);






// 更新点


dots.forEach(
(dot)=>{


dot.classList.remove(
"active"
);


});





if(
dots[index]
){


dots[index].classList.add(
"active"
);


}






// 提前加载附近图片


preloadAround(
index
);




}else{



entry.target.classList.remove(
"active"
);



}



});



},



{


root:slider,


threshold:0.7


}



);







photos.forEach(
(photo)=>{


observer.observe(
photo
);


});



}









// =================================
// ===== 防止首次黑屏 ================
// =================================



window.addEventListener(
"load",
()=>{


const firstImage =
document.querySelector(
".photo-card img"
);



if(firstImage){


loadImage(
firstImage
);


}



});

// ===== PHOTO END TO NEXT SECTION =====


const lastPhoto =
document.querySelector(
".photo-card:last-child"
);


const infoSection =
document.querySelector(
".info"
);



if(lastPhoto && infoSection){


const endObserver =
new IntersectionObserver(


(entries)=>{


entries.forEach(
(entry)=>{


if(
entry.isIntersecting
){


slider.addEventListener(
"scroll",
()=>{


if(
slider.scrollLeft +
slider.clientWidth >=
slider.scrollWidth - 10
){


setTimeout(()=>{


infoSection.scrollIntoView({

behavior:"smooth"

});


},600);



}


},
{
once:true
}

);


}


});


},


{
root:slider,
threshold:.9
}


);



endObserver.observe(
lastPhoto
);


}


// ===== WEDDING COUNTDOWN =====


function updateCountdown(){


const wedding =
new Date("2026-09-26T10:30:00");


const now =
new Date();


const diff =
wedding - now;



if(diff<=0){

return;

}



const days =
Math.floor(
diff/(1000*60*60*24)
);



const hours =
Math.floor(
(diff/(1000*60*60))%24
);



const minutes =
Math.floor(
(diff/(1000*60))%60
);



const seconds =
Math.floor(
(diff/1000)%60
);



document.getElementById("days").innerHTML =
String(days).padStart(2,"0");


document.getElementById("hours").innerHTML =
String(hours).padStart(2,"0");


document.getElementById("minutes").innerHTML =
String(minutes).padStart(2,"0");


document.getElementById("seconds").innerHTML =
String(seconds).padStart(2,"0");


}



updateCountdown();


setInterval(
updateCountdown,
1000
);


// ===== RSVP =====


let attend="YES";


const choices =
document.querySelectorAll(".choice");


choices.forEach(btn=>{


btn.onclick=()=>{


choices.forEach(
b=>b.classList.remove("active")
);


btn.classList.add("active");


attend =
btn.dataset.value;


}


});



let count=1;


const countText =
document.getElementById("guestCount");



document.getElementById("plus")
.onclick=()=>{


count++;

countText.innerHTML=count;


}



document.getElementById("minus")
.onclick=()=>{


if(count>1){

count--;

}

countText.innerHTML=count;


}




const submitRSVP =
document.getElementById("submitRSVP");


if(submitRSVP){


submitRSVP.addEventListener(
"click",
()=>{


const form =
document.querySelector(".rsvp-form");


const thank =
document.getElementById("thankYou");



form.classList.add(
"hide"
);



setTimeout(()=>{


thank.classList.add(
"show"
);



},700);



}

);


}