import { send } from "../utilities";

let wordsTable = document.querySelector("#wordsTable") as HTMLTableElement;
let wordInput = document.querySelector("#wordInput") as HTMLInputElement;
let addWordButton = document.querySelector("#addWordButton") as HTMLButtonElement;

addWordButton.onclick = async function() {
  await send("addWord", wordInput.value);

  getWords();
}

let getWords = async function() {
  let words = await send("getWords", null) as string[];

  wordInput.value = "";
  wordsTable.innerHTML = "";

  drawHeadings();

  for (let i = 0; i < words.length; i++) {
    drawWordProperties(words[i]);
  }
}

let drawHeadings = function() {
  let wordTh = document.createElement("th");
  wordTh.innerText = "Word";
  wordsTable.appendChild(wordTh);

  let backwordsTh = document.createElement("th");
  backwordsTh.innerText = "Reversed";
  wordsTable.appendChild(backwordsTh);

  let isPalindromeTh = document.createElement("th");
  isPalindromeTh.innerText = "Is Palindrome";
  wordsTable.appendChild(isPalindromeTh);

  let lengthTh = document.createElement("th");
  lengthTh.innerText = "Length";
  wordsTable.appendChild(lengthTh);
}

function drawWordProperties(word: string) {
  let tr = document.createElement("tr");
  wordsTable.appendChild(tr);

  let wordTd = document.createElement("td");
  wordTd.innerText = word;
  tr.appendChild(wordTd);

  let reverseTd = document.createElement("td");
  reverseTd.innerText = reverseWord(word);
  tr.appendChild(reverseTd);

  let isPalindromeTd = document.createElement("td");
  isPalindromeTd.innerText = String(isPalindrome(word));
  tr.appendChild(isPalindromeTd);

  let lengthTd = document.createElement("td");
  lengthTd.innerText = String(word.length);
  tr.appendChild(lengthTd);
}

let reverseWord = function(word: string) {
  let reversed = "";

  for (let i = word.length - 1; i >= 0; i--) {
    reversed += word[i];
  }

  return reversed;
}

let isPalindrome = function(word: string) {
  for (let i = 0; i < word.length / 2; i++) {
    if (word[i] != word[word.length - 1 -i]) {
      return false;
    }
  }

  return true;
}

getWords();