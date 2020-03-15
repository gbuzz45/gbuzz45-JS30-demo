# JS30#03 Update CSS Variables with JS
⌚️Sun, Mar 15, 2020 

JS30課程 https://javascript30.com

[#03 DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/03_updateCSSwithJS/03_updateCSSwithJS.html)


## HTML
`<input type="range" min="0" max="100" step="1" value="50">`
step可省略


<br>

## CSS
- 定義預設值 `:root { --變數名稱 : 預設值}` [:information_source:](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)
- 使用預設值 `.elem { css屬性: var(--變數名稱)}`

假如將:root裡的預設值寫進行內
譬如CSS先設定了`:root{--base:red}`
又在某DOM行內寫上`style="--base:green"`
**JS將因權重而改變不了行內的設定**

<br>

## Javascript
1. 先定義目標
2. 處理變化的函式
3. 呼叫函式的事件

```
  const inputs = document.querySelectorAll('.controls input');

  function handleUpdate(){
    //console.log(this.value);檢查值的改變
    //dataset會是一個物件，記錄所有data值，
    // 此例利用預先設定的name=CSS屬性，value=屬性值，data-sizing來作屬性值的單位
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  }

  inputs.forEach(input => input.addEventListener('change',handleUpdate)); // 欄位值改變
  inputs.forEach(input => input.addEventListener('mousemove',handleUpdate)); // 拖曳(練續改變)

  // 上述兩行也可以統整為
  // inputs.forEach(input => input.addEventListener('input',handleUpdate));
  // (但有兼容問題 Internet Explorer: Only supports input of type text and password.)
```
<br>


## 補充
### 【1】關於input type="range" 滑桿拖曳改值 on input v.s. on change [:information_source:](https://www.impressivewebs.com/onchange-vs-oninput-for-range-sliders/)
|Event|Chrome|Opera|Firefox|IE11|
|---|---|---|---|---|
|input|滑鼠:即時<br>鍵盤:即時|滑鼠:即時<br>鍵盤:即時|滑鼠:即時<br>鍵盤:即時|滑鼠&鍵盤:<br>無作用<br>但選鈕的tooltip會顯示值|
|change|滑鼠:停止才變<br>鍵盤:即時改變|滑鼠:停止才變<br>鍵盤:即時改變|滑鼠:停止才變<br>鍵盤:blur才變|滑鼠:即時<br>鍵盤:即時|

那麼選哪個好?
#### input
- <input>, <select>,  <textarea> 元素的value 被修改時就會觸發，不管是透過滑鼠還是鍵盤
- 觸發時間先於change

#### change
- <input>, <select>,  <textarea> 當控件失去輸入焦點並且其值已被修改時
- 觸發時間後於input
<br>
因為firefox在change的表現上過於符合規範，失去焦點才會改變，
IE又無法如預期地作用input
**JS30此例透過change + mousemove有考慮到兼容，是挺好的方式**
<br>


### 【2】延伸:改變type="range"的樣式 [:information_source:](https://www.oxxostudio.tw/articles/201503/html5-input-range-style.html)

1. CSS
<br>
```css=
input[type="range"]{
  -webkit-appearance: none;
  overflow: hidden;
}

// -webkitz

input[type="range"]::-webkit-slider-thumb
input[type="range"]::-webkit-slider-thumb:hover
input[type="range"]::-webkit-slider-thumb:active

input[type="range"]::-webkit-slider-thumb:before,
input[type="range"]::-webkit-slider-thumb:after
可+偽元素


// -moz

input[type="range"]::-moz-range-track
input[type="range"]::-moz-range-thumb
input[type="range"]::-moz-range-thumb:hover,input[type="range"]:active::-moz-range-thumb
input[type="range"]::-moz-range-progress
input[type="range"]::-moz-focus-outer
```


2. CSS拿掉預設值，JS改變"漸變背景色"雙色的比例
```
'background-image':'-webkit-linear-gradient(left ,#f22 0%,#f22 '+n+'%,#fff '+n+'%, #fff 100%)'
```
