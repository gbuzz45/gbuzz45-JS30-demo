# JS30#10 Hold Shift Check Multiple Checkboxes
2020/5/18

[DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/10_HoldShiftCheckMultipleCheckboxes/)


### 練習目的
shift連勾選

### 程式碼
```javascript
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  let lastChecked;

  function handleCheck(e){
    let inBetween = false; // 設定狀態
    if(e.shiftKey && this.checked){ //該處的this為click事件的對象
      checkboxes.forEach(checkbox => {
        if(checkbox === this || checkbox === lastChecked ){
          inBetween = !inBetween; // 改變狀態
        }
        if(inBetween){ // 狀態符合才執行
          checkbox.checked = true;
        }
      });
    }
    lastChecked = this;
  }


  // 因為是selectorAll所以ForEach執行
  checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));

```
### 紀錄
- 使用`label`包住`input`的話，`label`需另外新增避免選取文字的樣式
```css
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Safari */
    -khtml-user-select: none;    /* Konqueror HTML */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;   
```

- 好像通常都是「連選+單個取消」；「連選+連取消」的情況經嘗試發現會有邏輯正確但操作混淆的問題，
所以才會寫成
`if(e.shiftKey && this.checked)`
第一個點擊對象的狀態是選取時才執行連選動作<br><br>
- 這作法就算區塊分很遠也可以連選，取決於作用對象怎麼選擇，但"依序"執行

