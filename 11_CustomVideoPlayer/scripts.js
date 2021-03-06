// Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//影片基本要素

// Function
function togglePlay(){
  // if(video.paused){
  //   video.play();
  // }else{
  //   video.pause();
  // }

  // ES6 中的 Computed property names(動態計算屬性名)
  let method = video.paused ? 'play' : 'pause';
  video[method]();
}

function toggleButton() {
  // 這邊用this是因為偵測是播放/暫停的對象是video不是toggle按鈕
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange(){
  // 因為把video的屬性寫進name與value所以可以直接拿來用
  // playbackRate 預設 1.0，volume 最大 1.0
  video[this.name] = this.value;
}

function handleProgress(){
  // 進度條用css的flex-basis來控制占比
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  //Q：不太懂何時用const 何時用let
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event
video.addEventListener('click', togglePlay); // 點擊影片 切換播放/暫停
video.addEventListener('pause', toggleButton); // 影片暫停時 切換播放提示
video.addEventListener('play', toggleButton); // 影片播放時 切換播放提示
video.addEventListener('timeupdate', handleProgress); // 影片播放位置改變 更新進度條


toggle.addEventListener('click', togglePlay); // 點擊播放鈕 切換播放/暫停
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip)); // 跳轉
ranges.forEach(range => range.addEventListener('change',handleRange)); // 調速&音量, 滑捍考慮兼容
ranges.forEach(range => range.addEventListener('mousemove',handleRange)); // 調速&音量, 滑捍考慮兼容

let mousedown = false;
progress.addEventListener('click', scrub); // 點擊進度條 到指定時間播放
// 拖拉進度條 到指定時間播放
// progress.addEventListener('mousemove', (e) => {
//   if(mousedown){
//     scrub(e);
//   }
// });
// 以下縮寫，因為多了條件判別所以需要再另外帶參數的樣子
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


// FullScreen
document.addEventListener('keydown', function(e) {
  if(e.keyCode == 122){
    e.preventDefault();
    toggleFullScreen();
  }
}, false);

function toggleFullScreen() {
  if (!document.fullscreenElement && 
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}