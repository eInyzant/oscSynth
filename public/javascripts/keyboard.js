function Keyboard (container_id){
	this.octaveStart = -2;
	this.nbOctave = 4;
	this.noteSchema = {
		notes : [
			{note: 'do', value:261.626, color:"white"},
			{note: 'do#', value:277.183, color:"black"},
			{note: 're', value:293.665, color:"white"},
			{note: 're#', value:311.127, color:"black"},
			{note: 'mi', value:329.628, color:"white"},
			{note: 'fa', value:349.228, color:"white"},
			{note: 'fa#', value:369.994, color:"black"},
			{note: 'sol', value:391.995, color:"white"},
			{note: 'sol#', value:415.305, color:"black"},
			{note: 'la', value:440, color:"white"},
			{note: 'la#', value:466.164, color:"black"},
			{note: 'si', value:493.883, color:"white"}
		]
	}
	this.container_id = container_id || 'keyboard';
}

Keyboard.prototype.display = function(){
	var html = '';
	var currentFreq = 0;
	var coef = 1;
	for(var octave = this.octaveStart; octave <= (this.octaveStart + this.nbOctave); octave++){

		for(note in this.noteSchema.notes){
			currentNote = this.noteSchema.notes[note];
			if(octave >= 0){
				currentFreq = currentNote.value * Math.pow(2, Math.abs(octave));
			}else{
				currentFreq = currentNote.value / Math.pow(2, Math.abs(octave));
			}

			console.log(octave, currentFreq);
			html += '<div class="notes ' + currentNote.color + '" id="note_' + currentFreq + '">' + currentNote.note + '</div>';
		}
	}
	jQuery('#' + this.container_id).html(html);
};

Keyboard.prototype.connect = function(source){
	this.display();
	jQuery('#' + this.container_id).on('mousedown', '.notes', function(){
		var noteFreq = jQuery(this).attr('id').replace('note_', '');
		source.changeFrequency(noteFreq);
		source.play();
	});
	jQuery('#' + this.container_id).on('mouseup', '.notes', function(){
		source.stop();
	});

	jQuery('#' + this.container_id).on('mouseleave', '.notes', function(){
		source.stop();
	});
}