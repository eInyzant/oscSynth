function Oscillator (container_id, context){
	this.container_id = container_id || 'oscillator1';
	this.context = context || null;
	this.data = {
		gain: 0.8,
		frequence: 150,
		type: 0,
		attack: 0.1,
		decay: 0,
		sustain: 1,
		release: 0
	};

	this.init();
};

Oscillator.prototype.createConnection = function(callback){
	this.source = this.context.createOscillator();
	this.source.type = 0;
	this.gain = this.context.createGain();
	this.source.connect(this.gain);
	this.gain.connect(this.context.destination)
	this.source.frequency.value = this.data.frequency;
	this.source.type = this.data.type;
	this.gain.gain.value = 0;
	if(typeof(callback) == 'function'){
		callback();
	}
	return this;
};

Oscillator.prototype.play = function(){
	var that = this;
	if(typeof(that.source) != 'undefined'){
		that.stop();
	}
	this.createConnection(function(){
		that.source.start(0);

		var startTime = parseFloat(that.source.context.currentTime);
		

		var curveLength = parseFloat(that.source.context.sampleRate);
		var curveAttack = new Float32Array(curveLength);
		var coefAttack = parseFloat(that.data.gain / (curveLength - 1));
		var origAttack = parseFloat(0 - coefAttack);
		for (var i = 0; i < curveLength; ++i){
		    curveAttack[i] = (coefAttack * i) + origAttack;
		}
		that.gain.gain.setValueCurveAtTime(curveAttack, startTime, that.getAttack());


		var curveSustain = new Float32Array(curveLength);
		var finalSustain = that.data.gain * that.getSustain();
		var coefSustain = parseFloat((finalSustain - that.data.gain) / (curveLength - 1));
		var origSustain = parseFloat(that.data.gain - coefSustain);
		for (var i = 0; i < curveLength; ++i){
		    curveSustain[i] = (coefSustain * i) + origSustain;
		}
		that.gain.gain.setValueCurveAtTime(curveSustain, parseFloat(startTime + that.getAttack()), that.getDecay());
	});
};

Oscillator.prototype.stop = function (time){
	var time = time || 0;
	if(typeof(this.source) != 'undefined'){
		var curveLength = parseFloat(this.source.context.sampleRate);
		var curveSustain = new Float32Array(curveLength);
		var coef =  (0 - this.gain.gain.value) / (curveLength - 1);
		var orig = this.gain.gain.value - (coef * 1);

		for (var i = 0; i < curveLength; ++i)
		    curveSustain[i] = (coef * i) + orig; 

		this.gain.gain.setValueCurveAtTime(curveSustain, parseFloat(this.source.context.currentTime), this.getRelease());
		this.source.stop(parseFloat(this.source.context.currentTime + this.getRelease()));
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

Oscillator.prototype.setEnveloppe = function(enveloppe){
	this.data.enveloppe = enveloppe || null;
	return this;
};

Oscillator.prototype.getAttack = function(){
	if(typeof(this.data.enveloppe) != 'undefined'){
		return parseFloat(this.data.enveloppe.data.attack);
	}
	return parseFloat(this.data.attack);
};

Oscillator.prototype.getDecay = function(){
	if(typeof(this.data.enveloppe) != 'undefined'){
		return parseFloat(this.data.enveloppe.data.decay);
	}
	return parseFloat(this.data.decay);
};

Oscillator.prototype.getSustain = function(){
	if(typeof(this.data.enveloppe) != 'undefined'){
		return parseFloat(this.data.enveloppe.data.sustain);
	}
	return parseFloat(this.data.sustain);
};

Oscillator.prototype.getRelease = function(){
	if(typeof(this.data.enveloppe) != 'undefined'){
		return parseFloat(this.data.enveloppe.data.release);
	}
	return parseFloat(this.data.release);
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

