$(document).ready(function(){
  var $doc = $(this);
  var $win = $(window);
  var $body = $('body');
  var winH = $win.height();
  var $screen1 = $('#S1');
  var $screen1Inner = $screen1.children();
  var $screen3 = $('#S3');
  var $screen3Inner = $screen3.children();
  var $screen2 = $('#S2');
  var s2H = $screen2.height();
  var $preload = $('.preload');
  var img1Url = $preload.children()[0].src;
  var img2Url = $preload.children()[1].src;

  function initMap (data) {
    if (!data) {
      data = {};
    }
    var map = $('#Map');

    var address = map.data('address');
    if (address) {
      data.lng = map.data('lng');
      data.lat = map.data('lat');
      data.address = address;
      data.title = map.data('title');
    }

    var lnglat=new AMap.LngLat(data.lng, data.lat);
    var mapObj=new AMap.Map("Map",{
      view: new AMap.View2D({
        center:lnglat,
        zoom:13,
        rotation:0
      }),
      lang:"zh_cn",
      scrollWheel: false
    });
    var marker = new AMap.Marker({
      map:mapObj, //将点添加到地图
      position:new AMap.LngLat(data.lng, data.lat),
      icon:" http://webapi.amap.com/images/0.png  ",//marker图标，直接传递地址url
      offset:new AMap.Pixel(-10,-35) //相对于基点的位置
    });

    var info = [];
    info.push("<div style=\"font-size:16px;line-height: 1.8\">"+ data.title);
    info.push("<div style=\"font-size:14px;\">地址："+ data.address +"</div></div>")

    var inforWindow = new AMap.InfoWindow({
      offset:new AMap.Pixel(0,-23),
      content:info.join("<br>"),
      size: new AMap.Size(320, 100)
    });
    AMap.event.addListener(marker,"click",function(e){
      inforWindow.open(mapObj,marker.getPosition());
    });
    inforWindow.open(mapObj,marker.getPosition());
  }
  // 滚屏
  // $doc.on('scroll', function(e){
  //   var st = $doc.scrollTop();
  //   $screen1.css('background-position', 'center ' + Math.floor(st/2) + 'px');
  //   $screen1Inner.css('background-color', 'rgba(0,0,0,'+ st/winH +')');
  //   if (st >= winH + s2H) {
  //     $screen3.css('background-position', 'center ' + Math.floor(st - winH - s2H)/1.5 + 'px');
  //     $screen3Inner.css('background-color', 'rgba(0,0,0,'+ (st-winH-s2H)/winH +')');
  //   } else {
  //     $screen3.css('background-position', 'center 0');
  //   }
  //   e.preventDefault();
  // });

  $body.css('background-image', 'url('+ img1Url +')');
  $doc.on('scroll', function(e){
    var st = $doc.scrollTop();
    $screen1Inner.css('background-color', 'rgba(0,0,0,'+ st/s2H +')');
    if (st >= s2H) {
      $body.css('background-image', 'url('+ img2Url +')');
      $screen3Inner.css('background-color', 'rgba(0,0,0,'+ (st-winH-s2H)/winH +')');
    } else {
      $body.css('background-image', 'url('+ img1Url +')');
    }
    e.preventDefault();
  });

  // 地图
  initMap();
});
