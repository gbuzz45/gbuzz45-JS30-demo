# JS30#08 HTML5 Canvas
2020/4/26

[DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/08_HTML5_Canvas/)

## 練習目標
彩虹筆畫版

## 程式碼
1. 初始畫布(抓取dom，2d渲染，畫布尺寸)
2. 作畫設定(線條設定、色彩模式等)
3. 判斷是否執行事件的狀態(開關閥概念)(此例為 控制是否畫圖的isDrawing、控制粗細極限的direction)
4. 滑鼠事件(mousedown、mouseup、mousemove、mouseout)
5. 改變位置、色彩、線條粗細

```javascript
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#bada55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 0;
//ctx.globalCompositeOperation = 'multiply';//色彩模式

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){
if(!isDrawing) return; //限定觸發的條件，不要無時無刻
//console.log(e);
ctx.strokeStyle = `hsl(${hue}, 100% , 50%)`; //開始的顏色
ctx.beginPath();
ctx.moveTo(lastX, lastY); //指定點開始
ctx.lineTo(e.offsetX, e.offsetY); //結束
ctx.stroke();
[lastX, lastY] = [e.offsetX, e.offsetY];//執行時不斷更新位置(下一個move的原點)

hue++; //每次移動改變色相位置
//限制最大值的好處之一一目了然當前顏色，之二避免出現超出儲存的極限與無法處理的情況
if(hue >= 360){
  hue = 0;
}

//讓粗細不停在1-100的範圍變化(累加到極致後又累減)
if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
  direction = !direction;
}
if(direction){
  ctx.lineWidth++;
}else{
  ctx.lineWidth--;
}
}

canvas.addEventListener('mousedown', (e) => {
isDrawing = true;
if( ctx.lineWidth > 1) ctx.lineWidth = 1; // 讓每次開始都從1開始
[lastX, lastY] = [e.offsetX, e.offsetY]; //點下時決定原點
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', (e) => isDrawing = false );
canvas.addEventListener('mouseout', (e) => isDrawing = false );
```



### HSL測試
HSL：色相(Hue)、飽和度(Saturation)、亮度(Lightness)
https://mothereffinghsl.com/


