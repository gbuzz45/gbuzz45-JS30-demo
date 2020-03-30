# JS30#04 JavaScript Array - 1
⌚️Mon, Mar 30, 2020 

[DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/04_js_array_1/)



### 準備
```javascript=
const inventors = [
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
      ...]
```
處理array將會經常使用`return true;` <a href="https://stackoverflow.com/a/19166370/11767346" target="_blank">📄</a>
<br><br>
## 1. 篩選出西元1500年後出生的發明家
> 方法說明 <a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target="_blank">📄</a><br>
> var newArray = arr.filter(callback(element[, index[, array]]) [, thisArg])
<ol>
  <li>篩選 有點each+if...ese...的概念</li>
  <li>所代參數thisArg，有個不錯的說明: </li>
</ol>
  
參數thisArg說明(<a href="https://stackoverflow.com/a/38337957/11767346" target="_blank">來源📄</a>)
```javascript=
function myFilter(e) {
  return e === this.val;
}

var arr = [1, 1, 1, 2, 2];

console.log(arr.filter(myFilter, {val: 1}));
console.log(arr.filter(myFilter, {val: 2}));
```
#### Answer:
```javascript=
// 舊寫法
// const fifteen = inventors.filter(function(inventor){
//   if(inventor.year >= 1500 && inventor.year < 1600){
//     return true;
//   }
// });

// ES6
const fifteen = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);
console.table(fifteen);
```
> 有注意到原作者命名習慣，陣列或物件的初始變數用複數命名，代進函式的參數用單數命名
<br>


## 2. 列出發明家全名
> 方法說明 <a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map" target="_blank">📄</a><br>
> let new_array = arr.map(function callback( currentValue[, index[, array]]) {<br>
>     // return element for new_array<br>
> }[, thisArg])<br>
<br>
<ol>
  <li>map可以想成組裝工廠</li>
  <li>會產生新陣列，因此有些情況若不需要新陣列就不適用map，因不利效能</li>
  <li>模板語法</li>
</ol>

#### Answer:
```javascript=
const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
    console.log(fullNames);
```
<br>


## 3. 依年齡老至幼排序
> 方法說明 <a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" target="_blank">📄</a><br>
> arr.sort([compareFunction])
<br>
<ol>
  <li>sort排序原理？似乎不只是冒泡，看不懂先留<a href="https://medium.com/@leokao0726/%E6%B7%BA%E8%AB%87-js-sort-%E5%88%B0%E8%83%8C%E5%BE%8C%E6%8E%92%E5%BA%8F%E6%96%B9%E6%B3%95-1035f5b8cde8" target="_blank" title="淺談-js-sort-到背後排序方法">📄#1</a><a href="https://segmentfault.com/a/1190000009249758" target="_blank" title="Array.prototype.sort()方法到底是如何排序的？">📄#2</a></li>
  <li><a href="https://juejin.im/entry/59250db844d904006cefa11f" target="_blank">經典排序介紹📄</a></li>
  <li>善用三元運算式  `(比較) ? return 1 : retrun -1` </li>
</ol>

#### Answer:
```javascript=
// 舊寫法
// const ordered = inventors.sort(function(a, b){
//   if(a.year > b.year){
//     return 1;
//   }else{
//     return -1;
//   }
// });
 
// ES6
const ordered = inventors.sort((a,b) => a.year > b.year ? 1 : -1);
console.table(ordered);
```
<br>


## 4. 計算發明家共活幾年
> 方法說明 <a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" target="_blank">📄</a><br>
> arr.reduce(callback[accumulator, currentValue, currentIndex, array], initialValue)<br>
> }[, thisArg])<br>
<ol>
  <li>reduce就是在做化繁為簡的動作</li>
  <li>可以用來做加法/整理重複</li>
</ol>

#### Answer:
```javascript=
//這題目標的原理如下
// var totalYears = 0;
// for (var i = 0; i<inventors.length; i++){
//   totalYears += inventors[i].year
// }

const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0)
console.log(totalYears);
```
<br>


## 5. 依壽命長短排序
與之前的.srot相比用不同的比較方法<br>

#### Answer:
```javascript=
const oldest = inventors.sort(function(a, b){
    const lastGuy = a.passed - a.year;
    const nextGuy = b.passed - b.year;
    return lastGuy > nextGuy ? -1 : 1;
});
console.table(oldest);
```
<br>


## 6. 將網路內容篩選整理出來
<ol>
  <li>**爬蟲技術的基礎概念**</li>
  <li>2. NodeList使用.map會報錯，所以需轉換成array
  `VM764:1 Uncaught TypeError: links.map is not a function`
延伸說明：<a href="https://ithelp.ithome.com.tw/articles/10211876" target="_blank">NodeList與Array差異📄</a></li>
</ol>

#### Answer:
```javascript=
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
//將內容有'de'的項目組成新的陣列

const category = document.querySelector('.mw-category');
const links = [...category.querySelectorAll('a')];
// [...]的另一種方式 const links = Array.from(category.querySelectorAll('a'));
const de = links
              .map(link => link.textContent)
              .filter(streetName => streetName.includes('de'));
console.list(de); 
```
<br>


## 7. 依字母排序
<ol>
  <li>ES6 物件解構賦值 `let [a, , c] = [1, 2, 3];` <a href="https://pjchender.blogspot.com/2017/01/es6-object-destructuring.html" target="_blank">📄</a></li>
  <li> `.split` 將字串變陣列，通過搜索模式來完成劃分</li>
</ol>

#### Answer:
```javascript=
const alpha = people.sort((lastOne, nextOne) =>{
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
});
console.table(alpha);
```
<br>


## 8. 將重複的項目分別加總
這題好困難XD

#### Answer:
```javascript=
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
const transportation = data.reduce(function(obj, item){
  if(!obj[item]){
    obj[item]=0; //初始且具防呆功能
  }
  obj[item]++;
  return obj;
}, {});//讓obj初始是個{}
console.log(transportation);
```
<br>


