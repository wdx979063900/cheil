var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

// jQuery点击事件
$(document).ready(function () {
    prepareForMobile();
    newGame();
})

function prepareForMobile() {
    if (documentWidth > 500) {
        documentWidth = 500;
        gridContainerWidth = 460;
        cellSpace = 20;
        cellSideLength = 100;
    } else {
        $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
        $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
        $('#grid-container').css('padding', cellSpace);
        $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);


        $('.grid-cell').css('width', cellSideLength);
        $('.grid-cell').css('height', cellSideLength);
        $('.grid-cell').css('border-radius', 0.02 * cellSideLength);
    }
}

function newGame() {
    // 初始化棋盘格 
    init();
    // 在棋盘上随机生成两个棋子

    generateOneNumber();    // 在随机位置随机生成一个2或4   
    generateOneNumber();
}

// 初始化棋盘函数
function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }
    // 初始化数组,将数组转化为二位数组
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    score = 0;
    updateScore(score);
    updateBoardView();// 执行更新数组样式

}







// 更新数组样式
function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);


            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + cellSideLength / 2);
                theNumberCell.css('left', getPosLeft(i, j) + cellSideLength / 2);
            } else {
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height', cellSideLength);
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                // 返回背景色
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                // 返回数字色
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
            $('.number-cell').css('line-height', cellSideLength + 'px');
            $('.number-cell').css('font-size', 0.6 * cellSideLength + 'px');
        }
    }
}

// 在棋盘上随机生成棋子
function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    }
    // 随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while (times < 50) {
        if (board[randx][randy] == 0) {
            break;
        }
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
        times++;
    }

    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    // 随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    // 在随机位置生成随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
    return true;

}


// PC端键盘事件响应循环
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //向左
            if (moveLeft()) {
                event.preventDefault();
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;

        case 38: //向上
            if (moveUp()) {
                event.preventDefault();
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 39: //向右
            if (moveRight()) {
                event.preventDefault();
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);;
            }
            break;
        case 40: //向下
            if (moveDown()) {
                event.preventDefault();
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        default:
            break;
    }
})


// 移动端事件响应循环
document.addEventListener('touchstart', function (event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
})

document.addEventListener('touchend', function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;


    var deltaX = endx - startx;
    var deltaY = endy - starty;

    if (Math.abs(deltaX) < 0.3*documentWidth  && Math.abs(deltaY) < 0.3*documentWidth) {
        return
    }


    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        // move  X
        if (deltaX > 0) {
            // move right
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);;
            }
        } else {
            // move left
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    } else {
        // move Y
        if (deltaY > 0) {
            // move down
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        } else {
            // move up
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    }
})

// 游戏结束函数
function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert("game over !");
}

// 向左移动函数
function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    // 向左移动细节
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);// 更新数组样式  
    return true;
}


// 向上移动函数
function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    // 向上移动细节
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockHorizontal(j, k, i, board)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue
                    } else if (board[k][j] == board[i][j] && noBlockHorizontal(j, k, i, board) && !hasConflicted[k][j]) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        // add
                        continue
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);// 更新数组样式  
    return true;
}



// 向右移动函数
function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    // 向右移动细节
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        // add
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);// 更新数组样式  
    return true;
}



// 向下移动函数
function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    // 向下移动细节
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockHorizontal(j, i, k, board)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue
                    } else if (board[k][j] == board[i][j] && noBlockHorizontal(j, i, k, board) && !hasConflicted[k][j]) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        // add
                        continue
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);// 更新数组样式  
    return true;
}