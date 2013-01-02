function Oscillator (context){
	this.context = context || null;
	this.data = {
		gain: 100,
		frequence: 150,
		type: 0
	};
};

Oscillator.prototype.play = function(){
	var that = this;
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

Oscillator.prototype.stop = function (){
	if(typeof(this.source) != 'undefined'){
		this.source.stop(0);
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