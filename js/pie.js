/**
 * Created by Administrator on 2017/7/14 0014.
 */
function drawPie(opts) {
    var radius = opts.radius,
        data = opts.data,
        colors = opts.colors,
        el = opts.element,
        width = opts.width,
        height = opts.height,
        outline = opts.outline || false;

    var svg = createSVG('svg');
    svg.attr({
        width: width,
        height: height,
        viewBox: '0, 0, ' + width + ', ' + height
    }).appendTo(el);

    var sum = data.sum();

    var strokeWidth = radius * 2;
    var perimeter = radius * 2 * Math.PI;
    var degs = [];

    for(var i = 0; i < data.length; i++) {
        var length = (data[i] / sum) * perimeter;
        var dasharray = length + ' ' + (perimeter - length);
        var rotate = 0;
        if(i > 0) {
            rotate = degs.sum();
        }
        var nextRotate = (data[i] / sum) * 360;
        degs.push(nextRotate);
        var circle = createSVG('circle');
        circle.attr({
            cx: width * 0.5,
            cy : height * 0.5,
            r : radius,
            fill : 'none',
            stroke : colors[i],
            'stroke-width' : strokeWidth,
            'stroke-dasharray' : dasharray,
            style : 'transform-origin: center;transform:rotateZ(' + rotate + 'deg)'
        }).appendTo(svg);
    }
    if(outline) {
        for(var i = 0; i < degs.length; i++) {
            deg = degs[i] * 0.5;
            if(i > 0) {
                var s = 0;
                for(var k = 0; k < i; k++) {
                    s += degs[k];
                }
                deg += s;
            }
            var text = createSVG('text');

            var p = '约' + Math.round(data[i] / sum * 100) + '%';
            var startX = width * 0.5 + radius * 1.25 * Math.cos(deg / 180 * Math.PI),
                startY = height * 0.5 + radius * 1.25 * Math.sin(deg / 180 * Math.PI);
            var endX = width * 0.5 + radius * 2.5 * Math.cos(deg / 180 * Math.PI),
                endY = height * 0.5 + radius * 2.4 * Math.sin(deg / 180 * Math.PI);

            var centerX = startX + (endX - startX) * 0.5;
            if(deg > 230 && deg <= 270) {
                endY = startY - 10;
                endX = startX + 30;
                centerX = startX + 10;
            }
            if(deg > 90 && deg <= 150) {
                endY = startY + 100;
                endX -= 10;
                centerX = startX - 30;
            }
            if(deg <= 270 && deg >= 90) {
                endY -= 38;
            }
            text.attr({
                x : endX,
                y : endY,
                fill : '#fff',
            }).appendTo(svg).text(p);
            if(deg <= 270 && deg >= 90) {

            } else {
                endX -= 5;
            }

            var pl = createSVG('polyline');
            pl.attr({
                points: startX + ',' + startY + ' ' + centerX + ',' + endY + ' ' + endX + ',' + endY,
                stroke: '#fff',
                'stroke-width': 2,
                fill: 'none'
            }).appendTo(svg);

        }
    } else {
        for(var i = 0; i < degs.length; i++) {
            deg = degs[i] * 0.5;
            if(i > 0) {
                var s = 0;
                for(var k = 0; k < i; k++) {
                    s += degs[k];
                }
                deg += s;
            }

            var text = createSVG('text');

            var p = '约' + Math.round(data[i] / sum * 100) + '%';

            var xPos = 40, yPos = 10;
            if(deg < 90) {
                xPos = 0;
                yPos = 5;
            } else if(deg < 180) {
                xPos = 30;
            } else if (deg < 270) {
                xPos = 20;
            } else {
                xPos = 20;
            }

            var x = width * 0.5 + radius * Math.cos(deg / 180 * Math.PI) - xPos,
                y = height * 0.5 + radius * Math.sin(deg / 180 * Math.PI) + yPos;
            text.attr({
                x : x,
                y : y,
                fill : '#fff',
            }).appendTo(svg).text(p);
        }
    }
}