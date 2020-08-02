# JS30#15 LocalStorage & Event Delegation
2020/8/2

[DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/15_LocalStorage/)

## 目標
學習使用LocalStorage與事件委派
新增清單並儲存資料與狀態在本機
重整瀏覧器列出記錄直到記錄被刪除

<br>

## 步驟1. 輸入文字 送出表單 展示輸入內容

### 確認好觸發的事件與回呼的函式
表單有預設方法[submit](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLFormElement)
```javascript
addItems.addEventListener('submit', addItem);
```
### 儲存輸入內容
```javascript
function addItem(e){
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const item = {
    text, // text: text
    done: false,
  }
  items.push(item); // 存進陣列
  populateItem(items, itemsList); // 展示的函式 將"itemsList"放進"item"
  this.reset(); // 原輸入移除
}
```
### 展示儲存的內容
- 透過透過`map()`與`join()`改寫清單中的全部內容，因為是整個內容重寫，如果這個動作是「極頻繁」執行，改寫HTML的範圍大小會影響效能
- `data-index`是為了之後事件委派的處理而加
- 另外需注意是否選取的狀態`checked`就是有與無這屬性的差別，就算是`checked='false'`也一樣是有選取
```javascript
function populateItem(things = [], thingsList){
  thingsList.innerHTML = things.map((thing,i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${thing.done ? 'checked' : ''}>
        <label for="item${i}">${thing.text}</label>
      </li>
    `;
  }).join('');
}
```
<br>

## 步驟2. LocalStorage
1.在`addItem`函式中增加`localStorage`
且為讓資料易取易讀所以使用`JSON.stringify`將陣列轉成JSON字串
```javascript
localStorage.setItem('items', JSON.stringify(items));
```
| 無使用`JSON.stringify` | 使用`JSON.stringify` |
| -------- | -------- |
| ![](https://i.imgur.com/AoU2sQo.png) | ![](https://i.imgur.com/jSiTLRB.png)|
<br>

2.一開始定義的儲存變數要改為先看看有沒有記錄，無記錄就空陣列
但資料要用`JSON.parse`返回成陣列的物件型態
```javascript
const items = JSON.parse(localStorage.getItem('items')) || []; 
```
<br>

3.頁面載入時就執行一次展示函式`populateItem`
看有無記錄需要展示
```javascript
populateItem(items, itemsList);
```
<br>

- LocalStorage基本方法`.key()`，`.getItem()`，`.setItem()`，`.removeItem()`，`.clear()`
- LocalStorage[儲存限制](https://web.dev/storage-for-the-web/#how-much)

<br>

## 步驟3. 處理選取的狀態
此為學習事件委派
通常直覺是使用這種作法改變選取狀態：
```javascript
const checkBoxes = document.querySelectorAll('input');
checkBoxes.forEach(checkBox => checkBox.addEventListener('click', () =>
    change checked...
);
```
但會發現展示與點擊的順序一旦異動
會發生選取不到的情況

所以針對透過JS動態產生的DOM所下的互動
可用事件委派的方式進行

此例的概念就是點擊要綁在「載入時就已存在的」`ItemsList`清單上
不管他子孫層的東西是不是「未來才會存在」
只要點擊的對象符合條件就執行動作
```javascript
itemsList.addEventListener('click', toggleDone);
```
```javascript
function toggleDone(e){
  if(!e.target.matches('input')) return; // 當點擊對象是input才作用
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateItem(items, itemsList);
}
```
