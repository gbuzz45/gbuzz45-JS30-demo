# JS30#14 JavaScript References VS Copying
2020/8/1

[DEMO](https://gbuzz45.github.io/gbuzz45-JS30-demo/14_JavaScriptReferencesVSCopying/)

傳值（複製）與傳址（指向）的差別

## 原始型別：strings, numbers, booleans
直接`=`賦值，兩變數獨立
```javascript
let age = 100;
let age2 = age;
age = 200; // age = 200, age2 = 100

let name= 'Wes';
let name2 = name;
name = 'Mika'; // age = 'Wes', age2 = 'Mika'

```

## 物件型別：Array
用在物件型別上`=`只是傳址
```javascript
const players = ['1st', '2nd', '3rd', '4th'];
const team = players;
team[0] = 'CHANGEVALUE';

// players = ["CHANGEVALUE", "2nd", "3rd", "4th"]
// team    = ["CHANGEVALUE", "2nd", "3rd", "4th"]
```

如何真的複製？
#### 法1：slice
```javascript
const team2 = players.slice();
```

#### 法2：concat
```javascript
const team3 = [].concat(players);
```

#### 法3：ES6 spread
```javascript
const team4 = [...players];
```

#### 法4：Array.from() 
```javascript
const team5 = Array.from(players);
```

## 物件型別：Object

如何真的複製？
#### 法1：Object.assign
```javascript
const captain2 = Object.assign({}, person, {number:90});
```

#### 法2：ES6 spread
```javascript
const captain3 = {...person};
```

不過上述兩種方法只複製一層，所以會發生如下狀況

```javascript
//兩層的物件
const day = {
  date: '2020/03/21',
  weather: 'cloudy',
  order: 1,
  unit:{
    hours: 24,
    mins: 24*60,
    seconds: 24*60*60,
  }
}
const day2 = Object.assign({}, day);

// 改動第1層，原來的不變
day2.order = 1000; 
//day = {date: "2020/03/21", weather: "cloudy", order: 1, unit: {…}}
//day2 = {date: "2020/03/21", weather: "cloudy", order: 1000, unit: {…}}

// 改動第2層，原來的同樣被改變
day2.unit.hours = 72;
// day = {hours: 72, mins: 1440, seconds: 86400}
// day2 = {hours: 72, mins: 1440, seconds: 86400}

```

#### 法3：需要 Deep Clone 小技巧使用`JSON.stringify()`與`JSON.parse()`
其他格式如Array也可以使用
```javascript
const day3 = JSON.parse(JSON.stringify(day));


// 改動第2層，原來的也不會被改變，兩變數完全獨立
day2.unit.hours = 72;
// day = {hours: 24, mins: 1440, seconds: 86400}
// day2 = {hours: 72, mins: 1440, seconds: 86400}

```

