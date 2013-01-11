function Keyboard (container_id, horizontal){
	this.horizontal = horizontal || false;
	this.octaveStart = 0;
	this.nbOctave = 0;
	this.pitch = 0;
	this.noteSchema = {
		notes : [
			{note: 'do', value:261.626, color:"white", keyval:"D", keycode:68},
			{note: 'do#', value:277.183, color:"black", keyval:"R", keycode:82},
			{note: 're', value:293.665, color:"white", keyval:"F", keycode:70},
			{note: 're#', value:311.127, color:"black", keyval:"T", keycode:84},
			{note: 'mi', value:329.628, color:"white", keyval:"G", keycode:71},
			{note: 'fa', value:349.228, color:"white", keyval:"H", keycode:72},
			{note: 'fa#', value:369.994, color:"black", keyval:"U", keycode:85},
			{note: 'sol', value:391.995, color:"white", keyval:"J", keycode:74},
			{note: 'sol#', value:415.305, color:"black", keyval:"I", keycode:73},
			{note: 'la', value:440, color:"white", keyval:"K", keycode:75},
			{note: 'la#', value:466.164, color:"black", keyval:"O", keycode:79},
			{note: 'si', value:493.883, color:"white", keyval:"L", keycode:76}
		]
	}
	this.keypressed = [];
	this.container_id = container_id || 'keyboard';
	this.sources = [];
}

Keyboard.prototype.display = function(){
	var html = '';
	var currentFreq = 0;
	var coef = 1;
	if(this.horizontal){
		html = '<input type="range" class="keyboard_pitch" min="-100" max="100" step="1" value="0" />';
		html += this.getHorizontalKeyboard();
	}else{
		html = '<input type="range" class="keyboard_pitch vertical" min="-100" max="100" step="1" value="0" />';
		html += this.getVerticalKeyboard();
	}

	jQuery('#' + this.container_id).html(html);
};

Keyboard.prototype.getHorizontalKeyboard = function(){
	for(var octave = (this.octaveStart + this.nbOctave); octave >= this.octaveStart; octave--){
		for(var note = (this.noteSchema.notes.length-1); note >= 0; note--){
			html += this.getKeyboardHtml(octave, note);
		}
	}
	return '<ul>' + html + '</ul>';
}

Keyboard.prototype.getVerticalKeyboard = function(){
	html = '';
	for(var octave = this.octaveStart; octave <= (this.octaveStart + this.nbOctave); octave++){
		for(note in this.noteSchema.notes){
			html += this.getKeyboardHtml(octave, note);
		}
	}
	return '<ul>' + html + '</ul>';
}

Keyboard.prototype.getKeyboardHtml = function(octave, note){
	var html = '';
	currentNote = this.noteSchema.notes[note];
	if(octave >= 0){
		currentFreq = currentNote.value * Math.pow(2, Math.abs(octave));
	}else{
		currentFreq = currentNote.value / Math.pow(2, Math.abs(octave));
	}
	var classH = (this.horizontal ? 'horizontal' : 'vertical');
	html += '<li class="' + classH + ' notes ' + currentNote.color + ' keycode_' + currentNote.keycode + '" id="note_' + currentFreq + '">' + currentNote.keyval + '</li>';
		
	return html;
}

Keyboard.prototype.changePitch = function(value){
	this.pitch = value;
	return this;
}

Keyboard.prototype.addSource = function(source){
	this.sources[source.container_id] = source;
	this.connect();
}

Keyboard.prototype.connect = function(){
	this.display();
	var that = this;
	jQuery('#' + this.container_id).on('mousedown', '.notes', function(){
		jQuery('.notes').removeClass('active_key');
		jQuery(this).addClass('active_key');
		var noteFreq = (parseFloat(jQuery(this).attr('id').replace('note_', '')) + parseFloat(that.pitch));
		for(var id in that.sources){
			that.sources[id].changeFrequency(noteFreq);
			that.sources[id].play();
		}
		
	});
	jQuery('#' + this.container_id).on('mouseup', '.notes', function(){
		jQuery('.notes').removeClass('active_key');
		for(var id in that.sources){
			that.sources[id].stop();
		}
	});

	jQuery('#' + this.container_id).on('mouseleave', '.notes', function(){
		jQuery('.notes').removeClass('active_key');
		for(var id in that.sources){
			that.sources[id].stop();
		}
	});
	jQuery('#' + this.container_id).on('change', '.keyboard_pitch', function(){
		var pitch = jQuery(this).val();
		that.changePitch(pitch);
		if(jQuery('.active_key').length > 0){
			var noteFreq = (parseFloat(jQuery('.active_key').attr('id').replace('note_', '')) + parseFloat(that.pitch));
			for(var id in that.sources){
				if(typeof(that.sources[id]) != 'undefined'){
					that.sources[id].changeFrequency(noteFreq);
				}
			}
		}
	});
	jQuery('#' + this.container_id).on('mouseup', '.keyboard_pitch', function(){
		jQuery(this).animate({value:0}, 300);
		that.changePitch(0);
		if(jQuery('.active_key').length > 0){
			var noteFreq = (parseFloat(jQuery('.active_key').attr('id').replace('note_', '')) + parseFloat(that.pitch));
			for(var id in that.sources){
				if(typeof(that.sources[id]) != 'undefined'){
					that.sources[id].changeFrequency(noteFreq);
				}
			}
		}
	});
	jQuery(document).keydown(function(event){
		var keyPressed = event.which;
		if(typeof(that.keypressed[keyPressed]) == 'undefined'){
			that.keypressed[keyPressed] = null;
		}
		if(jQuery('.keycode_' + keyPressed).length > 0 && that.keypressed[keyPressed] == null){
			that.keypressed[keyPressed] = true;
			jQuery('.notes').removeClass('active_key');
			jQuery('.keycode_' + keyPressed).addClass('active_key');
			var noteFreq = (parseFloat(jQuery('.keycode_' + keyPressed).attr('id').replace('note_', '')) + parseFloat(that.pitch));
			for(var id in that.sources){
				that.sources[id].changeFrequency(noteFreq);
				that.sources[id].play();
			}
		}
	});
	jQuery(document).keyup(function(event){
		delete that.keypressed[event.which];
		var isPressed = false;
		for(key in that.keypressed){
			isPressed = true;
		}
		if(!isPressed){
			jQuery('.notes').removeClass('active_key');
			for(var id in that.sources){
				that.sources[id].stop();
			}
		}
	});
	return this;
}