window.onload = init;
var context;
var bufferLoader;

function init() {
	context = new webkitAudioContext();
	keyboard = new Keyboard('keyboard', false);

	oscillator1 = new Oscillator('oscillator1', context);
	enveloppe1 = new Enveloppe('enveloppe1');
	oscillator1.setEnveloppe(enveloppe1);
	keyboard.addSource(oscillator1);

	oscillator2 = new Oscillator('oscillator2', context);
	enveloppe2 = new Enveloppe('enveloppe2');
	oscillator2.setEnveloppe(enveloppe1);
	keyboard.addSource(oscillator2);

	/*
	bufferLoader = new BufferLoader(
		context,
		['../sounds/beat.mp3'],
		finishedLoading
	);
	bufferLoader.load();
	*/
}

function finishedLoading(bufferList) {
	// Create two sources and play them both together.
	var source1 = context.createBufferSource();
	var gain = context.createGain();
	var playing = false;
	
	source1.loop = true;
	source1.buffer = bufferList[0];

	source1.connect(gain);
	gain.connect(context.destination);
	jQuery('#container').on('click', '#play', function(){
		if(!playing){
			source1.start(0);
			playing = true;
		}else{
			source1.stop(0);
			playing = false;
		}
	});
	jQuery('#container').on('change', '#volume', function(){
		gain.gain.value = (jQuery(this).val() / 100);
	});
}

