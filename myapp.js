var old;
window.onload=function()
{
    //Creating the videos grid
    var vgrid = document.getElementById("vidgrid");
    var n=1,v=1;
    for(var i=1;i<=12;i++) // Adding 18 videos with,3 videos per row with one row above for category= 12 rows
    { //in practical application the number 12 will be replaced by doubling the number of videos in the database
        var vrow=document.createElement("tr");
        if((i%2)!=0) //because in odd row number we print the category and even row number the videos
        {
            vrow.innerHTML = 
                "<th colspan='3'>"
                    +"<h3>Category "+n+"</h3>"
                +"</th>";
            n+=1; //used to count the category number
        }
        else
        {
            for(var j=1;j<=3;j++) //each row has 3 videos
            {
                var vdata=document.createElement("td");
                var vid = document.createElement("div");
                vid.className = "vid";
                vid.innerHTML = 
                    "<center>"
                        +"<div class='player'><video id='video"+v+"'"
                        +"</video></div>"
                        +"<div class='content'><h3 id='h"+v+"'></h3>"
                        +"<p id='p"+v+"'></p></div>"
                    +"</center>";
                vdata.appendChild(vid);
                vrow.appendChild(vdata);
                v+=1; //used to count the video content number
            }
        }
        vgrid.appendChild(vrow);
    }
    //Giving sample titles and descriptions to the videos
    for(var i=1;(document.getElementById('video'+i))!=null;i++)
    {
        document.getElementById('h'+i).innerHTML="Video #"+i;
        document.getElementById('p'+i).innerHTML="This is sample video #"+i;
    }
    var plinks = ["https://helveticman.com/wp-content/uploads/2018/03/ButtonPlay1-300x180.jpg",
                  "http://www.scifimoviepage.com/wp-content/uploads/2018/06/STAR-TREK-crop-300x180.jpg",
                  "http://www.scifimoviepage.com/wp-content/uploads/2019/10/angel-1-300x180.jpg",
                 "https://www.cstindustries.com/wp-content/uploads/2017/04/2013-02-15-10.26_low-res-300x180.jpg",
                 "./poster.png",
                 "http://tubepromaster.com/wp-content/uploads/2018/10/youtubeseo-300x180.png"];
    //setting up the video posters for all the videos from the above links from 1 to 6 and repeats
    var j;
    for(var i=1;(j=document.getElementById('video'+i))!=null;i++)
    {
        switch(i%6)
        {
            case 0: j.poster=plinks[0];
                    break;
            case 1: j.poster=plinks[1];
                    break;
            case 2: j.poster=plinks[2];
                    break;
            case 3: j.poster=plinks[3];
                    break;
            case 4: j.poster=plinks[4];
                    break;
            case 5: j.poster=plinks[5];
                    break;
        }
    }
    var links = ["http://rdmedia.bbc.co.uk/dash/ondemand/bbb/2/client_manifest-common_init.mpd",                "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd", "http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd", "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd", "http://rdmedia.bbc.co.uk/dash/ondemand/testcard/1/client_manifest-events.mpd", "http://rdmedia.bbc.co.uk/dash/ondemand/elephants_dream/1/client_manifest-all.mpd"];
    //setting up the video sources for all the videos from the above links from 1 to 6 and repeats
    var j;
    for(var i=1;(j=document.getElementById('video'+i))!=null;i++)
    {
        switch(i%6)
        {
            case 0: j.src=links[0];
                    break;
            case 1: j.src=links[1];
                    break;
            case 2: j.src=links[2];
                    break;
            case 3: j.src=links[3];
                    break;
            case 4: j.src=links[4];
                    break;
            case 5: j.src=links[5];
                    break;
        }
    }
    //setting up the required video events for all the videos
    var j;
    for(var i=1;(j=document.getElementById('video'+i))!=null;i++)
    {
        j.setAttribute("onclick","playvid('video"+i+"')");
        j.setAttribute("onplay","pauseall('video"+i+"')");
    }
    shaka.polyfill.installAll();
}
function playvid(id) 
{
    if (shaka.Player.isBrowserSupported()) 
    {
        document.getElementById(id).controls=true;
        document.getElementById(id).onclick=null;
        if(old != id && !(typeof old === "undefined"))
            document.getElementById(old).pause();
        initPlayer(id);
        document.getElementById(id).play();
    } 
    else 
    {
        console.error('Browser not supported!');
    }
}
function initPlayer(id) 
{
    var video = document.getElementById(id);
    var manifestUri=video.src;
    var player = new shaka.Player(video);
    window.player = player;
    player.addEventListener('error', onErrorEvent);
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
function pauseall(id)
{
    if(old != id && !(typeof old === "undefined"))
            document.getElementById(old).pause();
    old=id;
}
