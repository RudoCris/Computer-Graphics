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
/**
 * собственно реализация алгоритма которая рисования по Кльваджо
 * см. learn.javascript.ru/bezier
 */ 
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
 * см на learn.javascript.ru/bezier
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

/*Треугольник
 * Point3d a, b, c - точки треугольника
 * string color цвет в шестнадцатеричном коде 
 */ 
function Triangle (a, b, c, color) {
  this.pointA = a;
  this.pointB = b;
  this.pointC = c;
  this.color = (color === undefined) ? "#ff0000" : color;
  this.lineWidth = 1; //толщина контура
  this.alpha = 1; //непрозрачность 0-1
}
/*собственно рисуем треугольник, стандартными lineTo и moveTo
 * только координаты точек получаем через функции getScreenX и getScreenY (см в point3d.js)
 */
Triangle.prototype.draw = function (context) {
//если это задняя сторона - не рисовать
    if (this.isBackface()) {
    return;
  }
  context.save();
  context.lineWidth = this.lineWidth;
  context.fillStyle = context.strokeStyle = this.getAdjustedColor();
  context.beginPath();
  context.moveTo(this.pointA.getScreenX(), this.pointA.getScreenY());
  context.lineTo(this.pointB.getScreenX(), this.pointB.getScreenY());
  context.lineTo(this.pointC.getScreenX(), this.pointC.getScreenY());
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};
//функция определения положения объекта, для сортировки (чтобы отображать только передние слои)
Triangle.prototype.getDepth = function () {
  return Math.min(this.pointA.z, this.pointB.z, this.pointC.z);
};

//проверка на это задняя сторона?
Triangle.prototype.isBackface = function () {
  var cax = this.pointC.getScreenX() - this.pointA.getScreenX(),
      cay = this.pointC.getScreenY() - this.pointA.getScreenY(),
      bcx = this.pointB.getScreenX() - this.pointC.getScreenX(),
      bcy = this.pointB.getScreenY() - this.pointC.getScreenY();
  return cax * bcy > cay * bcx;
};
//Лампочка, координаты и яркость - параметры
function Light (x, y, z, brightness) {
  this.x = (x === undefined) ? -100 : x;
  this.y = (y === undefined) ? -100 : y;
  this.z = (z === undefined) ? -100 : z;
  this.brightness = (brightness === undefined) ? 1 : brightness;
}
//ввод яркости с проверкой на дурака
Light.prototype.setBrightness = function (b) {
  this.brightness = Math.min(Math.max(b, 0), 1);
};
//получаем цвет в зависимости от падения света
Triangle.prototype.getAdjustedColor = function () {
  var color = utils.parseColor(this.color, true),
      red = color >> 16,
      green = color >> 8 & 0xff,
      blue = color & 0xff,
      lightFactor = this.getLightFactor();
  red *= lightFactor;
  green *= lightFactor;
  blue *= lightFactor;
  return utils.parseColor(red << 16 | green << 8 | blue);
};

//та самая зависимость от падения света (фактор света)
Triangle.prototype.getLightFactor = function () {
  //берём два вектора (стороны треугольника AB и BC) 
  //чтобы потом определить вектор нормали
    var ab = {
    x: this.pointA.x - this.pointB.x,
    y: this.pointA.y - this.pointB.y,
    z: this.pointA.z - this.pointB.z
  };
  var bc = {
    x: this.pointB.x - this.pointC.x,
    y: this.pointB.y - this.pointC.y,
    z: this.pointB.z - this.pointC.z
  };
  //определяем вектор нормали
  var norm = {
    x:  (ab.y * bc.z) - (ab.z * bc.y),
    y:-((ab.x * bc.z) - (ab.z * bc.x)),
    z:  (ab.x * bc.y) - (ab.y * bc.x)
  };
  //dotprod это скалярное произведение, которое покажет рахницу между вектором нормали и вектором света
  var dotProd = norm.x * this.light.x + norm.y * this.light.y + norm.z * this.light.z,
      //величина нормали и света
      normMag = Math.sqrt(norm.x * norm.x + norm.y * norm.y + norm.z * norm.z),
      lightMag = Math.sqrt(this.light.x * this.light.x + this.light.y * this.light.y + this.light.z * this.light.z);
  //МАГИЧЕСКАЯ ФОРМУЛА
  //по сути вычисляет угол падения света от которого зависит степень изменения цвета
  return (Math.acos(dotProd / (normMag * lightMag)) / Math.PI) * this.light.brightness;
};
/*Прямоугольник
 * color - цвет
 * angle - угол поворота
 * dx, dy - координаты
 */
function Rectangle(color, angle, dx, dy) {
    this.angle = angle ? angle : 0.03; //угол поворота (по умолчанию 0,03)
    this.color = color ? color : '#6b6bff';
    this.dx = dx ? dx : 0; //координаты
    this.dy = dy ? dy : 0; 
    this.rotate = 0;
    this.index_of_curr_point = 0; //индек ткущей точки
    this.index_of_next_point = 1; //индекс следующей точки
    this.to_point = {x: 0, y: 0}; //следующая точка (координты)
    this.from_point = {x: 0, y: 0}; //точка от которой двигаемся, не реализовано
}
/*Функция движения квадратика
 * boolean move - двигаться или нет
 * Array chain - массив точек между которыми нужно перемещаться
 */
Rectangle.prototype.move = function(move, chain){
if(move){
         this.to_point.x = chain[this.index_of_next_point].x; //инициализируем следующую точку
         this.to_point.y = chain[this.index_of_next_point].y; 

         /*если координаты квадратика совпадают с координатами седующей точки (уже приехали)
          */
         if(Math.round(this.dx)==this.to_point.x && Math.round(this.dy)==this.to_point.y){

          // то индекс следующей точки увеличиваем а 1
             this.index_of_next_point++;
             this.index_of_curr_point++;
             this.color = get_random_color(); //меняем цвет квадрата

             //если дошли до последней точки, то следующей точкой будет первая (цикл)
             if(this.index_of_next_point == chain.length){
                 this.index_of_next_point = 0;
             }
             if(this.index_of_curr_point == chain.length){
                 this.index_of_curr_point = 0;
             }
         }

         //кубик перемещается по вектору следующая точка минус нынешнее местоположения делённое на 10 сегментов
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
    //крутим квадратик
    context.transform(cos, sin, -sin, cos, this.dx, this.dy);

    context.fillRect(-25, -25, 50, 50);
    context.lineWidth = 1;
    context.restore();
}

/*Точка (правильнее было назвать Point, но я в начале ступил, ща впадлу везде менять)
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
    this.always_drg = false;
    this.lineWidth = 1;
}

/*Рисуем шарик (чистый html5)*/
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

//Функция возвращает квадрат, в которой вписан шарик
Ball.prototype.getBounds = function () {
    return {
        x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2
    };
};
