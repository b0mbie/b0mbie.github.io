
let fov = 60;
let vfov = 1;

let captionTop = null;
let captionBottom = null;

let captionShadow = "6px";

function updateCaptions()
{
    captionTop.style("font-size", height / 6);
    captionTop.center("horizontal");
    captionTop.style("top", 0);

    captionBottom.style("font-size", height / 6);
    captionBottom.center("horizontal");
    captionBottom.style("top", height * 5 / 6);
}

function createCaption(text)
{
    let caption = createP(text);

    caption.style("font-family", "Impact");

    caption.style("color", "white");

    caption.style("text-shadow", [
        `black 0                 ${captionShadow}   ${captionShadow}`,
        `black ${captionShadow}  ${captionShadow}   ${captionShadow}`,
        `black ${captionShadow}  0                  ${captionShadow}`,
        `black ${captionShadow}  -${captionShadow}  ${captionShadow}`,
        `black 0                 -${captionShadow}  ${captionShadow}`,
        `black -${captionShadow} -${captionShadow}  ${captionShadow}`,
        `black -${captionShadow} 0                  ${captionShadow}`,
        `black -${captionShadow} ${captionShadow}   ${captionShadow}`
    ].join(','));

    return caption;
}

function calcVFOV()
{
    vfov = Math.atan(Math.tan(fov / 180 * Math.PI / 2) * height / width) * 180 / Math.PI * 4;
}

let oter = {
    image: null,
    rotation: 0,
    model: null
};

function preload()
{
    oter.image = loadImage("./aty.png");
    oter.model = loadModel("./aty.obj", false);
}

function setup()
{
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    calcVFOV();
    
    perspective(vfov, width / height, 0.1, 10000);

    captionTop = createCaption("GET");
    captionTop.style("transform", "translateY(-80%)");

    captionBottom = createCaption("OTTERCUBED");
    captionBottom.style("transform", "translateY(-100%)");

    updateCaptions();
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
    calcVFOV();
    angleMode(DEGREES);
    perspective(vfov, width / height, 0.1, 10000);

    updateCaptions();
}

function draw()
{
    background("#414141");
    
    oter.rotation -= deltaTime * 0.1;
    
    angleMode(DEGREES);
    push();
        texture(oter.image);
        scale(384);
        translate(0, 0, -4);
        rotateX(oter.rotation);
        rotateY(oter.rotation);
        rotateZ(oter.rotation);
        noStroke();
        model(oter.model);
    pop();
}
