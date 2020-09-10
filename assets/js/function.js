var player1 = prompt("Player One: Enter your name, You will be Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter your name, You will be Red");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum) {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
  }

function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function reportColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
    var colorReport = reportColor(5, colIndex);
    for(var row = 5; row > -1; row--){
        colorReport = reportColor(row, colIndex);
        if(colorReport === 'rgb(128, 128, 128)'){
            return row;
        }
    }
}

function colorMatch(one, two, three, four){
    return( one=== two && one=== three && one=== four && one!= 'rgb(128, 128, 128)' && one!=undefined);
}

function horizontalWinCheck(){
    for(var row = 0; row < 6; row++){
        for(var col = 0; col < 4; col++){
            if(colorMatch(reportColor(row, col), reportColor(row, col+1), reportColor(row, col+2), reportColor(row, col+3))){
                reportWin(row, col);
                return true;
            }else{
                continue;
            }
        }
    }
}

function verticalWinCheck() {
    for(var col = 0; col < 7; col++){
        for(var row = 0; row < 3; row++){
            if(colorMatch(reportColor(row,col), reportColor(row+1,col),reportColor(row+2,col),reportColor(row+3,col))){
            reportWin(row,col);
            return true;
            } else {
                    continue;
            }
        }
    }
}

function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
      for (var row = 0; row < 7; row++) {
        if (colorMatch(reportColor(row,col), reportColor(row+1,col+1) ,reportColor(row+2,col+2), reportColor(row+3,col+3))) {
          reportWin(row,col);
          return true;
        } else if (colorMatch(reportColor(row,col), reportColor(row-1,col+1) ,reportColor(row-2,col+2), reportColor(row-3,col+3))) {
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
}

function gameEnd(winningPlayer) {
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 7; row++) {
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
        $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
      }
    }
  }
  
  var currentPlayer =1;
  var currentName = player1;
  var currentColor = player1Color;
  
  $('h3').text(player1+": it is your turn, please pick a column to drop your blue chip.");
  
  $('.board button').on('click',function() {
  
    var col = $(this).closest("td").index();
  
    var bottomAvail = checkBottom(col);
  
    changeColor(bottomAvail,col,currentColor);
  
    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
      gameEnd(currentName);
    }
  
    currentPlayer = currentPlayer * -1;
  
    if(currentPlayer === 1){
      currentName = player1;
      $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.")
      currentColor = player1Color;
    } else {
      currentName = player2;
      $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
      currentColor = player2Color;
    }
  
  })
