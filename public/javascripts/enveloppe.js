function Enveloppe(container_id){
	this.data = {
		container_id: (container_id || 'enveloppe'),
		attack: null,
		decay: null,
		sustain: null,
		release: null,
	};
	this.init();
}


Enveloppe.prototype.setAttack = function(value){
	this.data.attack = value;
}

Enveloppe.prototype.setDecay = function(value){
	this.data.decay = value;
}

Enveloppe.prototype.setSustain = function(value){
	this.data.sustain = value;
}

Enveloppe.prototype.setRelease = function(value){
	this.data.release = value;
}


Enveloppe.prototype.init = function(){
	var that = this;
	jQuery('document').ready(function(){
		var attack = jQuery('#' + that.data.container_id + ' .enveloppe_attack').val();
		var decay = jQuery('#' + that.data.container_id + ' .enveloppe_decay').val();
		var sustain = jQuery('#' + that.data.container_id + ' .enveloppe_sustain').val();
		var release = jQuery('#' + that.data.container_id + ' .enveloppe_release').val();
		that.setAttack(attack);
		that.setDecay(decay);
		that.setSustain(sustain);
		that.setRelease(release);

		jQuery('#' + that.data.container_id).on('change', '.enveloppe_attack', function(){
			var attack = jQuery(this).val();
			that.setAttack(attack);

		});
		jQuery('#' + that.data.container_id).on('change', '.enveloppe_decay', function(){
			var decay = jQuery(this).val();
			that.setDecay(decay);
		});
		jQuery('#' + that.data.container_id).on('change', '.enveloppe_sustain', function(){
			var sustain = jQuery(this).val();
			console.log(sustain);
			that.setSustain(sustain);
		});
		jQuery('#' + that.data.container_id).on('change', '.enveloppe_release', function(){
			var release = jQuery(this).val();
			that.setRelease(release);
		});
	});
}