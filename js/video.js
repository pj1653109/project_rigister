    //  视频播放器类型选择

    // 视频播放器类型选择函数
    function videoType(){
    var videoSrc = document.getElementById("my-video").getElementsByTagName("source")[0].src;
    var n = videoSrc.split(".");
    var end = n.slice(-1);
    var myType = document.getElementById("my-video").getElementsByTagName("source")[0].type;
    if (end == "m3u8") {
        document.getElementById("my-video").getElementsByTagName("source")[0].type = "application/x-mpegURL"
        if (Hls.isSupported()) {
            var video = document.getElementById('my-video');
            var hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        }
    }
    if(end == "mp4"){
        document.getElementById("my-video").getElementsByTagName("source")[0].type ="video/mp4";
    }
    }
    
    //将动态生成列表的部分封装成函数，可以重复调用，也方便统一修改 
    function creatTable(parent, datas) {
        // 清空列表元素
        var listNodes = document.getElementsByClassName("box1");
        var len = listNodes.length;
        
        for(var idx=0; idx<len; idx++)
            listNodes[0].remove();

        for (var i = 0; i < datas.length; i++) {
            var videoitem = document.createElement("div");
            var childText = "<div class=\"icon iconfont icon-icon_play \" id=\"font-size\"></div>"
                + "<span id=\"video\">" + datas[i].name + "</span>";
            videoitem.classList.add("box1");
            videoitem.setAttribute("src", datas[i].src);
            videoitem.addEventListener('click',function(){
                // alert(this);
                // alert(this.attributes["src"].value);

                // 设置video的src
                removeVideo();
                document.getElementById("my-video").getElementsByTagName("source")[0].src=this.attributes["src"].value;
                // alert( document.getElementById("my-video").getElementsByTagName("source")[0].src);
                switchVideo();
                videoType();
            },true);
            videoitem.innerHTML = childText;
            parent.appendChild(videoitem);
            
        }
    }
    // 切换视频源
    function switchVideo() {
        document.getElementById("my-video").load();
}
    // 移除视频源
    function removeVideo(){
        document.getElementById("my-video").removeAttribute("src");
        // alert(document.getElementById("my-video").src)
    }