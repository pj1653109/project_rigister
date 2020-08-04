 // 输入框事件---遮罩消失
 var put = document.querySelector("input");
 var d = document.getElementById("marker");

 put.addEventListener("focus", function () {
     d.style.display = "block";
     // console.log("聚焦");
 });
 put.addEventListener("blur", function () {
     d.style.display = "none";
     // console.log("失焦");
 });

 //加载效果出现
 var loading = document.querySelector("svg");
 var loadshow = document.getElementById("loading3");
 loading.addEventListener("click", loadingShow);

 function loadingShow() {

     loadshow.style.display = "block";
     setTimeout(function () {
         loadshow.style.display = "none";
     }, 2000);
 }
 //svg箭头效果事件 
 var pointer = document.getElementById("myset");
 var tag = pointer.getElementById("mychild");
 var from_arr = [60, 100, 60], to_arr = [80, 80, 80];
 var animate_flag = "";
 pointer.addEventListener('mouseenter', function () {
     var loc = tag.attributes["points"].nodeValue.trim().split(" ").map(function (value, index) {
         return value.split(",").map(function (val, idx) {
             return Number(val);
         });
     });
     animate_flag = "true";

     var interval = setInterval(function () {
         var cnt = 0;
         var points_loc = "";

         if (animate_flag != "true") {
             clearInterval(interval);
             console.log("强制终止正向动画");
             return;
         }

         loc.forEach(function (value, index) {
             if (value[1] > to_arr[index]) {
                 value[1] -= 5;
             }
             else if (value[1] < to_arr[index]) {
                 value[1] += 5;
             }
             else
                 cnt++;
             points_loc += value[0] + "," + value[1] + " ";
             return value;
         });
         if (cnt == 3) {
             clearInterval(interval);
             animate_flag = "";
         }
         console.log(points_loc);

         tag.setAttribute("points", points_loc);
         console.log("正向动画一次");
     }, 100);
 }, false);

 pointer.addEventListener('mouseleave', function () {
     var loc = tag.attributes["points"].nodeValue.trim().split(" ").map(function (value, index) {
         return value.split(",").map(function (val, idx) {
             return Number(val);
         });
     });
     animate_flag = "false";

     var interval = setInterval(function () {
         var cnt = 0;
         var points_loc = "";

         if (animate_flag != "false") {
             clearInterval(interval);
             console.log("强制终止反向动画");
             return;
         }

         loc.forEach(function (value, index) {
             if (value[1] > from_arr[index]) {
                 value[1] -= 5;
             }
             else if (value[1] < from_arr[index]) {
                 value[1] += 5;
             }
             else
                 cnt++;
             points_loc += value[0] + "," + value[1] + " ";
             return value;
         });
         if (cnt == 3) {
             clearInterval(interval);
             animate_flag = "";
         }
         console.log(points_loc);

         tag.setAttribute("points", points_loc);
         console.log("反向动画一次");
     }, 100);
 }, false);
// 弹窗滑动事件
var mouseTop, prevTop=nexTop=moveOffset=0, resetFlag=false;
var slideContainer = document.getElementsByClassName("container")[0];
var slideMove = document.getElementsByClassName("navigator")[0];
//开始触摸事件
slideMove.addEventListener("touchstart",start);
function start(e){
    //重置
    if(resetFlag){
        moveOffset=0;
        resetFlag=false;
    }
    //获取初始位置，该div含有margin值，防止拖拽时出现位置偏移
    prevTop=e.targetTouches[0].pageY-slideContainer.offsetTop + parseInt(getComputedStyle(slideContainer)['margin-top']);
    console.log("start");
    stopEvent(e);
}
//触摸过程事件
slideMove.addEventListener("touchmove",move);
function move(e){
    //获取触摸过程位置
    nexTop=e.targetTouches[0].pageY-slideContainer.offsetTop + parseInt(getComputedStyle(slideContainer)['margin-top']);
    //累计位置偏移量
    moveOffset += nexTop - prevTop;
    //当偏移量超过当前弹窗的高度，该弹窗消失
    if(slideContainer.offsetHeight<=moveOffset)
    {
        slideContainer.style.bottom = (-slideContainer.offsetHeight) + "px";
        resetFlag=true; 
    }
    //当位移偏移量小于0时，弹窗位于页面底部
    else if(-moveOffset>=0)
    {
        slideContainer.style.bottom = "0px";
        resetFlag=true;
    }
    //否则继续向下移动
    else
    {
        slideContainer.style.bottom = (-moveOffset) + "px";
    }
    prevTop = nexTop;
    console.log("move");
    stopEvent(e);
}

//阻止默认事件和冒泡事件
function stopEvent(e){
    var e = e || window.event;
    if(e.preventDefault)
    {
        e.preventDefault();
        e.stopPropagation();
    }
     else {
         e.returnValue = false;
         e.cancelBubble = true;
         }
}
  //点击视频选择视频列表和弹窗遮罩出现
  document.getElementById("button").addEventListener("click",function(){
      document.getElementsByClassName("phone1")[0].style.display="block";
      document.getElementById("onshow1").style.display="block";
  });


  //关闭视频列表和弹窗遮罩
  document.getElementById("closed").addEventListener("click",function(){
      document.getElementsByClassName("phone1")[0].style.display="none";
      document.getElementById("onshow1").style.display="none";
  });
  
  //点击播放按钮视频出现
  /*
    var video=document.getElementById("video-div");
    var full=false;
    var hidding = false;
    var isFull = true;
    var yplayer=document.getElementsByClassName("play-one");
    document.getElementById("font-size").addEventListener("click",function(){
    document.getElementById("font-size").style.color="#75b936";
    video.style.display="block";
    document.getElementsByClassName("play-one")[0].style.display="block";
    document.getElementsByClassName("yinyin")[0].style.display="block";
    

//      if (!full || !hidding){
//      var element = document.documentElement;
//      if (isFull){
//          if(element.requestFullScreen) {
//              video.requestFullScreen();
//          } else if(element.mozRequestFullScreen) {
//              video.mozRequestFullScreen();
//          } else if(element.webkitRequestFullScreen) {
//              video.webkitRequestFullScreen();
//          } else if (element.msRequestFullscreen) {
//              video.msRequestFullscreen();
//          }
//      }else {
//          if (document.exitFullscreen) {
//              document.exitFullscreen();
//          }
//          else if (document.msExitFullscreen) {
//              document.msExitFullscreen();
//          }
//          else if (document.mozCancelFullScreen) {
//              document.mozCancelFullScreen();
//          }
//          else if (document.webkitCancelFullScreen) {
//              document.webkitCancelFullScreen();
//          }
//      }
//  }

  });
  */
  
  //点击视频出现视频播放器
  /*
  document.getElementById("video").addEventListener("click",function(){
     document.getElementById("video").style.color="#75b936";
     document.getElementById("video-div").style.display="block";
     video.style.display="block";
     document.getElementsByClassName("play-one")[0].style.display="block";
     document.getElementsByClassName("yinyin")[0].style.display="block";
//      if (!full || !hidding){
//      var element = document.documentElement;
//      if (isFull){
//          if(element.requestFullScreen) {
//              video.requestFullScreen();
//          } else if(element.mozRequestFullScreen) {
//              video.mozRequestFullScreen();
//          } else if(element.webkitRequestFullScreen) {
//              video.webkitRequestFullScreen();
//          } else if (element.msRequestFullscreen) {
//              video.msRequestFullscreen();
//          }
//      }else {
//          if (document.exitFullscreen) {
//              document.exitFullscreen();
//          }
//          else if (document.msExitFullscreen) {
//              document.msExitFullscreen();
//          }
//          else if (document.mozCancelFullScreen) {
//              document.mozCancelFullScreen();
//          }
//          else if (document.webkitCancelFullScreen) {
//              document.webkitCancelFullScreen();
//          }
//      }
//  }
  });
*/
 //  退出全屏视频消失
 /*
 document.getElementsByClassName("all")[0].addEventListener("click",function(){
     video.style.display="none";
     document.getElementsByClassName("play-one")[0].style.display="none";
     document.getElementsByClassName("yinyin")[0].style.display="none";
     document.getElementById("video-div").style.display="none";
     video.pause();
 })
*/
