# JS30#12 Key Sequence Detection
2020/5/25

[DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/12_KeySequenceDetection/)

![](https://i.imgur.com/9Wh05Sr.png)

## 目的
鍵盤輸入連續指定內容即呼叫方法


## 程式碼
1. 輸入的內容為一新的陣列
2. 保持輸入陣列的最大長度與指定內容的最大長度一致
3. 轉字串比較，相同則呼叫方法

```javascript

const pressed = [];
const secretCode = [38,38,40,40,37,37,39,39,66,65];

window.addEventListener('keyup', (e) => {
  // e.key : [a] = a
  // e.keyCode : [a] = 65
  pressed.push(e.keyCode);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  // 由前頭刪除輸入的數量。目的是保持符合secretCode的長度。

  // 假如比較值是個陣列，則先用join()讓陣列合併連接詞回傳一組字串再做比較
  if(pressed.join('').includes(secretCode.join(''))){
    console.log('Ding Ding!');
    cornify_add();
  }
  console.log(pressed);
});

```
