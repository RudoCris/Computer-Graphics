function Rectangle(color, angle, dx, dy) {
    this.angle = angle ? angle : 0.03;
    this.color = color ? color : '#6b6bff';
    this.dx = dx ? dx : 0;
    this.dy = dy ? dy : 0;
    this.rotate = 0;
    this.index_of_curr_point = 0;
    this.index_of_next_point = 1;
    this.to_point = {x: 0, y: 0};

}
Rectangle.prototype.draw = function(chain, context){
    this.rotate += this.angle;
    this.to_point.x = chain[this.index_of_next_point].x;
    this.to_point.y = chain[this.index_of_next_point].y;
    if(Math.round(this.dx)==this.to_point.x && Math.round(this.dy)==this.to_point.y){
        this.index_of_next_point++;
        this.index_of_curr_point++;
        if(this.index_of_next_point == chain.length){
            this.index_of_next_point = 0;
        }
        if(this.index_of_curr_point == chain.length){
            this.index_of_curr_point = 0;
        }
    }
    this.dx += (this.to_point.x - chain[this.index_of_curr_point].x)/100;
    this.dy += (this.to_point.y - chain[this.index_of_curr_point].y)/100;

    var cos = Math.cos(this.rotate),
        sin = Math.sin(this.rotate);

    context.save();
    context.fillStyle = this.color;
    context.transform(cos, sin, -sin, cos, this.dx, this.dy);
    context.fillRect(-25, -25, 50, 50);
    context.restore();
}
function Ball (radius, color, x, y) {
    this.x = x ? x : 10;
    this.y = y ? y : 10;
    this.radius = radius ? radius : 40;
    this.color = color ? color : "#f00";
    this.dragged = false;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 1;
}
Ball.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
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

Ball.prototype.getBounds = function () {
    return {
        x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2
    };
};

