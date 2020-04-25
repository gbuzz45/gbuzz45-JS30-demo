# JS30#07 JS_Array_2
2020/4/25

[DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/07_js_array_2/)


### 準備
```javascript
const people = [
  { name: 'Wes', year: 1988 },
...]
const comments = [
    { text: 'Love this!', id: 523423 },
...]
```
<br>

## 1. 是否有成年者

some()方法 檢查是否至少有一個符合條件<br>

```javascript
// const isAdult = people.some(function(person){
//   const currentYear = (new Date()).getFullYear();
//   if(currentYear - person.year >= 19){
//     return true;
//   }
// });

const isAdult = people.some(person => ((new Date().getFullYear() - person.year) >= 19));
console.log({isAdult)}; 
```
用大括號將內容括起來的方式，好像是為了返回一個物件字面值表示法(如下圖)<br>
![](https://i.imgur.com/UAccwR4.png)<br><br>


#### 箭頭函式三種基本用法
1. `(參數1, 參數2, …, 參數N) => { 陳述式; } `<br>
2. `(參數1, 參數2, …, 參數N) => 表示式;`<br>
等同`(參數1, 參數2, …, 參數N) => { return 表示式; }`<br>
**此例用了省略了return的這種寫法**<br>
3. 只有一個參數時,括號能省略:<br>
`(單一參數) => { 陳述式; }`<br>
`單一參數 => { 陳述式; }`<br>
若無參數，就一定要加括號:<br>
`() => { statements }`<br>

<br>

## 2. 是否全部都是成年者

every()方法 檢查是否全部皆符合條件<br>

```javascript
const allAdults = people.every(person => ((new Date().getFullYear() - person.year) >= 19));
console.log(allAdults);
```
<br>

## 3. 找出id是823423的留言

概念類似filter，不過find()方法只回傳第一個符合函式的元素值。否則回傳 undefined<br>
ID通常不會重複，感覺是因為這樣所以適用find()<br>

```javascript
const allAdults = people.every(person => ((new Date().getFullYear() - person.year) >= 19));
console.log(allAdults);
```
<br>

## 4. 找出id是823423的留言並刪除

- findIndex()方法 找出符合的index
- splice()方法刪除/加入新元素來改變陣列的內容
- slice()方法會回傳一個新陣列，為原陣列選擇之 begin至end（不含 end）部分的淺拷貝（shallow copy）。而原本的陣列將不會被修改。
<br>

```javascript
const index = comments.findIndex(comment => comment.id === 823423);
console.log(index);
// 法一:直接splice會改變原陣列內容 
// comments.splice(index, 1);

// 法二:組出新陣列的方式(記得解群組):    
const newComments = [
  ...comments.slice(0, index),
  ...comments.slice(index+1)
];
console.table(newComments);
```

<br>

#### 參考
- [陳述式&表達式](https://medium.com/@Epicure1709/js%E5%87%BD%E5%BC%8F%E7%9A%84%E9%99%B3%E8%BF%B0%E5%BC%8F-%E8%A1%A8%E9%81%94%E5%BC%8F%E5%92%8Ciife-15eb4c0a5b80)
- [一般函式與箭頭函式的差異？](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-10-js-%E4%B8%80%E8%88%AC%E5%87%BD%E5%BC%8F%E8%88%87%E7%AE%AD%E9%A0%AD%E5%87%BD%E5%BC%8F%E7%9A%84%E5%B7%AE%E7%95%B0-32ce9455ff1a)



