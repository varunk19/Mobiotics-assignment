var player;
window.onload=function()
{
    var j;
    for(var i=1;(j=document.getElementById('h'+i))!=null;i++)
        {
            j.innerHTML="Title: Video #"+i;
            document.getElementById('p'+i).innerHTML="Desc: This is sample video #"+i;
        }
}
var old;
function playvid(id)
{
    if(typeof old === "undefined")
    {
        old=id;
        initApp(id);
    }
    else if(id!=old)
    {
        document.getElementById(old).player.unload();
        document.getElementById(old).player.destroy();
        old=id;
        initApp(id);
    }
    else{
        this.player.unload();
        this.player.destroy();
        initApp(id);
    }
}
function initApp(id) 
{
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) 
    {
        initPlayer(id);
    } 
    else 
    {
        console.error('Browser not supported!');
    }
}
function initPlayer(id) 
{
    var video = document.getElementById(id);
    video.controls=true;
    player = new shaka.Player(video);
    window.player = player;
    player.addEventListener('error', onErrorEvent);
    var manifestUri = video.src;
    player.load(manifestUri).then(function() 
    {
        console.log('The video has now been loaded!');
    }).catch(onError);
}
function onErrorEvent(event)
{
  onError(event.detail);
}

function onError(error)
{
  console.error('Error code', error.code, 'object', error);
}