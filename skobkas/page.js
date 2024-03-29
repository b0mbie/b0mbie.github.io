var happiness = 1;
var nbsp = document.createTextNode("\u00A0").textContent;

var genLength = 12;

function getPaddedInNBSP(txt, count)
{
	return nbsp.repeat(count) + txt + nbsp.repeat(count);
}

function onHappinessChange(event)
{
	happiness = event.target.value;
	
	var newSymbol = (happiness == 1) ? presetTypes.happy.symbol : presetTypes.sad.symbol;
	document.getElementById("genButton").textContent = getPaddedInNBSP(newSymbol, 3);
}

function generateToText()
{
	document.getElementById("skobkas").textContent = generateSkobkas((happiness == 1) ? presetTypes.happy : presetTypes.sad, genLength);
}

function selectSkobkas(event)
{
	var el = event.target;
	var range = document.createRange();
	range.selectNodeContents(el);
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
}

window.onload = function ()
{
	document.getElementById("happiness").onchange = onHappinessChange;
	document.getElementById("genButton").onclick = generateToText;
	document.getElementById("skobkas").onclick = selectSkobkas;
};
