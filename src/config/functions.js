import words3 from '../data/3letter.js';
import words4 from '../data/4letter.js';
import words5 from '../data/5letter.js';
import words6 from '../data/6letter.js';
import words7 from '../data/7letter.js';
import words8 from '../data/8letter.js';
import words9 from '../data/9letter.js';
import words10 from '../data/10letter.js';
const defaultChar = '.';

export function getColor(){//https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript
  return "hsl(" + Math.floor(360 * Math.random()) + ',' +//hue
             Math.floor(70 + 10 * Math.random()) + '%,' +//saturation
             Math.floor(35 + 20 * Math.random()) + '%)'//lightness
}

export function getDarkColor(){
  return "hsl(" + Math.floor(360 * Math.random()) + ',' +//hue
             100 + '%,' +//saturation
             Math.floor(15 + 10 * Math.random()) + '%)'//lightness
}

export function generateArray(size) {
  let array;
  let truncArray;
  let wordCollection = [];
  let goodGameArray = false;
  let initialWordLength;
  const numLetters = (size * 6) + 2;
  const maxWidth = size === 3?9:11;

  while(!goodGameArray){
    const arraySize = 40;
    switch(size){
      case 2:
        initialWordLength = getRandomInteger(4, 6);
        break;
      case 3:
        initialWordLength = getRandomInteger(4, 7);
        break;
      case 4:
        initialWordLength = getRandomInteger(5, 8);
        break;
      default:
        initialWordLength = getRandomInteger(5, 9);
    }
    let excludedX = [];
    let excludedY = [];
    let isHorizontal;
    let currentWord = "";
    let letterCountdown = numLetters;
    let xIndex = 0;
    let yIndex = 0;
    wordCollection.length = 0;
    const getRandomWordArray = (length) => {
      let wordArray;
      switch (length) {
        case 4:
          wordArray = words4;
          break;
        case 5:
          wordArray = words5;
          break;
        case 6:
          wordArray = words6;
          break;
        case 7:
          wordArray = words7;
          break;
        case 8:
          wordArray = words8;
          break;
        case 9:
          wordArray = words9;
          break;
        case 10:
          wordArray = words10;
          break;
        default:
          wordArray = words3;
      }
      return wordArray;
    }
    const getRandomWord = (arr) => {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }
    // eslint-disable-next-line
    const placeInitialWord = (arraySent, word) => {
      let arr = arraySent;
      xIndex = getRandomInteger(12, 14);
      yIndex = getRandomInteger(12, 14);
      excludedX.push(xIndex);
      excludedY.push(yIndex);

      for (let i = 0; i < word.length; i++) {
        if (isHorizontal) {
            arr[xIndex][yIndex + i] = word[i];
        } else {
            arr[xIndex + i][yIndex] = word[i];
        }
      }
      currentWord = word;
      letterCountdown -= initialWordLength;
      isHorizontal = !isHorizontal;
      return arr;
    }
    // eslint-disable-next-line no-loop-func
    const placeWord = (arraySent, numLetters) => {
      let arr = arraySent;
      let placed = false;
      let wordToPlace = "";
      let len = 0;
      let newXIndex = 0;
      let newYIndex = 0;
      let counter = 0;

      while(!placed){
        len = numLetters === 0? getRandomInteger(4, 7):numLetters;

        if(isHorizontal){
          newXIndex = getRandomIntExclusive(xIndex, xIndex + currentWord.length - 1, excludedX);
          if(yIndex - len >= -1){
            newYIndex = getRandomIntExclusive(yIndex - len + 1, yIndex, excludedY);
          }else{
            newYIndex = getRandomIntExclusive(0, yIndex, excludedY);
          }
        }else{
          newYIndex = getRandomIntExclusive(yIndex, yIndex + currentWord.length - 1, excludedY);
          if(xIndex - len >= -1){
            newXIndex = getRandomIntExclusive(xIndex - len + 1, xIndex, excludedX);
          }else{
            newXIndex = getRandomIntExclusive(0, xIndex, excludedX);
          }
        }

        const allWords = getRandomWordArray(len);
        const words = [];

        // eslint-disable-next-line no-loop-func
        allWords.forEach((checkThisWord) => {
          if(isHorizontal){
            if(checkThisWord.charAt(yIndex - newYIndex) === currentWord.charAt(newXIndex - xIndex)){
              words.push(checkThisWord);
            }
          }else{
            if(checkThisWord.charAt(xIndex - newXIndex) === currentWord.charAt(newYIndex - yIndex)){
              words.push(checkThisWord);
            }
          }
        })
        counter++;
        if(words.length > 0 || counter > 100){
          if(counter > 100){
            return false;
          }
          
          placed = true;
          wordToPlace = getRandomWord(words);
        }
      }

      for (let i = 0; i < wordToPlace.length; i++) {
        if (isHorizontal) {
            arr[newXIndex][newYIndex + i] = wordToPlace[i];
        } else {
            arr[newXIndex + i][newYIndex] = wordToPlace[i];
        }
      }
      letterCountdown = letterCountdown - (len - 1);

      currentWord = wordToPlace;
      wordCollection.push(wordToPlace);
      isHorizontal = !isHorizontal;
      excludedX.push(newXIndex);
      excludedY.push(newYIndex);

      xIndex = newXIndex;
      yIndex = newYIndex;
      return arr;
    }

    // Create the array of arrays filled with defaultChar
    array = Array.from({ length: arraySize }, () =>
      Array.from({ length: arraySize }, () => defaultChar)
    );
  
    const initialWordArr = getRandomWordArray(initialWordLength);
    const initialWord = getRandomWord(initialWordArr);
    wordCollection.push(initialWord);
    isHorizontal = getHorizontalOrVertical();

    array = placeInitialWord(array, initialWord);

    while(letterCountdown > 8){
      array = placeWord(array, 0);
    }

    array = placeWord(array, letterCountdown + 1);
    if(!array)continue;

    truncArray = truncateArray(array, defaultChar);
    const tooTallOrWide = truncArray.length > 8 || truncArray[0].length > maxWidth?true:false;
    const hasAdjacentHorizontalWords = checkArrayForAdjacentWords(array, defaultChar);
    const hasAdjacentVerticalWords = checkVerticalsForAdjacentWords(array, defaultChar);
    const containsNoRepeats = checkUniqueStrings(wordCollection);
    const concatenatedHorizontal = concatStringArrays(array);
    const concatenatedVertical = concatStringArrays(transposeArray(array));
    const horWords = splitAndFilterStrings(concatenatedHorizontal, defaultChar);
    const vertWords = splitAndFilterStrings(concatenatedVertical, defaultChar);
    const allWordsFromSplits = horWords.concat(vertWords);
    const containSameWords = arraysHaveSameElements(allWordsFromSplits, wordCollection);
    const totalCharacters = countNonDefaultElements(array, defaultChar);

    if(!tooTallOrWide && !hasAdjacentHorizontalWords && !hasAdjacentVerticalWords && containsNoRepeats && containSameWords && (totalCharacters === numLetters))goodGameArray = true;
  }
  return [truncArray, wordCollection];
}

function getHorizontalOrVertical(){
  return Math.random() < 0.5;
}

function checkAdjacentElements(arr, def) {
  for (let i = 0; i < arr.length - 1; i++) {
    let current = arr[i];
    let next = arr[i + 1];
    if (current !== def && next !== def) {
      return true;
    }
  }
  return false;
}

function checkVerticalsForAdjacentWords(arr, def){
  return checkArrayForAdjacentWords(transposeArray(arr), def)
}

function checkArrayForAdjacentWords(arr, def){
  let checkArray = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const contains = checkAdjacentElements(arr[i], def);
    checkArray.push(contains);
  }
  return checkAdjacentElements(checkArray, false);
}

export function transposeArray(array) {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

function checkUniqueStrings(array) {
  let uniqueSize = new Set(array).size;
  let arraySize = array.length;
  return uniqueSize === arraySize;
}

export function concatStringArrays(array) {
  return array.map(subarray => subarray.join(""));
}

export function splitAndFilterStrings(arr, splitStr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const substrings = arr[i].split(splitStr);
    for (let j = 0; j < substrings.length; j++) {
      if (substrings[j] !== splitStr && substrings[j].length > 1) {
        result.push(substrings[j]);
      }
    }
  }
  return result;
}

export function splitAndFilterWithIndex(arr, splitStr, horizontal) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    const substrings = arr[i].split(splitStr);
    let startIndex = 0;

    for (let j = 0; j < substrings.length; j++) {
      if (substrings[j] !== splitStr && substrings[j].length > 1) {
        const posArray = horizontal?[startIndex, i]:[i, startIndex];
        const substringWithIndex = [substrings[j], posArray, horizontal];
        result.push(substringWithIndex);
      }

      startIndex += substrings[j].length + splitStr.length;
    }
  }

  return result;
}


export function arraysHaveSameElements(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }
  return true;
}

function countNonDefaultElements(arr, def) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] !== def) {
        count++;
      }
    }
  }
  return count;
}

function truncateArray(arr, def) {
  // Remove arrays containing only default characters
  const filteredArr = arr.filter(subArr => !subArr.every(element => element === def));

  if (filteredArr.length === 0) {
    return [];
  }

  // Find the lowest and highest index of non-default characters
  let lowestIndex = Infinity;
  let highestIndex = -Infinity;

  for (let i = 0; i < filteredArr.length; i++) {
    for (let j = 0; j < filteredArr[i].length; j++) {
      if (filteredArr[i][j] !== def) {
        lowestIndex = Math.min(lowestIndex, j);
        highestIndex = Math.max(highestIndex, j);
      }
    }
  }

  // Remove elements less than the lowest index and greater than the highest index
  const transformedArr = filteredArr.map(subArr =>
    subArr.slice(lowestIndex, highestIndex + 1)
  );
  return transformedArr;
}

function getRandomInteger(min, max) {//inclusive of both min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntExclusive(min, max, excludeArray) {
  const range = max - min + 1;
  const excludedSet = new Set(excludeArray);
  let count = 0;

  let randomNum = Math.floor(Math.random() * range) + min;
  
  while (count < 1000 && excludedSet.has(randomNum)) {
    randomNum = Math.floor(Math.random() * range) + min;
    count++;
  }
  
  return randomNum;
}

export function checkDuplicates(arr) {
  const flattened = arr.flat(Infinity);
  const unique = new Set(flattened.map(JSON.stringify));
  return flattened.length !== unique.size;
}

function checkArrayInArray(arr, farr){
  if(JSON.stringify(arr).includes(JSON.stringify(farr))) return true;
  return false;
}

export function getFragments(arr, char, size){
  let isValidFragmentSet = false;
  let fragArray = [[],[]];
  let outerCount = 0;
    while(!isValidFragmentSet){
      outerCount++;
    let coords = [];
    let horiz = getHorizontalOrVertical();
    for(let p = 0;p < arr.length;p++){//get all coordinates
      for(let q = 0;q < arr[p].length;q++){
        if(arr[p][q] !== char)coords.push([q, p]);
      }
    }
    let count = 0;
    let ccount = 0;
    for(let r = 0;r < size;r++){//get "size" sets of 3
      let validSetOfThree = false;
      while(count < 100 && !validSetOfThree){
        count++;
        const randPoint = coords[getRandomInteger(0, (coords.length - 1))];
        const nextPoint1 = horiz?[randPoint[0] + 1, randPoint[1]]:[randPoint[0], randPoint[1] + 1];
        const np1Found = checkArrayInArray(coords, nextPoint1);
        const nextNextPoint1 = horiz?[randPoint[0] + 2, randPoint[1]]:[randPoint[0], randPoint[1] + 2];
        const nnp1Found = checkArrayInArray(coords, nextNextPoint1);
        const nextPoint2 = horiz?[randPoint[0], randPoint[1] + 1]:[randPoint[0] + 1, randPoint[1]];
        const np2Found = checkArrayInArray(coords, nextPoint2);
        const nextNextPoint2 = horiz?[randPoint[0], randPoint[1] + 2]:[randPoint[0] + 2, randPoint[1]];
        const nnp2Found = checkArrayInArray(coords, nextNextPoint2);

        if(np1Found && nnp1Found){
          coords = removePointFromArray(coords, randPoint);
          coords = removePointFromArray(coords, nextPoint1);
          coords = removePointFromArray(coords, nextNextPoint1);
          fragArray[0].push([randPoint, nextPoint1, nextNextPoint1]);
          validSetOfThree = true;
        }else if(np2Found && nnp2Found){
          coords = removePointFromArray(coords, randPoint);
          coords = removePointFromArray(coords, nextPoint2);
          coords = removePointFromArray(coords, nextNextPoint2);
          fragArray[0].push([randPoint, nextPoint2, nextNextPoint2]);
          validSetOfThree = true;
        }
      }
    }
    for(let s = 0;s < size;s++){//get "size" sets of 2
      let validSetOfTwo = false;
      while(ccount < 100 && !validSetOfTwo){
        ccount++;
        const randPoint = coords[getRandomInteger(0, (coords.length - 1))];
        const nextPoint1 = horiz?[randPoint[0] + 1, randPoint[1]]:[randPoint[0], randPoint[1] + 1];
        const np1Found = checkArrayInArray(coords, nextPoint1);
        const nextPoint2 = horiz?[randPoint[0], randPoint[1] + 1]:[randPoint[0] + 1, randPoint[1]];
        const np2Found = checkArrayInArray(coords, nextPoint2);

        if(np1Found){
          coords = removePointFromArray(coords, randPoint);
          coords = removePointFromArray(coords, nextPoint1);
          fragArray[1].push([randPoint, nextPoint1]);
          validSetOfTwo = true;
        }else if(np2Found){
          coords = removePointFromArray(coords, randPoint);
          coords = removePointFromArray(coords, nextPoint2);
          fragArray[1].push([randPoint, nextPoint2]);
          validSetOfTwo = true;
        }
      }
    }
    let tooManyInARow = false;
    for(let q = 0;q < coords.length;q++){
      const nextHorizontalPoint = [coords[q][0] + 1, coords[q][1]];
      const nextVerticalPoint = [coords[q][0], coords[q][1] + 1];
      const prevHorizontalPoint = [coords[q][0] - 1, coords[q][1]];
      const prevVerticalPoint = [coords[q][0], coords[q][1] - 1];
      if(checkArrayInArray(coords, nextHorizontalPoint))tooManyInARow = true;
      if(checkArrayInArray(coords, prevHorizontalPoint))tooManyInARow = true;
      if(checkArrayInArray(coords, nextVerticalPoint))tooManyInARow = true;
      if(checkArrayInArray(coords, prevVerticalPoint))tooManyInARow = true;
      if(tooManyInARow)break;
    }

    if(!tooManyInARow){
      fragArray.push(coords);
    }else{
      fragArray.push([]);
    }
    
    if((fragArray[0].length === size && fragArray[1].length === size && fragArray[2].length === size + 2) || outerCount > 500){
      isValidFragmentSet = true;
    }else{
      fragArray = [[],[]];
    }
  }
  return fragArray;
}

function removePointFromArray(arr, point) {
  return arr.filter(subArr => !isEqual(subArr, point));
}

function isEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  return a === b;
}

export function removeLetters(gameArray, singles){
  let modArray = gameArray;

  for(let j = 0;j < modArray.length;j++){
    for(let k = 0;k < modArray[j].length;k++){
      if(modArray[j][k] === defaultChar)continue;
      const aSingle = checkArrayInArray(singles, [k, j]);
      if(!aSingle)modArray[j][k] = "*";
    }
  }
  return modArray;
}

export function getFragObj(arr, frags){
  let retArr = [];
  
  for(let j = 0;j < frags[0].length;j++){
    let subArray = [];
    let letterArray = [];
    for(let jj = 0;jj < frags[0][j].length;jj++){
      const letter = arr[frags[0][j][jj][1]][frags[0][j][jj][0]];
      letterArray.push(letter);
    }
    subArray.push("t|" + j);
    const zeroOrTwo = getRandomInteger(0, 1) * 2;
    subArray.push(zeroOrTwo === 0?letterArray:letterArray.reverse());
    subArray.push(zeroOrTwo);
    retArr.push(subArray);
  }
  
  for(let k = 0;k < frags[1].length;k++){
    let subArray = [];
    let letterArray = [];
    for(let kk = 0;kk < frags[1][k].length;kk++){
      const letter = arr[frags[1][k][kk][1]][frags[1][k][kk][0]];
      letterArray.push(letter);
    }
    subArray.push("d|" + k);
    const zeroOrTwo = getRandomInteger(0, 1) * 2;
    subArray.push(zeroOrTwo === 0?letterArray:letterArray.reverse());
    subArray.push(zeroOrTwo);
    retArr.push(subArray);
  }

  const retObj = retArr.map((element, index) => ({
    id: element[0],
    letters: element[1],
    flipState: element[2]
  }));
  return retObj;
}

export function extractNumbersFromString(inputString) {
  const regex = /\d+/g;
  const matches = inputString.match(regex);
  
  if (matches === null) {
    return [];
  }
  
  const numbers = matches.map(Number);
  return numbers;
}
