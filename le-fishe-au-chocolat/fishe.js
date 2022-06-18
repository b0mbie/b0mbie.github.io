let caption = null,
    fishe = null,
    startBtn = null;

let intro = null;
let audioID = "wgNPCKuX9ds";
let player = null;

/// Initialize stuff.
function init()
{
    // get elements
    caption = document.getElementById("caption");
    fishe = document.getElementById("fishe");
    startBtn = document.getElementById("startbtn");
    startBtn.addEventListener("click", () => {
        start();
        startBtn.remove();
    });

    // create intro audio
    intro = document.createElement("audio");
    intro.setAttribute("src", "./intro.wav");
    intro.setAttribute("preload", "auto");
    intro.setAttribute("controls", "none");
    intro.style.display = "none";
    document.body.appendChild(intro);

    // stretch caption
    stretchText();
}

/// Stretch caption width to fit into the same size as fishe.
function stretchText()
{
    let cwidth = caption.getBoundingClientRect().width / (caption.scaleFactor || 1);
    let fwidth = fishe.getBoundingClientRect().width;
    let factor = fwidth / cwidth;
    if (factor < 1.02 && factor > 0.98) return;
    caption.style.transform = "translate(-50%, 0) scaleX(" + factor + ')';
    caption.scaleFactor = factor;
}

/// Play "Happy Day in Paris".
function playMusic()
{
    player.playVideo();
}

/// Play intro, then music.
function start()
{
    intro.play();
    intro.addEventListener("ended", playMusic);

    if (!player)
    {
        player = new YT.Player("youtube-player", {
            height: '0',
            width: '0',
            videoId: audioID,
            playerVars: {
                autoplay: '0',
                loop: '1'
            },
            events: {
                'onReady': function (e)
                {
                    console.log("YouTube player ready\nLet's go out\nto have some\nfish for dinner");
                }
            }
        });
    }
}

function changeCaptionText(text)
{
    caption.textContent = text;
    setTimeout(stretchText, 10);
}

function onYouTubeIframeAPIReady()
{
    let div = document.createElement("div");
    div.setAttribute("id", "youtube-player");
    document.body.appendChild(div);

    player = new YT.Player("youtube-player", {
        height: '0',
        width: '0',
        videoId: audioID,
        playerVars: {
            autoplay: '0',
            loop: '1'
        },
        events: {
            'onReady': function (e)
            {
                console.log("YouTube player ready\nLet's go out\nto have some\nfish for dinner");
            }
        }
    });
}
