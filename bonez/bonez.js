/// TOODOODOODOODOODOO
let bttb = null,
    imageDisplay = null;

let bttbTimer = null;

let images = [];

/// Update the image in the image display.
function updateImage()
{
    let newSrc = images[Math.floor(Math.random() * images.length)];
    if (newSrc == imageDisplay.getAttribute("src"))
        updateImage();
    else imageDisplay.setAttribute("src", newSrc);
}

function readImageList(data)
{
    const utf8Decoder = new TextDecoder('utf-8');
    let lines = data.value ? utf8Decoder.decode(data.value).split('\n') : [];
    for (let i = 0; i < lines.length; i++)
    {
        let line = lines[i].replaceAll('\r', '');
        if (line == '') continue;

        images.push("./images/" + line);
    }
}

/// Initialize everything.
function init()
{
    bttb = document.createElement("AUDIO");
    bttb.setAttribute("src", "./bad_to_the_bone.wav");
    bttb.setAttribute("preload", "auto");

    bttb.addEventListener("play", updateImage);

    imageDisplay = document.getElementById("image_display");

    // get images
    fetch("./images/skeletangs.txt")
        .then(resp => resp.body.getReader())
        .then(reader => reader.read())
        .then(readImageList);
    
    bttbTimer = setInterval(function ()
    {
        let src = bttb.getAttribute("src");
        bttb.setAttribute("src", '');
        bttb.setAttribute("src", src);
        bttb.play();

        updateImage();
    }, 4000);
}

