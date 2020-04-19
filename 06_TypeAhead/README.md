# JS30#06 Type Ahead with Fetch
2020/4/19

[DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/06_TypeAhead/)


## 練習目標：自動完成 (Autocomplete)功能
輸入城市或州名，列出符合的結果

<br>

## 一、整理資料
- [fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)，（IE不支援），`fetch()` 回傳 `promise` 物件
- [then()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

#### 1.將資料變成可用的物件
```javascript
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => console.log(data));
```
#### 2.將結果放進變數
- `const` 不能被重新指定值，但如果原賦值為空陣列，可以往陣列中放東西
- 利用`...`展開運算符(Spread Operator)解群組，這樣放進cities的結果就不是會單是一個陣列，而是我們要的資料總數量

```javascript
const cities = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));
```

## 二、方法（篩選/展示）
- [match()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/match) 搭配正規表達式
- RegExp Object
- join() 合併成一個字串傳回
- replace() 比對後傳回一個將符合條件改變後合成的新字串


### 篩選
```javascript
// RegExp Object 'g'意謂全部的範圍global，'i'意謂不分大小寫case-insensitive
function findMatches(wordToMatch, cities){
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex);
  });
} 
```

### 展示
#### 1.確認有連動事件
```javascript
function displayMatches(){
  const matchArray = findMatches(this.value, cities);
}
```
#### 2.調整要展示的內容/html
```javascript
function displayMatches(){
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    return `
      <li>
        <span class="name">${place.city}, ${place.state}</span>
        <span class="population">${place.population}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
```
#### 2.調整高亮樣式
```javascript
function displayMatches(){
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regexHighLight = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regexHighLight, `<span class="hl">${this.value}</span>`)
    const stateName = place.state.replace(regexHighLight, `<span class="hl">${this.value}</span>`)
    return `
      <li>
        <span class="name">${cityName},${stateName}</span>
        <span class="population">${place.population}</span>
      </li>
    `;
  }).sort().join('');
  suggestions.innerHTML = html;
}
```
#### 3.改變數值格式 千位符
```javascript
function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regexHighLight = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regexHighLight, `<span class="hl">${this.value}</span>`)
    const stateName = place.state.replace(regexHighLight, `<span class="hl">${this.value}</span>`)
    return `
      <li>
        <span class="name">${cityName},${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).sort().join('');
  suggestions.innerHTML = html;
}
```

<br><br>
## 三、事件（鍵盤事件/欄位改值）
```javascript
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
```

<br><br>
#### 資料
- [以XMLHttpRequest實作範例](https://ithelp.ithome.com.tw/articles/10203753)，支援度較高
- [Axios library](https://github.com/axios/axios)：Axios is a Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser that also supports the ES6 Promise API
- 資料來源的變數命名為 [endpoint](https://www.freecodecamp.org/forum/t/what-is-the-meaning-of-endpoints-in-javascript/231369/2) 好像也有一番道理在
- 測試獲取回應時的變數命名 [blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Body/blob) 也有一點淵源在
- [展開運算符(Spread Operator)與其餘運算符(Rest Operator)](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/rest_spread.html)
