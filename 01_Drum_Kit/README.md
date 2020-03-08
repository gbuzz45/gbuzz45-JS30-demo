# JS30#01 Drum Kit
⌚️Thu, Mar 6, 2020 

JS30課程 https://javascript30.com

[#01 DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/01_Drum_Kit/01_Drum_Kit.html)

## 目標
- 敲鍵盤播對應音效

## 執行概述
- 鍵盤事件增減樣式（動畫效果）
- 鍵盤事件是透過keyCode對應自定義屬性data-*來連動
- keyCode這裡找： https://keycode.info/

### HTML架構

```htmlmixed=
<!--按鈕-->
<div data-key="65" class="key">
  <kbd>A</kbd>
  <span class="sound">clap</span>
</div>

<!--聲音-->
<audio src="sound/clap.wav" data-key="65"></audio>
```

`<kdb>` 行內元素，預設字體：monospace
`<audio>`


### Javascript
```javascript=
// function 播音效&增加樣式
function playSound(e){
    //console.log(e);可檢查KeyboardEvent物件
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if(!audio) return; //stop the function from nunning all together
    audio.currentTime = 0; //rewind to the start 00:00
    audio.play();

    key.classList.add('playing')
}

// function 移除樣式
function removeTransition(e){
    //console.log(e);可檢查TransitionEvent物件
    if(e.propertyName !== 'transform') return; //skip it if it's not a transform
    this.classList.remove('playing');
}


// EventListener 動畫結束時移除樣式
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend',removeTransition)); 

// EventListener 敲鍵盤
window.addEventListener('keydown',playSound);
```

## 筆記

### 1. ES6 template literals
倒引號、${}塞變數
方便字串與非字串閱讀
減少單雙引號切換

### 2. 一次觸發一個聲音的處理
if(!audio) return;
    audio.currentTime = 0;
    audio.play();

### 2.TransitionEvent
有多少變化就會有多少組有不同`propertyName`的物件
此例只focus在`transform`的變化
> 當監聽的事件發生時，瀏覽器會去執行我們透過 addEventListener() 註冊的 Event Handler (EventListener) ，也就是我們所指定的 function。 [:information_source:](https://ithelp.ithome.com.tw/articles/10192015)

### 3.動畫時間
與其用`setTimeout`（配合css秒數）來判斷動畫時間結束
可以改用`addEventListener('transitionend', )`
可應用上連續動作上

### 4. 兼容
原例包含ES6寫法，若要IE11可執行
1. 音檔改.mp3 [:information_source:](https://stackoverflow.com/a/52457990/11767346)
2. IE允許播音(IE--> Internet Options--> Advanced--> Enable play sounds in webpages.)[:information_source:](https://stackoverflow.com/a/46321806/11767346)
3. forEach有支援，<font color="#f00">待查閱NodeList與Array的詳細</font> [:information_source:](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
4. 修改ES6寫法

```javascript=
var audio, key, keys;
function playSound(e){
    audio = document.querySelector('audio[data-key="'+ e.keyCode+'"]');
    key = document.querySelector('.key[data-key="'+ e.keyCode+'"]');
    if(!audio) return;
    if (!isNaN(audio.duration)){ 
      audio.currentTime = 0;
      audio.play();
    }
    key.classList.add('playing')
}
function removeTransition(e){
    if(e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}
keys = document.querySelectorAll('.key');
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('transitionend',removeTransition)
}
window.addEventListener('keydown',playSound);
```
