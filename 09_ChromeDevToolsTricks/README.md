# JS30#09 Chrome DevTools Tricks
2020/5/6

[DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/09_ChromeDevToolsTricks/)

### 1. 觸發斷點
想知道程式碼哪裡改變
-> 檢查元素 -> 在程式碼中對dom右鍵`break `:`Attribute modifications`
這樣就會在屬性改變時暫停後續動作
> - 樹狀修改 subtree modifications: 如果元素或其任何子元素被修改，則觸發斷點
> - 屬性修改 Attribute modifications: 當元素的屬性改變時觸發斷點
> - 節點刪除 Node removal: 從文檔中刪除元素時觸發
<br>


### 2. Regular
```javascript
console.log('hello');
```

### 3. Interpolated
%s 帶入變數
```javascript
console.log('Hello I am a %s string!', 'shit');
```

### 4. Styled
%c 樣式
```javascript
console.log('%c I am some great text', 'font-size: 50px; background: hotpink; color: #fff;')
```
![](https://i.imgur.com/afco88M.png)


### 5. warning!
```javascript
console.warn('OH NOO');
```
![](https://i.imgur.com/BF5R8jH.png)

### 6. Error
```javascript
console.error('Shit!');
```
![](https://i.imgur.com/oLHgdKt.png)



### 7. Info
Firefox才會有特殊小圖示
```javascript
console.info('Crocodiles eat 3-4 people per year');
```
![](https://i.imgur.com/bY8PcPq.png)


### 8. Testing
條件，當`false`時出現自訂回應
```javascript
console.assert(1 === 1, 'You did not select the right Element!');
const p = document.querySelector('p');
console.assert(p.classList.contains('ouch'), 'You did not select the right Element!');
```
![](https://i.imgur.com/QpLvku9.png)


### 9. clearing
清除
```javascript
console.clear();
```

### 10. Viewing DOM Elements
```javascript
console.log(p);
console.dir(p);
```
![](https://i.imgur.com/xQPjTsC.png)


### 11. Grouping together
群組標籤化(利用在迴圈中)
```javascript
// 尚未群組
dogs.forEach(dog => {
console.log(`This is ${dog.name}`);
console.log(`This ${dog.name} is ${dog.age*7} years old`);
});

// 群組(預設展開)
dogs.forEach(dog => {
console.group(`${dog.name}`);
console.log(`This is ${dog.name}`);
console.log(`This ${dog.name} is ${dog.age*7} years old`);
console.groupEnd(`${dog.name}`);
});

dogs.forEach(dog => {
// 使其預設關閉
console.groupCollapsed(`${dog.name}`);
console.log(`This is ${dog.name}`);
console.log(`This ${dog.name} is ${dog.age*7} years old`);
console.groupEnd(`${dog.name}`);
});
```
![](https://i.imgur.com/Zc9CUEg.png)



### 12. counting
執行次數
```javascript
console.count('wes');
console.count('wes');
console.count('wes');
console.count('Steve');
console.count('Steve');
console.count('wes');
console.count('Steve');
console.count('wes');
console.count('wes');
```
![](https://i.imgur.com/3FwYmU1.png)


### 13. timing
此例應用在發出請求得到回應的時間
```javascript
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
.then(data => data.json())
.then(data => {
console.timeEnd('fetching data');
console.log(data);
});
```
![](https://i.imgur.com/TnJBjaA.png)



### 14. table
表格化
```javascript
console.table(dogs);
```
<br>
