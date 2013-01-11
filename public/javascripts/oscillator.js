function Oscillator (container_id, context){
	this.container_id = container_id || 'oscillator1';
	this.context = context || null;
	this.data = {
		gain: 0.8,
		frequence: 150,
		type: 0
	};

	this.init();
};

Oscillator.prototype.play = function(){
	var that = this;
	if(typeof(that.source) != 'undefined'){
		that.stop();
	}
	this.createConnection(function(){
		that.source.start(0);
	});
};

Oscillator.prototype.createConnection = function(callback){
	this.source = this.context.createOscillator();
	this.source.type = 0;
	this.gain = this.context.createGain();
	this.source.connect(this.gain);
	this.gain.connect(this.context.destination)
	this.source.frequency.value = this.data.frequency;
	this.source.type = this.data.type;
	this.gain.gain.value = this.data.gain;
	if(typeof(callback) == 'function'){
		callback();
	}
	return this;
}

Oscillator.prototype.stop = function (time){
	var time = time || 0;
	if(typeof(this.source) != 'undefined'){
		this.source.stop(time);
		delete this.source;
	}
};

Oscillator.prototype.togglePlay = function(){
	if(typeof(this.source) != 'undefined'){
		this.stop();
	}else{
		this.play();
	}
}

Oscillator.prototype.changeType = function (value){
	if(typeof(this.source) != 'undefined'){
		this.source.type = value;
	}
	this.data.type = value;
}

Oscillator.prototype.changeFrequency = function (value){
	if(typeof(this.source) != 'undefined'){
		this.source.frequency.value = value;
	}
	this.data.frequency = value;
};

Oscillator.prototype.changeVolume = function (value){
	if(typeof(this.gain) != 'undefined'){
		this.gain.gain.value = (value / 100);
	}
	this.data.gain = (value / 100);
};

Oscillator.prototype.init = function(){
	var that = this;
	jQuery('#' + this.container_id).on('click', '.osc', function(){
		that.togglePlay();
	});
	jQuery('#' + this.container_id).on('change', '.osc_vol', function(){
		that.changeVolume(jQuery(this).val());
	});
	jQuery('#' + this.container_id).on('change', '.osc_freq', function(){
		that.changeFrequency(jQuery(this).val());
	});
	jQuery('#' + this.container_id).on('change', '.osc_type', function(){
		that.changeType(jQuery(this).val());
	});
}