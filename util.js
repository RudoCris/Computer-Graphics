//Получение рандомного цвета
function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

//магия для кроссбраузерной анимации
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 17 );
            });
}
var utils = {};

//получение координат курсора (с кроссбраузерной магией)
utils.captureMouse = function (element) {
    var mouse = {x: 0, y: 0};
    element.addEventListener('mousemove', function (event) {
        var x, y;
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= element.offsetLeft;
        y -= element.offsetTop;
        mouse.x = x;
        mouse.y = y;
    }, false);
    return mouse;
};

//проверка на входждение точек x и y в квадратик rect
utils.containsPoint = function (rect, x, y) {
  return !(x < rect.x ||
           x > rect.x + rect.width ||
           y < rect.y ||
           y > rect.y + rect.height);
};
