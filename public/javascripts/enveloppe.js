function Enveloppe(container_id){
	this.data = {
		container_id: (container_id || 'enveloppe'),
		attack: 1,
		decay: 1,
		sustain: 1,
		release: 1,
	};
	this.init();
}


Enveloppe.prototype.changeAttack = function(value){
	this.data.attack = value;
}

Enveloppe.prototype.changeDecay = function(value){
	this.data.decay = value;
}

Enveloppe.prototype.changeSustain = function(value){
	this.data.sustain = value;
}

Enveloppe.prototype.changeRelease = function(value){
	this.data.release = value;
}

Enveloppe.prototype.init = function(){
	var that = this;
	jQuery('document').ready(function(){
		jQuery('#' + that.data.container_id).on('change', '.enveloppe_attack', function(){
			var attack = jQuery(this).val();
			that.changeAttack(attack);

		});
		jQuery('#' + that.data.container_id).on('change', '.enveloppe_decay', function(){
			var decay = jQuery(this).val();
			that.changeDecay(decay);
		});
		jQuery('#' + that.data.container_id).on('change', '.enveloppe_sustain', function(){
			var sustain = jQuery(this).val();
			that.changeSustain(sustain);
		});
		jQuery('#' + that.data.container_id).on('change', '.enveloppe_release', function(){
			var release = jQuery(this).val();
			that.changeRelease(release);
		});
	});
}