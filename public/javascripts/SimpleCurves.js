function SimpleCurves (){ }

SimpleCurves.prototype.getCurve = function(startPoint, endPoint, coef){
	try{
		var coef = parseInt(coef) | 0;
		if(typeof(startPoint) != 'object'){
			throw new Error('startPoint must be an Object (eg: startPoint = {"x": 0, "y": 0}');
		}
		if(typeof(endPoint) != 'object'){
			throw new Error('endPoint must be an Object (eg: endPoint = {"x": 30, "y": 10}');
		}
		if(coef < 0){
			return this.getExpCurve(startPoint, endPoint, coef);
		}else if(coef > 0){
			return this.getLogCurve(startPoint, endPoint, coef);
		}else{
			return this.getLinearCurve(startPoint, endPoint);
		}
	}catch(e){
		console.log(e.stack);
	}
	return false;
};

SimpleCurves.prototype.getExpCurve = function(startPoint, endPoint, coef){
	try{

		throw new Error('Not supported at this time');

		if(typeof(startPoint) != 'object'){
			throw new Error('startPoint must be an Object (eg: startPoint = {"x": 0, "y": 0}');
		}
		if(typeof(endPoint) != 'object'){
			throw new Error('endPoint must be an Object (eg: endPoint = {"x": 30, "y": 10}');
		}
	}catch(e){
		console.log(e.stack);
	}
	return false;
};

SimpleCurves.prototype.getLogCurve = function(startPoint, endPoint, coef){
	try{

		throw new Error('Not supported at this time');

		if(typeof(startPoint) != 'object'){
			throw new Error('startPoint must be an Object (eg: startPoint = {"x": 0, "y": 0}');
		}
		if(typeof(endPoint) != 'object'){
			throw new Error('endPoint must be an Object (eg: endPoint = {"x": 30, "y": 10}');
		}
	}catch(e){
		console.log(e.stack);
	}
	return false;
};

SimpleCurves.prototype.getLinearCurve = function(startPoint, endPoint){
	try{
		if(typeof(startPoint) != 'object'){
			throw new Error('startPoint must be an Object (eg: startPoint = {"x": 0, "y": 0}');
		}
		if(typeof(endPoint) != 'object'){
			throw new Error('endPoint must be an Object (eg: endPoint = {"x": 30, "y": 10}');
		}

		var curveLength = parseFloat(endPoint.x);
		var curve = new Float32Array(curveLength);
		var gradient = parseFloat((endPoint.y - startPoint.y) / (endPoint.x -1 - startPoint.x));
		var origin = parseFloat(startPoint.y - (gradient * startPoint.x));

		for(var i = startPoint.x; i <= endPoint.x; i++){
			curve[i] = (gradient * i) + origin;
		}

		return curve;
	}catch(e){
		console.log(e.stack);
	}
	return false;
};