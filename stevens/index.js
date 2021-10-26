var glados = new Audio("glados_intro.wav");
glados.volume = 0.35;

var corridor = new LoopedAudio("corridor2.wav", 0.1);
var radio = new LoopedAudio("looping_radio_mix.wav", 0.15);
var footsteps = new LoopedAudio("steppies.wav", 1);

window.onload = function ()
{
    document.getElementById("startButton").onclick = function onclick()
    {
        corridor.play();
        radio.play();
        footsteps.play();
        setTimeout(function ()
        {
            glados.play();
        }, 6000);

        this.remove();
    };
};