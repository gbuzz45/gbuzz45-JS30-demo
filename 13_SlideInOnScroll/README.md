# JS30#13 Slide In on Scroll
2020/7/29

[DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/13_SlideInOnScroll/)


## 目的
滾動出現圖片


## 程式碼

滾動事件：每張圖各自去算與捲軸位置的關係

出現的條件：<br>
![](https://i.imgur.com/ZNPUBGY.png)

（如果要超過不要消失就拿掉not_past判斷）

```javascript
const slideElems = document.querySelectorAll('.slide-in');

window.addEventListener('scroll', debounce(scrollShowElems));

function scrollShowElems(e){
  slideElems.forEach(function( slideElem ){
    const scroll_at = (window.scrollY + window.innerHeight) - slideElem.height / 2;
    const elem_bottom = slideElem.offsetTop +slideElem.height;
    const is_at = scroll_at > slideElem.offsetTop;
    const not_past = window.scrollY < elem_bottom;
    if(is_at && not_past){
      slideElem.classList.add('active');
    }else{
      slideElem.classList.remove('active');
    }
  });
}
```

### 優化效能的debounce
網路文章：https://mropengate.blogspot.com/2017/12/dom-debounce-throttle.html
```javascript
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
```
