/*Кубическая кривая Безье
 * p1, p2, p3, p4 - контрольные точки
 * n - частота
 * color - цвет в шеснадцатеричном коде (по умолчанию чёрный)
 */
function CubicBezier(p1, p2, p3, p4, n, color) {
    this.color = color ? color : "#000";
    this.n = n ? n : 30;
    this.p1 = p1 ? p1 : {x: 100, y: 100};
    this.p2 = p2 ? p2 : {x: 200, y: 200};
    this.p3 = p3 ? p3 : {x: 100, y: 200};
    this.p4 = p4 ? p4 : {x: 300, y: 300};

    /* от точки p1 до gap1 n-ая часть "вектора" (p1,p2)
     * от p2 до gap2 n-ая часть "вектора" (p2,p3)
     */
    this.gap1 = {x: 0, y: 0};       //инициализируем
    this.gap2 = {x: 0, y: 0};
    this.gap3 = {x: 0, y: 0};
    this.gap1.x = (this.p2.x-this.p1.x)/this.n;
    this.gap1.y = (this.p2.y-this.p1.y)/this.n;
    this.gap2.x = (this.p3.x-this.p2.x)/this.n;
    this.gap2.y = (this.p3.y-this.p2.y)/this.n;
    this.gap3.x = (this.p4.x-this.p3.x)/this.n;
    this.gap3.y = (this.p4.y-this.p3.y)/this.n;
}
CubicBezier.prototype.draw = function (context) {
    var np = {x: this.p1.x, y: this.p1.y};
    var next_point1 = {x: this.p1.x, y: this.p1.y},
        next_point2 = {x: this.p2.x, y: this.p2.x},

        temp_point1 = {x: this.p1.x, y: this.p1.y},
        temp_point2 = {x: this.p2.x, y: this.p2.y},
        temp_point3 = {x: this.p3.x, y: this.p3.y};
    context.save();
    context.beginPath();
    for(var i=0; i<=this.n; i++){
        next_point1.x = temp_point1.x + ((temp_point2.x - temp_point1.x)/this.n)*i;
        next_point1.y = temp_point1.y + ((temp_point2.y - temp_point1.y)/this.n)*i;
        next_point2.x = temp_point2.x + ((temp_point3.x - temp_point2.x)/this.n)*i;
        next_point2.y = temp_point2.y + ((temp_point3.y - temp_point2.y)/this.n)*i;

        context.moveTo(np.x, np.y);
        np.x = next_point1.x + i*(next_point2.x - next_point1.x)/this.n;
        np.y = next_point1.y + i*(next_point2.y - next_point1.y)/this.n;
        context.lineTo(np.x, np.y);

        temp_point1.x += this.gap1.x;
        temp_point1.y += this.gap1.y;
        temp_point2.x += this.gap2.x;
        temp_point2.y += this.gap2.y;
        temp_point3.x += this.gap3.x;
        temp_point3.y += this.gap3.y;
    }
    context.strokeStyle = this.color;
    context.stroke();
    context.restore();
}
/*Квадратическая кривая Безье
 * p1, p2, p3 - контрольные точки
 * n - частота
 * color - цвет в шеснадцатеричном коде (по умолчанию чёрный)
 */
function CurveBezier(p1, p2, p3, n, color){
    this.color = color ? color : "#000";
    this.n = n ? n : 30;
    this.p1 = p1 ? p1 : {x: 100, y: 100};
    this.p2 = p2 ? p2 : {x: 200, y: 200};
    this.p3 = p3 ? p3 : {x: 100, y: 200};

    /* от точки p1 до gap1 n-ая часть "вектора" (p1,p2)
     * от p2 до gap2 n-ая часть "вектора" (p2,p3)
     */
    this.gap1 = {x: 0, y: 0};       //инициализируем
    this.gap2 = {x: 0, y: 0};
    this.gap1.x = (this.p2.x-this.p1.x)/this.n;
    this.gap1.y = (this.p2.y-this.p1.y)/this.n;
    this.gap2.x = (this.p3.x-this.p2.x)/this.n;
    this.gap2.y = (this.p3.y-this.p2.y)/this.n;
}
/* Собственно функция отрисовки на JavaScript
 * алгоритм тот что Семёнов давал
 */
CurveBezier.prototype.draw = function (context) {
    var next_point = {x: this.p1.x, y: this.p1.y};
    var temp_point1 = {x: this.p1.x, y: this.p1.y};
    var temp_point2 = {x: this.p2.x, y: this.p2.y};

    context.save();
    context.beginPath();
    for(var i=0; i<=this.n; i++){
        context.moveTo(next_point.x, next_point.y);
        next_point.x = temp_point1.x + ((temp_point2.x-temp_point1.x)/this.n)*i;
        next_point.y = temp_point1.y + ((temp_point2.y-temp_point1.y)/this.n)*i;
        context.lineTo(next_point.x, next_point.y);
        temp_point1.x += this.gap1.x;
        temp_point1.y += this.gap1.y;
        temp_point2.x += this.gap2.x;
        temp_point2.y += this.gap2.y;
    }
    context.strokeStyle = this.color;
    context.stroke();
    context.restore();
}

/*Прямоугольник
 * color - цвет
 * angle - угол поворота
 * dx, dy - координаты
 */
function Rectangle(color, angle, dx, dy) {
    this.angle = angle ? angle : 0.03;
    this.color = color ? color : '#6b6bff';
    this.dx = dx ? dx : 0;
    this.dy = dy ? dy : 0;
    this.rotate = 0;
    this.index_of_curr_point = 0;
    this.index_of_next_point = 1;
    this.to_point = {x: 0, y: 0};
    this.from_point = {x: 0, y: 0};
}
/*Функция движения квадратика
 * boolean move - двигаться или нет
 * Array chain - массив точек между которыми нужно перемещаться
 */
Rectangle.prototype.move = function(move, chain){
if(move){
         this.to_point.x = chain[this.index_of_next_point].x;
         this.to_point.y = chain[this.index_of_next_point].y;
         if(Math.round(this.dx)==this.to_point.x && Math.round(this.dy)==this.to_point.y){
             this.index_of_next_point++;
             this.index_of_curr_point++;
             this.color = get_random_color();
             if(this.index_of_next_point == chain.length){
                 this.index_of_next_point = 0;
             }
             if(this.index_of_curr_point == chain.length){
                 this.index_of_curr_point = 0;
             }
         }
         this.dx += (chain[this.index_of_next_point].x - this.dx)/(10);
         this.dy += (chain[this.index_of_next_point].y - this.dy)/(10);
    }
}

/*Рисуем квадратик*/
Rectangle.prototype.draw = function(context){
    this.rotate += this.angle;
    var cos = Math.cos(this.rotate),
        sin = Math.sin(this.rotate);

    context.save();
    context.fillStyle = this.color;
    context.transform(cos, sin, -sin, cos, this.dx, this.dy);

    context.fillRect(-25, -25, 50, 50);
    context.lineWidth = 1;
    context.restore();
}

/*Точка
 * radius - радиус =)
 * color - цвет в шеснадцатеричном
 * x,y - координаты
 */

function Ball (radius, color, x, y) {
    this.x = x ? x : 10;
    this.y = y ? y : 10;
    this.radius = radius ? radius : 40;
    this.color = color ? color : "#f00";
    this.dragged = false;
    this.lineWidth = 1;
}

/*Рисуе мшарик*/
Ball.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
        context.stroke();
    }
    context.restore();
};

//Функция возвращает квадрат в которой вписан шарик
Ball.prototype.getBounds = function () {
    return {
        x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2
    };
};

