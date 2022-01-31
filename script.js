const number = ["0","1","2","3","4","5","6","7","8","9"];
const keyLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let healthPoints = 6, word, lettersFound;

function informUser() {
  document.getElementById('userInfo').innerHTML = "No spaces or numbers";
}

function restoreInfo() {
  document.getElementById('userInfo').innerHTML = "Insert Word to play";
}

function getInput() {
 let userWord = document.getElementById('userInput').value;
 document.getElementById('userInput').value = "";
 if (checkInput(userWord) == false) {
   informUser();
   setTimeout(restoreInfo,2000);
 } else {
   startGame(userWord);
 }
}

function checkInput(userWord) {
  if(userWord == "") {
    return false;
  } else {
    for (let i = 0; i < userWord.length; ++i) {
      if(userWord.charAt(i) == " ") {
        return false;
      }
      for(let j = 0; j < number.length; ++j) {
        if (userWord.charAt(i) == number[j]) {
          return false;
        }
      }
    }
  }
}

function startGame(userWord) {
  word =  transformInput(userWord);
  lettersFound = word.length;
  createGuess(word);
  showKeyboard();
  addHealthPoints();
 }

function transformInput(userWord) {
  return userWord.toUpperCase();
}

function createGuess(word) {
  document.getElementById('inputDiv').innerHTML = "";
  for (let i  = 0; i < word.length; ++i) {
    let lettersFromWord =  document.createElement("div");
     lettersFromWord.id = i;
     lettersFromWord.className = "letters";
     document.getElementById('guessDiv').append(lettersFromWord);
  }
}

function showKeyboard() {
  for (let i = 0; i < keyLetters.length; ++i) {
        let key = document.createElement("div");
        key.className = "keyBoards";
        key.innerHTML = keyLetters[i];
        document.getElementById('keyboardDiv').append(key);
  }
  document.querySelectorAll(".keyBoards").forEach(key => {key.addEventListener('click', checkGuess)});
}

function addHealthPoints() {
  for (let i = 0; i <= healthPoints; ++i) {
    let points = document.createElement('div');
        points.id = "points-icon" + i;
    document.getElementById('statusDiv').append(points);
  }
}

function removeHealthPoints(idPointToRemove) {
  let divToRemove = document.getElementById("points-icon" + idPointToRemove);
  divToRemove.remove();

}

function checkGuess(key) {
  let keyClicked = key.target;
  let valueKeyClicked = keyClicked.innerHTML;
  let indicator = false;
  for (let i = 0; i < word.length; ++i) {
    if (valueKeyClicked == word.charAt(i)) {
      document.getElementById(i).innerHTML = valueKeyClicked;
      indicator = true;
      --lettersFound;
    }
  }
  if (indicator == false) {
    removeHealthPoints(healthPoints);
    --healthPoints;
    if (healthPoints == 0) {
      let lost = "Game Over..! Try again!"
      stopGame(lost);
    }
  } else if (lettersFound == 0) {
    let win = "winner winner chicken dinner!";
    stopGame(win);
  }
}

function stopGame(messageDisplay) {
  document.getElementById('guessDiv').innerHTML ="";
  document.getElementById('keyboardDiv').innerHTML="";
  document.getElementById('statusDiv').innerHTML= "";
  let announcer = document.createElement('div');
    announcer.id = "information";
    announcer.innerHTML = messageDisplay;
    announcer.onclick = reloadGame;
    document.getElementById('keyboardDiv').append(announcer);
}

function reloadGame() {
  window.location.reload();
}