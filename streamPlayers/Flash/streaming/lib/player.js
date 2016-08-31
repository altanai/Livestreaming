var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h=window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight;
var vidSrcroot = 'http://54.237.199.172:1935/livecf/myStream/'; 
function embedBrowser(){
  var parameters = {
       src: vidSrcroot + 'manifest.f4m',
       autoPlay: "false",
       verbose: true,
       streamType: "live",
       controlBarAutoHide: "true",
       controlBarPosition: "bottom",
       poster: "images/poster.png"
  };

  var wmodeValue = "direct";
  var wmodeOptions = ["direct", "opaque", "transparent", "window"];
  if (parameters.hasOwnProperty("wmode"))
  {
    if (wmodeOptions.indexOf(parameters.wmode) >= 0)
    {
      wmodeValue = parameters.wmode;
    }               
    delete parameters.wmode;
  }  
  // Embed the player SWF:              
  swfobject.embedSWF(  "StrobeMediaPlayback.swf"  , "StrobeMediaPlayback"  , w, h, "10.1.0", "expressInstall.swf", parameters, { allowFullScreen: "true", wmode: wmodeValue} , { name: "StrobeMediaPlayback" });
}

function embedDevice() {
  var videoEle =   '<video id="videotag" width="'+w+'" height="'+h+'"  src="'+vidSrcroot +  'playlist.m3u8" preload controls><source src="'+vidSrcroot +  'playlist.m3u8"/></video>';
  document.getElementById('StrobeMediaPlayback').innerHTML = videoEle;
  document.getElementById('videotag').addEventListener('error',onError,true);
}

function onError(e){
  document.getElementById('StrobeMediaPlayback').innerHTML = "<img id='errmsg' style='width:" + w + "px;height:" + h + "px;' src='images/streamofflineback.png'/>";
}

if(window.ui.os.indexOf("Android") == 0  || window.ui.os.indexOf("iOS") ==0 || window.ui.browser.indexOf('Safari')  ==0){
  embedDevice();
} else {
  embedBrowser();
} 