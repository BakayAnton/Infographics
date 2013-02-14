//raphael plugin
Raphael.fn.pieChart = function (cx, cy, r, thickness, innerGlow, values, labels, titles, colors, separatorcolor, labelsDistance, innerText, txtcolor, txtsize, stroke) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params, title) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad),
            x1sector = cx + (r-thickness) * Math.cos(-startAngle * rad),
            y1sector = cy + (r-thickness) * Math.sin(-startAngle * rad),
            x2sector = cx + (r-thickness) * Math.cos(-endAngle * rad),
            y2sector = cy + (r-thickness) * Math.sin(-endAngle * rad);
       
        paper.path([ "M", cx, cy, 
                    "M", x1sector, y1sector, 
                    "A", r-thickness, r-thickness, 0, +(endAngle - startAngle > 180), 0, x2sector, y2sector,
                    "L", x2, y2, 
                    "A", r, r, 0, +(endAngle - startAngle > 180), 1, x1, y1,
                    "z"]).attr(params).toBack();
        //draw separators
        var separx=0, separy=0, separxsector, separysector;
        for (var t=startAngle*100/360; t<endAngle*100/360; t++){
            separx = cx + r * Math.cos(-(360/100)*t * rad);
            separy = cy + r * Math.sin(-(360/100)*t * rad);
            separxsector = cx + (r-thickness) * Math.cos(-(360/100)*t * rad);
            separysector = cy + (r-thickness) * Math.sin(-(360/100)*t * rad);
            paper.path(["M", cx, cy, "M", separxsector, separysector, "L", separx, separy, "z"]).attr({stroke: separatorcolor});
        }
        var op;
        ($.browser.msie&&$.browser.version<9)? op=0 : op =1;
        return paper.path([ "M", cx, cy, 
                            "M", x1sector, y1sector, 
                            "A", r-thickness, r-thickness, 0, +(endAngle - startAngle > 180), 0, x2sector, y2sector,
                            "L", x2, y2, 
                            "A", r, r, 0, +(endAngle - startAngle > 180), 1, x1, y1,
                            "z"]).attr({fill:"rgba(255,255,255,0)", opacity:op , stroke: stroke, "stroke-opacity":0, "stroke-width": 1, 'title': title});
    }
    var angle = 0,
        total = 0;
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    var process = function (j) {
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = colors[j],
                ms = 300,
                delta = labelsDistance,
                bcolor = colors[j],
                p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 0}, (!!titles[j])?titles[j]:""),
                txt = paper.text(cx + (r + delta) * Math.cos(-popangle * rad), cy + (r + delta-10) * Math.sin(-popangle * rad), labels[j]).attr({fill: txtcolor, stroke: "none", opacity: 1, "font-size": txtsize});
            txt.mouseover(function () {
                p.stop().animate({"stroke-opacity":1}, ms, "linear");
            }).mouseout(function () {
                p.stop().animate({"stroke-opacity":0}, ms, "linear");
            });
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
        };
   
    for (i = 0; i < ii; i++) {
        process(i);
    }

    
    //draw inner circle
    if (innerGlow) {
        paper.path([ "M", cx, cy, 
            "M", cx + (r-thickness-innerGlow.indent), cy, 
            "A", r-thickness-innerGlow.indent, r-thickness-innerGlow.indent, 0, +(180 - 0 > 180), 0, cx - (r-thickness-innerGlow.indent), cy,
            "L", cx - (r-thickness-innerGlow.width-innerGlow.indent), cy, 
            "A", r-thickness-innerGlow.width-innerGlow.indent, r-thickness-innerGlow.width-innerGlow.indent, 0, +(180 - 0 > 180), 1, cx + (r-thickness-innerGlow.width-innerGlow.indent), cy,

            "M", cx + (r-thickness-innerGlow.indent), cy, 
            "A", r-thickness-innerGlow.indent, r-thickness-innerGlow.indent, 0, +(180 - 0 > 180), 1, cx - (r-thickness-innerGlow.indent), cy,
            "L", cx - (r-thickness-innerGlow.width-innerGlow.indent), cy, 
            "A", r-thickness-innerGlow.width-innerGlow.indent, r-thickness-innerGlow.width-innerGlow.indent, 0, +(180 - 0 > 180), 0, cx + (r-thickness-innerGlow.width-innerGlow.indent), cy,

            "z"]).attr({fill:innerGlow.color, "stroke-width":0, opacity:innerGlow.opacity});
    }

    //draw text
    paper.text(cx, cy, innerText).attr({'font-size': txtsize, fill: txtcolor});
    return chart;
};
//jQuery plugin
(function($){
    $.fn.infografic = function(options) {  
        var opt = {
            width : 200,
            height : 200,
            left : 100, //отступ диаграммы слева
            top : 100,  //отступ диаграммы сверху
            radius : 57,   //внешний радиус диаграммы,
            thickness : 15, //толщина кольца
            innerGlow : {width: 3, indent:1, color:"#fff", opacity: 0.2},//внутреннее декоративное колечко. innerGlow=null (кольца не будет). свойства кольца: ширина, отступ от внешнего кольца, цвет, прозрачность
            values : [20,           15,         25,         5,          20,          15],  //значения в процентах
            labels : ['10-15',      '15-20',    '20-25',    '25-30',    '30-40',    '40+'],  //подписи
            titles : [],  //подсказки
            colors : ['#90d477',    '#93e490',  '#71d2a7',  '#9ef4f5',  '#95993D','#93e490'],  //цвета соответствующих секторов круга
            separatorcolor : '#5dc499',//Цвет делений круга(если оставить пустую строку, то делений не будет)
            labelsDistance : 25, //расстояние от центра до подсказок (labels)
            innerText : 'inner\ntext', //текст внутри кружка
            txtcolor : '#124F25', //цвет текста для подписей секторов и надписи в центре
            txtsize : 11,   //размер шрифта
            stroke : ''     //обводка сектора при наведении(Можно оставить пустой)
        };
        this.each(function() {
            if (options) { 
                $.extend(opt, options);
            }
            Raphael(this, opt.width, opt.height).pieChart(   opt.left, 
                                                    opt.top, 
                                                    opt.radius, 
                                                    opt.thickness, 
                                                    opt.innerGlow, 
                                                    opt.values, 
                                                    opt.labels, 
                                                    opt.titles, 
                                                    opt.colors, 
                                                    opt.separatorcolor,
                                                    opt.labelsDistance, 
                                                    opt.innerText,
                                                    opt.txtcolor,
                                                    opt.txtsize,
                                                    opt.stroke);
        });
    };
})(jQuery);
