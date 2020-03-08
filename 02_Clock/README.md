# JS30#01 Clock
⌚️Sun, Mar 8, 2020 

JS30課程 https://javascript30.com

[#02 DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/02_Clock/02_Clock.html)

## HTML
- hour
- min
- second

## CSS
- set anchor point：transform-origin
- simulation：ransition-timing-function:  cubic-bezier(0.1, 1.7, 0.58, 1)
- 2D座標設0度，負角度會順時針轉/正角度會逆時針轉

## Javascript
函式內容：以時間換算角度，然後去變動Dom
用`setInterval(setDate, 1000);` 每一秒呼叫一次函式

### setInterval  [:information_source:](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setInterval)


### Date [:information_source:](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date)
如果把 Date 作為一般的函數來呼叫（省略掉 new 運算子）將會得到一個字串而非 Date 
`new Date()`
`new Date().getSeconds()`
`new Date().getMinutes()`

- 秒：new Date().getSeconds()
- 秒角度：（當前秒 / 時鐘秒刻度60）* 360度 + 90(為了時針由12開始)
- 分：new Date().getMinutes()
- 分角度：（當前分 / 時鐘分刻度60）* 360度 + 90(為了時針由12開始)
- 時：new Date().getMinutes()
- 時角度：（當前分 / 時鐘時刻度12）* 360度 + 90(為了時針由12開始)


```javascript=
const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate(){
const now = new Date();

const seconds = now.getSeconds();
const secondsDegrees = ((seconds / 60) * 360 ) + 90;
/* +90是為了加上預設時的度數讓指針指向對的位置 */
secondHand.style.webkitTransform = `rotate(${secondsDegrees}deg) scaleX(1)`;
secondHand.style.MosTransform = `rotate(${secondsDegrees}deg) scaleX(1)`;
secondHand.style.transform = `rotate(${secondsDegrees}deg) scaleX(1)`;

const mins= now.getMinutes();
const minsDegrees = ((mins / 60) * 360 ) + 90;
minHand.style.webkitTransform = `rotate(${minsDegrees}deg) scaleX(0.8)`;
minHand.style.MosTransform = `rotate(${minsDegrees}deg) scaleX(0.8)`;
minHand.style.transform = `rotate(${minsDegrees}deg) scaleX(0.8)`;

const hours= now.getHours();
const hoursDegrees = ((hours / 12) * 360 ) + 90;
hourHand.style.webkitTransform = `rotate(${hoursDegrees}deg) scaleX(0.5)`;
hourHand.style.MosTransform = `rotate(${hoursDegrees}deg) scaleX(0.5)`;
hourHand.style.transform = `rotate(${hoursDegrees}deg) scaleX(0.5)`;
}

setInterval(setDate, 1000);
```

### 注意
時鐘進位時會倒回到原來位置再開始動畫的問題
有兩種處理方式：
法一：讓它degree繼續累加下去
法二：關閉transition（可參考[URL](https://github.com/guahsu/JavaScript30/tree/master/02_JS-and-CSS-Clock)）