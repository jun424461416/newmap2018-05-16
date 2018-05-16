/**
 * Created by Administrator on 2017/7/14 0014.
 */
$(function($) {
    $('#mapLegend_list').show();
    var zoomLevel = 13;
    var map = new BMap.Map("myMap");
    window.map = map;
    //map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
    map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
    map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
    map.enableScrollWheelZoom();                            //启用滚轮放大缩小
    //map.addControl(new BMap.MapTypeControl());          //添加地图类型控件
    map.disable3DBuilding();
    map.setMapStyle({style:'midnight'});
    map.centerAndZoom(new BMap.Point(108.943536,34.104593),zoomLevel);
    //隐藏百度地图的版权信息
    map.addEventListener("tilesloaded", function () {
        $(".anchorBL").hide();
    });
    //给行政区域添加名字
    var labelArr = [
        {"position":new BMap.Point(108.913536,34.164593)}
    ]
    var regionArr = [
        "长安区"
    ];

    var itemIndexy = 0;
    var itemIndexnum = 0;
    var list_qysj=[

        {
            name:'长安区',
            qysj:[
                {name:"长安双创中心",altitude:"108.884895,34.162678"},
                {name:"阿里巴巴（西安）创新中心",altitude:"108.884464,34.163307"},
                {name:"百度（西安）创新中心",altitude:"108.884895,34.162678"},
                {name:"猪八戒西北总部园区",altitude:"108.884572,34.163193"},
                {name:"206军民融合",altitude:"108.884572,34.163193"},
                {name:"白鹭时代（西安）HTML5移动互联网示范产业园",altitude:"108.884895,34.162678"},
                {name:"VV办公",altitude:"108.900732,34.164084"},
                {name:"西安翻译学院西安创译孵化基地",altitude:"109.016875,34.029876"},
                {name:"西安科技大学高新学院创业孵化基地（北校区）和大学生创客空间（南校区）",altitude:"108.89147,34.111079"},
                {name:"优客工场",altitude:"108.90044,34.164356"},
                {name:"西安（几）²众创空间",altitude:"108.900409,34.176278"},
                {name:"陕西电子科技职业学院（中国制造2025电子商务孵化基地）",altitude:"108.94908,34.12227"},
                {name:"西安培华学院创客中心",altitude:"108.94145,34.129218"},
                {name:"陕西师范大学“创客之家”大学生创新创业实践基地",altitude:"108.897709,34.15903"},
                {name:"西安电子科技大学星火众创空间",altitude:"108.834957,34.13323"},
                {name:"西北政法大学商学院众创空间和新闻学院创客咖啡",altitude:"108.922082,34.159669"},
                {name:"陕西广播电视大学天宇创业孵化基地",altitude:"108.878234,34.170112"},
                {name:"西京学院大学生创业孵化基地",altitude:"108.935881,34.139064"},
                {name:"西北大学现代学院大学生创新创业孵化中心",altitude:"108.801496,34.054827"},
                {name:"西安邮电大学大学生创新创业基地",altitude:"108.907435,34.158831"},
                {name:"西安外国语大学创新创业实训中心",altitude:"108.882621,34.141489"},
                {name:"西北大学三创空间孵化基地",altitude:"108.881104,34.150915"},
                {name:"太乙宫街道T8艺术创客街区",altitude:"109.014104,34.033922"},
                {name:"硕鸿掌合天下创业基地",altitude:"108.989007,34.08526"},
                {name:"天幕众创咖啡",altitude:"108.951313,34.166812"},
                {name:"陕西三创电商众创空间",altitude:"108.947132,34.111763"},
                {name:"铭格电竞网咖",altitude:"108.869081,34.164876"},
                {name:"速驰电竞网咖",altitude:"108.920046,34.16368"},
                {name:"熊猫电竞网咖",altitude:"108.920265,34.163212"},
                {name:"清和电竞网咖",altitude:"108.932564,34.162356"},
                {name:"盛世龙鼎网络会所",altitude:"108.937148,34.164317"},
                {name:"西安青年双创服务中心",altitude:"108.935881,34.139064"},
                {name:"初心文化创客空间",altitude:"108.979867,34.140941"},
                {name:"西安南洋迪克电子商务基地",altitude:"108.864543,34.15451"},
                {name:"中关村科技园",altitude:"108.968347,34.144198"},
                {name:"蒜泥科技园",altitude:"108.920265,34.163212"}
            ]
        }
    ]


    /*
   //详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
   //参数说明如下:
   /* visible 热力图是否显示,默认为true
   * opacity 热力的透明度,1-100
   * radius 势力图的每个点的半径大小
   * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
   *	{
   .2:'rgb(0, 255, 255)',
   .5:'rgb(0, 110, 255)',
   .8:'rgb(100, 0, 255)'
   }
   其中 key 表示插值的位置, 0~1.
   value 为颜色值.
   heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
   map.addOverlay(heatmapOverlay);
   heatmapOverlay.setDataSet({data:points_heatMap,max:100});
   heatmapOverlay.show();
   */

    // heatmapOverlay.hide();

    //获取范围内的随机数
    function random(min,max){
        return Math.floor(min+Math.random()*(max-min));
    }
 

    //普通标注点方法
    var pcs = [];
    var drawNormalPoint = function(data,color){
        var points = [];
        for (var i = 0; i < data.length; i++) {
            str=data[i].altitude.split(",")
            points.push(new BMap.Point(str[0], str[1]));
            var myIcon = new BMap.Icon("img/sound-wave-50px.gif", new BMap.Size(50,50));
            var marker2 = new BMap.Marker(new BMap.Point(str[0], str[1]),{icon:myIcon});
            map.addOverlay(marker2);
        }
        // var options = {
        //     size: BMAP_POINT_SIZE_BIG,
        //     shape: BMAP_POINT_SHAPE_CIRCLE,
        //     color: color
        // }
        // var pointCollection = new BMap.PointCollection(points, options);
        // map.addOverlay(pointCollection);
        // pcs.push(pointCollection);
    }
    var drawNormalPoint1 = function(data,color){
        var points = [];
        for (var i = 0; i < data.length; i++) {
            points.push(new BMap.Point(data[i][0], data[i][1]));
        }
        var options = {
            size: BMAP_POINT_SIZE_SMALL,
            shape: BMAP_POINT_SHAPE_CIRCLE,
            color: color
        }
        var pointCollection = new BMap.PointCollection(points, options);
        map.addOverlay(pointCollection);
        // pcs.push(pointCollection);
    }
    function getBoundary(str){
        var list_d="西安市"+str;
        $('#h_title').text("双创载体");
        var bdary = new BMap.Boundary();
        bdary.get(list_d, function(rs){       //获取行政区域
            // map.clearOverlays();        //清除地图覆盖物
            drawNormalPoint(list_qysj[itemIndexnum].qysj,'rgba(255,120,122,.8)');
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                alert('未能获取当前输入行政区域');
                return ;
            }
            var pointArray = [];
            for (var i = 0; i < count; i++) {
//                strokeColor:"red",    //边线颜色。
//                    fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
//                    strokeWeight: 3,       //边线的宽度，以像素为单位。
//                    strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
//                    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
//                    strokeStyle: 'solid' //边线的样式，solid或dashed。
                var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#09D4FF",
                    fillColor:"#09D4FF",strokeOpacity: 0.9,fillOpacity: 0.1}); //建立多边形覆盖物
                map.addOverlay(ply);  //添加覆盖物
                pointArray = pointArray.concat(ply.getPath());
                itemIndexnum++;
                if(itemIndexnum > 17) itemIndexnum = 0;
            }
        });
    }
    // $('#ranklist_ul').html("");
    var htmlstr="";
    for(var i=0;i<list_qysj[itemIndexnum].qysj.length;i++){
        var str="<li class='top'><p>"+list_qysj[itemIndexnum].qysj[i].name+"</p></li>";
        // var str="<li class='top'><em>"+i+"</em><p>"+list_qysj[itemIndexnum].name+list_qysj[itemIndexnum].qysj[i].text+"</p><span class='num'>"
        //     +list_test[i].sta+"</span></li>";
        htmlstr=htmlstr+str;
    }
    $('#ranklist_ul').append(htmlstr);
    $("#ranklist").myScroll({
        speed:80,
        rowHeight:1000,
    });
    getBoundary(list_qysj[itemIndexnum].name)

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 弹出层覆盖物
        function ComplexCustomOverlay(point,title,address,tel,image){
            this._point = point;
            this._title = title;
            this._address = address;
            this._tel = tel;
            this._image = image;
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();

        ComplexCustomOverlay.prototype.initialize = function(map){
            this._map = map;
            var div = this._div = document.createElement("div");
            $(div).addClass('tip');
            div.style.zIndex = BMap.Overlay.getZIndex(999999999999999999);
    
            var imgNode = '<img src="images/'+this._image+'.jpg" />';
            if(this._image == 'none') imgNode = '';
    
            $(div).append('<div class="tip">' +
                '<h2>'+this._title+'</h2>' +
                '<div class="img-text">'
                +'<div class="img-dom">'+
                imgNode+
                '</div>'+
                '<div class="text-dom">'+
                    '<p>'+
                    '地址：'+this._address+
                    '</p>'+
                    '<p>'+
                    '面积：'+this._tel+
                    '</p>'+
                '</div>'
            //    + '<div class="col-left">' +
            //     imgNode +
            //     '</div>' +
            //     '<div class="col-right">' +
            //     '<p>地址：'+this._address+'</p>' +
            //     '<p>面积：'+this._tel+'</p>' +
            //     '<p></p>' +
            //     '</div>'
            + '</div>'+
                '</div>');
            map.getPanes().labelPane.appendChild(div);
            return div;
        }
        ComplexCustomOverlay.prototype.draw = function(){
            var map = this._map;
            var pixel = map.pointToOverlayPixel(this._point);
            if ( this._point.lat > 34.139064 ){//超过规定经度，修改显示方式
                this._div.style.top  = pixel.y +50 + "px";
            }else{
                this._div.style.top  = pixel.y - 230 + "px";
            }

            if(this._point.lat < 34.139064 && this._title.length > 30){//判断标题字数过多，移动弹框的上下位置
                this._div.style.top  = pixel.y -260 + "px";
            }

            if(this._point.lat < 34.139064 && this._title.length > 20 && this._title.length < 30){//判断标题字数过多，移动弹框的上下位置
                this._div.style.top  = pixel.y -260 + "px";
            }

                this._div.style.left = pixel.x - 270 + "px";         
        }

    // 水滴覆盖物
    function WaterDropOverlay(point,image){
        this._point = point;
        this._image = image;
    }
    WaterDropOverlay.prototype = new BMap.Overlay();
    WaterDropOverlay.prototype.initialize = function(map){
        this._map = map;
        var div = this._div = document.createElement("div");
        $(div).addClass('water');
        if(this._point.lat > 34.139064){//超过规定经度，修改显示方式
            $(div).addClass('transform-rotate')
        }
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);

        $(div).append('<img src="images/'+this._image+'Pos.png"/>');
        map.getPanes().labelPane.appendChild(div);
        return div;
    }
    WaterDropOverlay.prototype.draw = function(){
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        if (this._point.lat > 34.139064){
            this._div.style.top  = pixel.y-(-10) + "px";
        }else{
            this._div.style.top  = pixel.y - 50 + "px";
        }
        this._div.style.left = pixel.x - 13 + "px";
    }

    var flag = 0;
    var myCompOverlay = '';
    var waterDropOverlay = '';
    //弹出层移动的点
    var waterdata = [
        [108.907435,34.158831,'西安邮电大学大学生创新创业基地','长安区西长安街校内','2.7万平方米','casc','blue'],
        [108.900732,34.164084,'VV办公','长安区西长安街919号万科生活广场B、C座','6.8万平方米','vv','blue'],
        [109.016875,34.029876,'西安翻译学院西安创译孵化基地','西安长安区太乙宫镇西安翻译学院','1.85万平方米','fy','blue'],
        [108.89147,34.111079,'西安科技大学高新学院创业孵化基地（北校区）和大学生创客空间（南校区）','陕西省西安市长安区子午大道中段39号','2.3万平方米','kjd','blue'],
        [108.90044,34.164356,'优客工场','长安区西长安街919号万科生活广场B座4-5层','0.3万平方米','yk','blue'],
        [108.900409,34.176278,'西安〔几〕2众创空间','长安区郭杜镇樱花二路5号茅坡新城','3.2万平方米','ji','blue'],
        [108.94908,34.12227,'陕西电子科技职业学院（中国制造2025电子商务孵化基地）','西安市长安神禾三路','0.7万平方米','dz','blue'],
        [108.94145,34.129218,'西安培华学院创客中心','陕西省西安市长安区培华南路','2.9万平方米','ph','blue'],
        [108.884572,34.163193,'猪八戒西北总部园区','长安区郭杜街道文苑南路长安文化中心B座101室','0.4万平方米','zbj','blue'],
        [108.897709,34.15903,'陕西师范大学“创客之家”大学生创新创业实践基地','陕西师范大学长安校区','1.15万平方米','sf','blue'],
        [108.834957,34.13323,'西安电子科技大学星火众创空间','西安市西沣路兴隆段266号西安电子科技大学大学生活动中心','2.2万平方米','kkj','blue'],
        [108.922082,34.159669,'西北政法大学商学院众创空间和新闻学院创客咖啡','陕西省西安市长安区西北政法大学','3.62万平方米','zf','blue'],
        [108.884572,34.163193,'206军民融合','长安区文苑中路长安双创中心12层','0.1万平方米','jm','blue'],
        [108.878234,34.170112,'陕西广播电视大学天宇创业孵化基地','长安区郭杜郭北街20号校内教学北楼6-7层','0.7万平方米','ty','blue'],
        [108.935881,34.139064,'西京学院大学生创业孵化基地','西安市长安区西京路1号','2.0万平方米','xj','blue'],
        [108.801496,34.054827,'西北大学现代学院大学生创新创业孵化中心','西安市长安区滦镇科教园陈北路一路','1.15万平方米','xd','blue'],
        [108.882621,34.141489,'西安外国语大学创新创业实训中心','西安外国语大学长安校区教学楼E104','1.6万平方米','yd','blue'],
        [108.881104,34.150915,'西北大学三创空间孵化基地','西安市长安区学府大道1号','1.5万平方米','xbd','blue'],
        [109.014104,34.033922,'太乙宫街道T8艺术创客街区','西安市长安区太乙宫街道','2.0万平方米','tyg','blue'],
        [108.884895,34.162678,'百度（西安）创新中心','长安区文苑中路长安双创中心7-8层','0.3万平方米','bdcx','blue'],
        [108.989007,34.08526,'硕鸿掌合天下创业基地','西安市长安区王曲街道西马厂村西马路8号','8.0万平方米','zh','blue'],
        [108.951313,34.166812,'天幕众创咖啡','西安市长安区长安北街','0.94万平方米','tm','blue'],
        [108.884464,34.163307,'阿里巴巴（西安）创新中心','长安区文苑中路长安双创中心4-5层','0.37万平方米','bdcx','blue'],
        [108.947132,34.111763,'陕西三创电商众创空间','西安市常宁宫度假山庄内','2.0万平方米','ss','blue'],
        [108.869081,34.164876,'铭格电竞网咖','西安市长安区郭杜街道办事处郭杜北村西街70号','0.5万平方米','ggd','blue'],
        [108.920046,34.16368,'速驰电竞网咖','西安市长安区西长安街盛世商都E区一层','0.4万平方米','ssc','blue'],
        [108.920265,34.163212,'熊猫电竞网咖','西安市长安区西长安街盛世商都小区1D栋','0.2万平方米','xxm','blue'],
        [108.932564,34.162356,'清和电竞网咖','西安市长安区韦曲西长安街288号吉源晶鑫丽座四层','0.4万平方米','xxh','blue'],
        [108.937148,34.164317,'盛世龙鼎网络会所','西安市长安区新华街243号五龙世纪苑负一层','0.7万平方米','ddh','blue'],
        [108.935881,34.139064,'西安青年双创服务中心','西安市长安区西京路1号西京学院科研楼3层','0.8万平方米','xaxn','blue'],
        [108.884895,34.162678,'长安双创中心','长安区文苑中路长安双创中心','4万平方米','albb','blue'],
        [108.979867,34.140941,'初心文化创客空间','西安市长安区樊川路东四府村华严寺旁','0.7万平方米','ccx','blue'],
        [108.864543,34.15451,'西安南洋迪克电子商务基地','西安郭杜教育科技产业开发区学府大道西段','8.0万平方米','nny','blue'],
        [108.968347,34.144198,'中关村科技园','西安市长安区滨河大道','在建','zgc','blue'],
        [108.920265,34.163212,'蒜泥科技园','西安市长安区盛世商都','在建','ssn','blue'],
        [108.884895,34.162678,'白鹭时代（西安）HTML5移动互联网示范产业园','长安区文苑中路长安双创中心6层','0.1万平方米','bl','blue'],
        [108.884895,34.162678,'淘丁创新中心T-WORK','西安市长安区文苑中路长安双创中心3楼','0.5万平方米','tdjt','blue']
    ];

    //覆盖物数据
    var infos = [];
    for (var flag = 0; flag < waterdata.length; flag++) {
        var wp = new BMap.Point(waterdata[flag][0], waterdata[flag][1]);
        myCompOverlay = new ComplexCustomOverlay(wp, waterdata[flag][2],waterdata[flag][3],waterdata[flag][4],waterdata[flag][5]);
        waterDropOverlay = new WaterDropOverlay(wp,waterdata[flag][6]);
        map.addOverlay(myCompOverlay);
        map.addOverlay(waterDropOverlay);
        myCompOverlay.hide();
        waterDropOverlay.hide();
        infos.push([myCompOverlay, waterDropOverlay]);
    }
    // infos[29][0].show()
    // infos[29][1].show()
    //循环播放的方法
    var num= 0;
    function domNumFun (){
        for (var i =0; i< infos.length; i++){
            infos[i][0].hide();
            infos[i][1].hide();
       }
       infos[num][0].show();
       infos[num][1].show();
       num++;
       //一次出现两个的判断；
       if(num == infos.length){
        //   infos[0][0].show();
        //   infos[0][1].show();
          num = 0;
       }else{
        //   infos[num+1][0].show();
        //   infos[num+1][1].show();
       }
    };

        //循环播放弹框
        setInterval(function(){
            domNumFun();
        }, 2000);

        //画边界
    for(var i=0;i<labelArr.length;i++){
        var label = new BMap.Label(regionArr[i], labelArr[i]);  // 创建文本标注对象
        label.setStyle({
            background: "transparent",
            border: "0",
            color : "rgba(255,255,255,.8)`",
            fontSize : "28px",
            height : "28px",
            lineHeight : "28px",
            fontFamily:"微软雅黑",
        })
        map.addOverlay(label);;
    }
});