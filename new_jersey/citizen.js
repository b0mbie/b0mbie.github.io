let citizens = null;

/// Get time (in ms).
function time()
{
	return Date.now() * 0.001;
}

/// Create an invisible audio element.
function createAudio(src, parent)
{
	let au = document.createElement("audio");
	au.src = src;
	au.setAttribute("preload", "auto");
	au.setAttribute("controls", "none");
	au.style.display = "none";
	if (parent) parent.appendChild(au);
	return au;
}

let hell = createAudio("./sound/fart_hell.mp3");
let join = createAudio("./sound/join.wav");

function play(snd)
{
	let _SRC = snd.src;
	snd.src = '';
	snd.src = _SRC;
	snd.play()
		.catch(e =>
		{
			console.log("Can't play sound.", e);
		});
}

function stop(snd)
{
	snd.pause();
	let _SRC = snd.src;
	snd.src = '';
	snd.src = _SRC;
}

// array of created citizens
let createdCitizens = [];

let boowompTime = 0.34;

/// Get random time to next boowomp.
function nextBoowomp()
{
	return boowompTime + Math.random() * 1.2; // magic numbers
}

/// Play boowomp.
function playBoowomp(cit)
{
	play(cit.boowomp);
	cit.nextBoowomp = time() + nextBoowomp();
}

// absolute hell state
let hellPlaying = false;

/// Play absolute hell.
function playHell(e)
{
	// only respond to left clicks
	if (e.button !== 0) return;

	hellPlaying = true;

	// turn citizens off
	for (let i = 0; i < createdCitizens.length; i++)
	{
		let citizen = createdCitizens[i];
		citizen.img.src = "./citizen_off.png";
	}

	// turn this citizen on
	if (e.target.img)
	{
		e.target.img.src = "./citizen_on.png";
	}
	else
	{
		e.target.src = "./citizen_on.png";
	}

	// play absolute hell
	play(hell);
}

/// Stop absolute hell.
function stopHell(e)
{
	// only respond to left unclicks
	if (e.button !== 0) return;

	hellPlaying = false;

	e.target.src = "./citizen_off.png";
	stop(hell);
}

function createCitizen()
{
	if (helpText)
	{
		helpText.remove();
		helpText = undefined;
	}

	let nCitizen = document.createElement("li");

	// citizen voice state
	nCitizen.img = document.createElement("img");
	nCitizen.img.src = "./citizen_off.png";
	nCitizen.img.style.cursor = "pointer";
	
	// absolute hell interaction
	nCitizen.img.onpointerdown = playHell;
	nCitizen.img.onpointerup = stopHell;
	nCitizen.img.onpointerenter = function (e) { if (!e.target.paused) return; e.target.src = "./citizen_off.png"; stop(hell); };

	nCitizen.appendChild(nCitizen.img);

	// boowomp sound & state
	nCitizen.boowomp = createAudio("./sound/boowomp.ogg", nCitizen);
	nCitizen.boowomp.onplay = function (e)
	{
		e.target.parentElement.img.src = "./citizen_on.png";
	};
	nCitizen.boowomp.onended = function (e)
	{
		if (hellPlaying) return;
		e.target.parentElement.img.src = "./citizen_off.png";
	};
	nCitizen.nextBoowomp = time() + boowompTime + nextBoowomp();
	
	citizens.appendChild(nCitizen);

	createdCitizens.push(nCitizen);

	return nCitizen;
}

/// Update rate.
let rate = 50;

/// Initialize everything.
function init()
{
	// set citizens element
	citizens = document.getElementById("citizens");

	// set help text element
	helpText = document.getElementById("help_text");

	// append join audio element
	document.body.appendChild(join);

	setInterval(function ()
	{
		if (hellPlaying)
		{
			let dt = 1/rate;

			for (let i = 0; i < createdCitizens.length; i++)
			{
				let citizen = createdCitizens[i];

				// stop current boowomp
				stop(citizen.boowomp);

				// offset citizen next boowomp
				citizen.nextBoowomp += dt;
			}
			return;
		}

		for (let i = 0; i < createdCitizens.length; i++)
		{
			let citizen = createdCitizens[i];
			if (citizen.nextBoowomp <= time())
			{
				playBoowomp(citizen);
			}
		}
	}, 1000/rate);
}
