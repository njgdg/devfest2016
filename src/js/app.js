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
  // var $preload = $('.preload');
  // var img1Url = $preload.children()[0].src;
  // var img2Url = $preload.children()[1].src;
  var banner0 = $('.banner-0');
  var banner1 = $('.banner-1');

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
        zoom:15,
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

  $doc.on('scroll', function(e){
    var st = $doc.scrollTop();
    if (st >= winH) {
      banner0.css('visibility', 'hidden');
      banner1.css('visibility', 'visible');
    } else {
      banner0.css('visibility', 'visible');
      banner1.css('visibility', 'hidden');
    }
    e.preventDefault();
  });

  // 地图
  initMap();

  // window.scrollToScreen = function(id) {
  //   $.scrollTo('#' + id, 600);
  //   return false;
  // }

  $('ul.nav').find('a').on('click', function(){
    var id = $(this).data('s');
    $.scrollTo('#' + id, 600);
    return false;
  });
});
