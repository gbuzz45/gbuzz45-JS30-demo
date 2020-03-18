# JS30#03 Update CSS Variables with JS
⌚️Sun, Mar 19, 2020 

[DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/05_FlexboxGallery/index.html)

## CSS
- 先水平排列後垂直排列
此例用父子層皆`display:flex`的做法
寬度用`flex:比例`來變化<br>

| 外容器 | 水平排列父層 | 垂直排列子層 | .open子層 |
|---|---|---|---|
| display:flex | display: flex;<br>justify-content: center;<br>align-items: center;<br>flex-direction: column;<br>flex: 1; | display: flex;<br>flex-grow: 1;<br>flex-shrink: 0;<br>flex-basis: auto;<br>justify-content: center;<br>align-items: center; | flex: 5; |

- transition可以列flex<br>
- 看一些資料發現可能寫`min-height: 100vh`而非`height: 100vh`是為了safari也正常瀏覽<br>
<br>

## Javascript
1. 函式一：展開切換樣式<br>
2. 事件一（click)：點擊呼叫函式1<br>
3. 函式二：判斷指定項目的動畫結束，垂直文字展示切換樣式`transitionend`,`e.propertyName` <br>
4. 事件二（transitionend):點擊呼叫函式2<br>

```javascript=
const panels = document.querySelectorAll('.panel');
function toggleOpen(){
  this.classList.toggle('open');
  // 增加移除鄰層
  for (let sibling of this.parentNode.children) {
    if (sibling !== this) sibling.classList.remove('open');
  }
}

function toggleActive(e){
  //console.log(e.propertyName);
  // 為避免瀏覽器支援問題，與其寫e.propertyName === 'flex' 或 === e.propertyName'flex-grow'，乾脆判斷文字有包含'flex'的項目
  if(e.propertyName.includes('flex')){
    this.classList.toggle('open-active');
  }
}
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
```

## 資源
![](https://i.imgur.com/Kf6jPc9.png)<br>
1. 學習Flexboxの優良蛙：https://flexboxfroggy.com/ ｜24關解答 [URL](https://gist.github.com/lukasrudnik/c72cafebd0db5bae4aa5563b24e73fd2)<br>
2. WebBos的課程：https://flexbox.io/<br>