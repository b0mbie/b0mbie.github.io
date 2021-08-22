var tileGrid;
var tiles = [];
// var hues = [0, 60, 120, 180, 240, 300];

var baseHue = 0;
var baseHueScrollSpeed = 7.5;

var hues = [0, 1.875, 3.75, 7.5, 15, 30, 60];
var saturations = [ 70 ];
var lightnesses = [ 75, 77.5, 80 ];

var fps = 50;
var fpsReciproc = 1 / fps;
var colorSpeed = 0.2;

var colorSetInterval;
var updateInterval;

var _curTile = 0;

function createTiles(amount)
{
    for (var i = 0; i < amount; i++)
    {
        var tile = document.createElement("DIV");
        tile.className = "grid-item";
        tile.id = "tile" + _curTile;
        tile.textContent = " ";
        tiles[_curTile] = tileGrid.appendChild(tile);
        tiles[_curTile].H = baseHue;
        tiles[_curTile].H_target = baseHue;
		tiles[_curTile].L = 75;
		tiles[_curTile].L_target = 75;
        _curTile += 1;
    }
}

function lerp(a, b, t)
{
    return a + (b - a) * t;
}

function delta(a, b, modulo)
{
    var aa = a % modulo, bb = b % modulo;
    if ((bb - aa) > (modulo * 0.5))
        return bb - aa - modulo;
    else if ((bb - aa) < (modulo * -0.5))
        return bb - aa + modulo;
    else
        return bb - aa;
}

function lerpHue(a, b, t)
{
    var d = delta(a, b, 360);
    return (a + d * t) % 360;
}

function getRandom(array)
{
    return array[Math.floor(Math.random() * array.length)];
}

function makeHSLString(h, s, l)
{
    return `hsl(${h},${s}%,${l}%)`;
}

window.onload = function ()
{
    tileGrid = document.getElementById("tileGrid");

    createTiles(8);

    colorSetInterval = setInterval(function ()
    {
        for (var i = 0; i < tiles.length; i++)
        {
            var t = tiles[i];
            t.H_target = (baseHue + getRandom(hues)) % 360;
            t.L_target = getRandom(lightnesses);
            // console.log(t.H - t.H_target, t.H, t.H_target);
        }
    }, 750);

    updateInterval = setInterval(function ()
    {
        for (var i = 0; i < tiles.length; i++)
        {
            var t = tiles[i];
            t.H = lerpHue(t.H, t.H_target, fpsReciproc * colorSpeed);
			t.L = lerp(t.L, t.L_target, fpsReciproc * colorSpeed);
            t.style.backgroundColor = makeHSLString(t.H, saturations[0], t.L);
        }
		
		baseHue = (baseHue + baseHueScrollSpeed * fpsReciproc) % 360;
    }, fpsReciproc);
};
