
"use strict";
function _gyro_renderer(gyro) {

	var parent = gyro.gyroRenderer = this;
	
	parent.renderer = new THREE.WebGLRenderer({
		antialias: true,
		sortObjects: false,
		preserveDrawingBuffer: true,
		shadowMapEnabled: true
	});
	$('#canvas').append(parent.renderer.domElement);
	parent.dime = function() {
		var ratio = window.innerWidth/window.innerHeight;
		if(ratio > 16/9) {
			parent.renderer.setSize(window.innerHeight*(16/9), window.innerHeight);
		} else {
			parent.renderer.setSize(window.innerWidth, window.innerWidth*(9/16));
		}
	}
	parent.init = function() {
		parent.renderer.shadowMap.enabled = true;
		parent.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		parent.dime();
		$(parent.dime);
		$(window).resize(parent.dime);
	}
	parent.physics = function() {
	}
}