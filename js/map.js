require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/TileLayer",
    "esri/widgets/Search",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"
], function (Map, MapView, TileLayer, Search, Point, SimpleMarkerSymbol, Graphic, GraphicsLayer) {
    //引用在线中文地图
    var layer = new TileLayer({
        url: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer"
    });
    //将引用在线地图进行添加
    var map = new Map({

        layers: [layer]
    });
    //将添加好的地图进行显示
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [121.429, 31.153],
        zoom: 13
    });
    //添加搜索控件
    var search = new Search({
        view: view,

    }, "");
    //页面加载完毕，给搜索图标绑定点击事件并调用search方法
    window.onload = function () {
        // 搜索图标事件
        var find = document.getElementById("findBtn");
        find.addEventListener("click", findSearch);
        function findSearch() {
            //获取input的value值
            var findinput = document.getElementById("inputTxt").value;
            //调用search
            search.search(findinput);
        }
        //视频列表事件委托
        document.getElementsByClassName("phone1")[0].onclick=function(e){
        // 获取鼠标点击目标的Id值
        let id=e.target.id;
        if(id=="video" || id=="font-size"){
            console.log("success");
            //点击播放按钮视频出现
            var video=document.getElementById("video-div");
            var full=false;
            var hidding = false;
            var isFull = true;
            var yplayer=document.getElementsByClassName("play-one");
            console.log(e.target);
            e.target.addEventListener("click",function(){
                e.target.style.color="#75b936";
                video.style.display="block";
                document.getElementsByClassName("play-one")[0].style.display="block";
                document.getElementsByClassName("yinyin")[0].style.display="block";
            });
            
            //点击视频出现视频播放器
            e.target.addEventListener("click",function(){
                e.target.style.color="#75b936";
                document.getElementById("video-div").style.display="block";
                video.style.display="block";
                document.getElementsByClassName("play-one")[0].style.display="block";
                document.getElementsByClassName("yinyin")[0].style.display="block";
            });

            //  退出全屏视频消失
            document.getElementsByClassName("all")[0].addEventListener("click",function(){
                video.style.display="none";
                document.getElementsByClassName("play-one")[0].style.display="none";
                document.getElementsByClassName("yinyin")[0].style.display="none";
                document.getElementById("video-div").style.display="none";
                // video.pause();
            })
        }
    }
}

    search.viewModel.resultGraphicEnabled = false;
    search.viewModel.popupEnabled = false;

    /*点的封装函数*/

    function myPoint(x,y,No){
        var point1 = new Point({
                longitude: x,
                latitude: y

            });
            var markerSymbol = {
                type: "text",
                color: "#25A5f7",
                text: "\ue613",
                font: {
                    size: 34,
                    family: "CalciteWebCoreIcons"
                }
            };
            var pointGraphic1 = new Graphic({
                geometry: point1,
                symbol: markerSymbol,
                popupTemplate: {
                    title: "Shanghai"
                }
            });
            pointGraphic1.attributes = {
                "number": No
            }
            graphicLayer.add(pointGraphic1);
        }

    var graphicLayer = new GraphicsLayer();

    // graphicLayer.add(pointGraphic1);
    myPoint(121.429,31.153,1);
    myPoint(121.419,31.143,2);
    myPoint(116.422,39.918,3);
    map.add(graphicLayer);

    view.on("click", function (event) {
        view.hitTest(event).then(function (response) {
            if (response.results.length) {
                var graphic = response.results.filter(function (result) {
                    return result.graphic.layer === graphicLayer;
                })[0].graphic;
                var myattributes = graphic.attributes.number;
                console.log("123456789");
                document.getElementsByClassName("container")[0].style.height="25em";
                document.getElementsByClassName("phone")[0].style.bottom="0";
                //传进视频数据 
                var datas = [
                    { "name": "视频1", "src": "http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8" },
                    { "name": "视频2", "src": "source/0.mp4" }
                ];
                creatTable(document.getElementsByClassName("phone1")[0], datas);

                console.log(myattributes);
            }
        });
    });
})