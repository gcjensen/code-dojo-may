board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
results = []
score = [0, 0, 0]
// still playing?
inGame = 1
function initGame()
{
  setMsg("Welcome");
  newGame();
}

function newGame()
{
  resetBoard()
  setMsg("Your turn");
  inGame = 1
}

function setMsg(msg)
{
  document.getElementById("msg").innerHTML = msg;
}
// 0 = Human won
// 1 = Computor won
// 2 = draw
// -1 = not finished
function isFinished() {
  if(board[0] == board[3] && board[3] == board[6]) {
    if(board[0] == "X") {
      return 0;
    }
    if(board[0] == "O") {
      return 1;
    }
  }
  if(board[1] == board[4] && board[4] == board[7]) {
    if(board[1] == "X") {
      return 0;
    }
    if(board[1] == "O") {
      return 1;
    }
  }
  if(board[2] == board[5] && board[5] == board[8]) {
    if(board[2] == "X") {
      return 0;
    }
    if(board[2] == "O") {
      return 1;
    }
  }
  if(board[0] == board[1] && board[1] == board[2]) {
    if(board[0] == "X") {
      return 0;
    }
    if(board[0] == "O") {
      return 1;
    }
  }
  if(board[3] == board[4] && board[4] == board[5]) {
    if(board[3] == "X") {
      return 0;
    }
    if(board[3] == "O") {
      return 1;
    }
  }
  if(board[6] == board[7] && board[7] == board[8]) {
    if(board[6] == "X") {
      return 0;
    }
    if(board[6] == "O") {
      return 1;
    }
  }
  if(board[0] == board[4] && board[4] == board[8]) {
    if(board[0] == "X") {
      return 0;
    }
    if(board[0] == "O") {
      return 1;
    }
  }
  if(board[2] == board[4] && board[4] == board[6]) {
    if(board[2] == "X") {
      return 0;
    }
    if(board[2] == "O") {
      return 1;
    }
  }
  for(i = 0; i < 9; ++i) {
    if(!board[i]) {
      return -1
    }
  }
  return 2
}

// 0 = Human won
// 1 = Computor won
// 2 = draw
// -1 = not finished

function finish(i) {
  msg = ""
  if(i == 0) {
    msg = "You win, congrats!"
  } else if(i == 1) {
    msg = "I won!"
  } else {
    msg = "A draw!"
  }
  setMsg(msg)
  recordScore()
  inGame = 0
}
// 0 = Human
// 1 = PC
function flip(x, who) {
  if(!isFree(x)) {
    return false;
  }
  button = getButton(x);
  if(who) {
    button.value = "O"
    button.style.background="#f6c8c9"
    board[x-1] = "O"
  } else {
    button.value = "X"
    button.style.background="#bdcfea"
    board[x-1] = "X"
  }
  return true
}

function getButton(x) {
  return document.getElementById(x);
}

function tileClicked(x) {
  if (!inGame) {
    return
  }
  if (flip(x, 0)) {
    if(isFinished() != -1) {
      finish(isFinished())
    } else {
      takeMove()
    }
  }
}

function isFree(num) {
  if(board[num-1] == 0) {
    return true;
  }
  return false;
}

function AIperformTurn() {
  do {
    num = Math.floor((Math.random() * 9) + 1);
  } while(!flip(num, 1))
  if(isFinished() != -1) {
    finish(isFinished());
  }
}

function recordScore() {
  var outcome = isFinished()
  var completeGame = [outcome, board]
  results.push(completeGame)
  score[outcome]++
  document.getElementById("humanScore").innerHTML = score[0];
  document.getElementById("pcScore").innerHTML = score[1];
  document.getElementById("drawScore").innerHTML = score[2];
}

function resetBoard() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (var i = 0; i < 9; i++) {
    getButton(i+1).value = " "
    getButton(i+1).style.background="#E0E0E0"
  }
}

function takeMove() {
    tally = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    if(results.length == 0) {
      AIperformTurn()
    } else {
      results.forEach(function(result) {
          for (var i = 0; i < result[1].length; i++) {
              if (result[0] == 1 && result[1][i] == "O") {
                  tally[i] += 1
              }
              else if (result[0] == 0 && result[1][i] == "X") {
                  tally[i] += 1
              }
          }
      });
      var max_value = 0
      var max_index = 0
      var i = 0
      for (i = 0; i < board.length; i++) {
        // || board[max_index] != 0 is to
        // make sure max_index points to an empty field
        if ((tally[i] > max_value || board[max_index] != 0) && board[i] == 0) {
            max_index = i
            max_value = tally[i]
        }
      }
      var ret = flip(max_index+1, 1)

      if(isFinished() != -1) {
        finish(isFinished())
      }
    }
}
