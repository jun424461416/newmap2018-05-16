/**
 * Created by Administrator on 2017/7/14 0014.
 */
function attachChart(opts) {
    var svg, data, color, width, height;
    svg = opts.svg,
        data = opts.data,
        color = opts.color,
        width = opts.width,
        height = opts.height,
        max = opts.max || 400,
        circle = opts.circle;


    /*
     var p = createSVG('path');
     p.attr({
     d : 'M 100 100 C 150 150 200 200 Z',
     stroke : 'red',
     'stroke-width' : 2
     }).appendTo(svg);
     */

    // var circle = createSVG('circle');
    // circle.attr({
    // cx : 100,
    // cy : 100,
    // r : 40,
    // stroke : '#ffffff',
    // 'stroke-width' : 2,
    // fill : 'red'
    // }).appendTo(svg);
    var each = parseInt(width / (data.length - 1));

    var d = 'M0 ' + height + ' ';
    var l = '';
    var lastX = 0, lastY = 0;
    for(var i = 0; i < data.length; i++) {
        var h = parseInt(height - (data[i] / max) * height);
        //console.log(h);
        if(i == 0) {
            d += 'L0 ' + h + ' ';
            l = 'M0 ' + h + ' ';
            lastX = 0;
        } else {

            var x = each * i;
            if(i >= data.length - 1) x = width;
            var centerX = parseInt((lastX + x) * 0.5);
            d += 'C' + centerX + ' ' + lastY + ' ' + centerX + ' ' + h + ' ' + x + ' ' + h + ' ';
            l += 'C' + centerX + ' ' + lastY + ' ' + centerX + ' ' + h + ' ' + x + ' ' + h + ' ';
            lastX = x;
            if(circle && i < data.length - 1) {
                var circle = createSVG('circle');
                circle.attr({
                    cx : x,
                    cy : h,
                    r : 4,
                    stroke : color,
                    'stroke-width' : 1,
                    fill : color
                }).appendTo(svg);
            }
        }
        lastY = h;
    }
    var fX = parseInt((lastX + x) * 0.5);
    var fY = parseInt((lastY + h) * 0.5);
    d += 'S' + fX + ' ' + fY + ' ' + width + ' ' + height + ' ';
    d += 'L0 ' + height + 'Z';

    var shape = createSVG('path');
    shape.attr({
        'd': d,
        fill : color,
        style : 'opacity:0.3;'
    }).appendTo(svg);

    var line = createSVG('path');
    line.attr({
        d : l,
        fill : 'none',
        stroke : color,
        'stroke-width' : 1
    }).appendTo(svg);
}