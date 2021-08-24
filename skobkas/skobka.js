/// skobka.js
// probably not meant to be used elsewhere
// made with love)))0)0)))))0))))0)))

function SkobkaType(symbol, number)
{
	this.symbol = symbol;
	this.number = number;
}

var presetTypes = {
	happy: new SkobkaType(')', '0'),
	sad: new SkobkaType('(', '9')
};

function generateSkobkas(type, length = 8)
{
    var skobkaText = '';
    for (var i = 0; i < length; i++)
        skobkaText += (Math.random() > 0.75) ? type.number : type.symbol;
    return skobkaText;
}
