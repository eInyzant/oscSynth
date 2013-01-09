window.onload = init;
var context;
var bufferLoader;

function init() {
	context = new webkitAudioContext();
	oscillator = new Oscillator(context);
	keyboard = new Keyboard('keyboard', false);
	keyboard.connect(oscillator);
	bufferLoader = new BufferLoader(
		context,
		['../sounds/beat.mp3'],
		finishedLoading
	);
	jQuery('#container').on('click', '#osc', function(){
		oscillator.togglePlay();
	});
	jQuery('#container').on('change', '#osc_vol', function(){
		oscillator.changeVolume(jQuery(this).val());
	});
	jQuery('#container').on('change', '#osc_freq', function(){
		oscillator.changeFrequency(jQuery(this).val());
	});
	jQuery('#container').on('change', '#osc_type', function(){
		oscillator.changeType(jQuery(this).val());
	});
	bufferLoader.load();
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

	// source2.connect(context.destination);

	// source2.noteOn(0);
}

