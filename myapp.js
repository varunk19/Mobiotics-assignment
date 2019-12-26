window.onload=function()
{
    var j;
    for(var i=1;(j=document.getElementById('h'+i))!=null;i++)
        {
            j.innerHTML="Title: Video #"+i;
            document.getElementById('p'+i).innerHTML="Desc: This is sample video #"+i;
        }
}
function playvid(id)
{
    var j;
    for(var i=1;(j=document.getElementById('video'+i))!=null;i++)
    {
        j.controls=false;
    }
    document.getElementById(id).controls=true;
    initApp(id);
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
    var player = new shaka.Player(video);
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
