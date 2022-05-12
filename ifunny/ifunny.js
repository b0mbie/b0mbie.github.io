let canvas = null,
    ctx = null,
    mImage = null;

let text = "me when the",
    textSize = 32, // this is a placeholder, must change when an image is loaded
    lineSpacing = 8,
    margin = 8, // also a placeholder
    sizeMult = 0.1;

function loadImage(event)
{
    mImage.src = URL.createObjectURL(event.target.files[0]);
    mImage.onload = updateParams;
}

function getLines(text, size)
{
    return textwrap.simple(text, (canvas.width - margin * 2) / size * 2);
}

function initCanvas(img)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let txt = getLines(text, textSize);
    let headerSize = textSize + textSize * txt.length + Math.max(0, lineSpacing * (txt.length - 1));

    mImage.hypotenuse = Math.sqrt(img.width * img.width + img.height * img.height);
    canvas.width = img.width;
    canvas.height = img.height + headerSize;
    ctx.drawImage(img, 0, headerSize);

    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, headerSize)
    ctx.restore();
}

function drawCaption(text, size, x, y)
{
    ctx.save();
    
    ctx.font = size + "px LimerickCdSerial-Xbold";
    ctx.textAlign = "center";
    
    // black text
    ctx.fillStyle = "black";
    
    // wrap text (js please make this not so painful)
    let txt = getLines(text, textSize);

    // fill text
    for (let i = 0; i < txt.length; i++)
    {
        ctx.fillText(txt[i], x, y + size * i + Math.max(0, lineSpacing * i));
    }
    
    ctx.restore();
}

function updateImage()
{
    textSize = mImage.hypotenuse * sizeMult;
    margin = mImage.width * 0.005;
    initCanvas(mImage);
    drawCaption(text, textSize, canvas.width * 0.5, textSize * 1.25);
}

function updateParams()
{
    text = getString("captionText");
    sizeMult = getFloat("textSize") * 0.01;
    updateImage();
}

function init()
{
    mImage = document.getElementById("memeImage");
    canvas = document.getElementById("imgCanvas");
    ctx = canvas.getContext("2d");

    updateParams();
}

function downloadImage()
{
    if (mImage.src === '') return;
        
    // get canvas data
    let data = canvas.toDataURL("image/png");
        
    // create an <a> element and assign the data
    let link = document.createElement("a");
    link.download = "ifunny.png";
    link.href = data;
        
    // simulate download link press
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
