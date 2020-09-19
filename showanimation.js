// 初始化棋盘动画
function showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.text(randNumber);
    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

// 棋子移动动画
function showMoveAnimation(formx,formy,tox,toy) {
    var numberCell = $('#number-cell-' + formx + '-' + formy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    },200);
}

// 加分显示
function updateScore(score) {
    $('#score').text(score);
}