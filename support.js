var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSideLength = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth;



function getPosTop(i, j) {
    return cellSpace + i * (cellSideLength + cellSpace);
}
function getPosLeft(i, j) {
    return cellSpace + j * (cellSideLength + cellSpace);
}

// 棋子背景颜色
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2: return "#eee4da";
            break;
        case 4: return "#ede0c8";
            break;
        case 8: return "#f2b179";
            break;
        case 16: return "#f59563";
            break;
        case 32: return "#f67c5f";
            break;
        case 64: return "#f65e3b";
            break;
        case 128: return "#edcf72";
            break;
        case 256: return "#edcc62";
            break;
        case 512: return "#9c0";
            break;
        case 1024: return "#33b5e5";
            break;
        case 2048: return "#09c";
            break;
        case 4096: return "#a6c";
            break;
        case 8192: return "#93c";
            break;
    }
    return "black";
}


// function getNumber(number) {
//     switch (number) {
//         case 2: return "二";
//             break;
//         case 4: return "四";
//             break;
//         case 8: return "八";
//             break;
//         case 16: return "十六";
//             break;
//         case 32: return "三十二";
//             break;
//         case 64: return "六十四";
//             break;
//         case 128: return "一二八";
//             break;
//         case 256: return "二五六";
//             break;
//         case 512: return "五一二";
//             break;
//         case 1024: return "一零二四";
//             break;
//         case 2048: return "二零四八";
//             break;
//             // case 4096: return "#a6c";
//             //     break;
//             // case 8192: return "#93c";
//             break;
//     }
//     return "black";
// }

// 棋子数字颜色
function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";

}


function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function noMove(board) {
    if (canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board)) {
        return false;
    }
    return true;
}

// 判断是否能向左移动
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}


// 判断是否能向上移动
function canMoveUp(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 判断是否向右移动
function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 判断是否能向下移动
function canMoveDown(board) {
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}


// 判断是否有障碍物
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}

