board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
results = []

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
    msg = "You won, congrats!"
  } else if(i == 1) {
    msg = "I won!"
  } else {
    msg = "A draw!"
  }
  alert(msg)
  resetBoard()
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
    board[x-1] = "O"
  } else {
    button.value = "X"
    board[x-1] = "X"
  }
  return true
}

function getButton(x) {
  return document.getElementById(x);
}

function tileClicked(x) {
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

function resetBoard() {
  var completeGame = [isFinished(), board]
  results.push(completeGame)
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (var i = 0; i < 9; i++) {
    getButton(i+1).value = " "
  }
  alert(results.length)
}

function takeMove() {
    tally = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    if(results.length == 0) {
      AIperformTurn()
    } else {
      results.forEach(function(result) {
          for (var i = 0; i < result[1].length; i++) {
              if (result[0] == 1 && result[1][i] == "O") {
                  tally[i] += 1;
              }
              else if (result[0] == 0 && result[1][i] == "X") {
                  tally[i] += 1;
              }
          }
      });
      var max_value = 0;
      var max_index = 0;
      var i = 0;
      for (i = 0; i < board.length; i++) {
          if (tally[i] > max_value && board[i] == 0) {
              max_index = i;
              max_value = tally[i];
          }
      }
      var ret = flip(max_index, 1)
      //board[max_index] = "O";
      if(isFinished() != -1) {
        finish(isFinished());
      }
    }
}
