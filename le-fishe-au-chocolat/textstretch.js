let caption = null,
    fishe = null;

/// Initialize stuff.
function init()
{
    caption = document.getElementById("caption");
    fishe = document.getElementById("fishe");
    stretchText();
}

/// Stretch text width to fit into the same size as fishe.
function stretchText()
{
    let cwidth = caption.getBoundingClientRect().width / (caption.scaleFactor || 1);
    let fwidth = fishe.getBoundingClientRect().width;
    let factor = fwidth / cwidth;
    console.log(cwidth, fwidth, factor, caption.scaleFactor);
    if (factor < 1.02 && factor > 0.98) return;
    caption.style.transform = "scaleX(" + factor + ')';
    caption.scaleFactor = factor;
}
