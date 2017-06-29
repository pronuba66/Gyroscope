
"use strict";
function _gyro_camera(gyro) {

	var parent = gyro.gyroCamera = this;

	parent.radius = 384;
	parent.phi = Math.PI/3;
	parent.theta = 0;

	gyro.camera = new THREE.PerspectiveCamera(45, 16/9, 1, 8192);

	parent.init = function() {

		$('#canvas').on('scroll touchmove mousewheel', function(e){
			e.preventDefault();
			e.stopPropagation();
			e.delta = null;
			if(e.originalEvent) {
				if(e.originalEvent.wheelDelta) e.delta = e.originalEvent.wheelDelta/-40;
				if(e.originalEvent.deltaY) e.delta = e.originalEvent.deltaY;
				if(e.originalEvent.detail) e.delta = e.originalEvent.detail;
			}
			if(e.delta != null) {
				parent.radius -= e.delta;
				if(parent.radius<32) {
					parent.radius = 32;
				}
				if(parent.radius>1024) {
					parent.radius = 1024;
				}
			}
			return false;
		});
		$(document).on('keydown', function(e) {
			switch(e.keyCode) {
				//+
				case 187: {
					parent.radius -= 32;
					if(parent.radius<32) {
						parent.radius = 32;
					}
					break;
				}
				//-
				case 189: {
					parent.radius += 32;
					if(parent.radius>1024) {
						parent.radius = 1024;
					}
					break;
				}
				//Up
				case 38: {
					parent.phi -= (Math.PI/180)*5;
					if(parent.phi<Math.PI*(5/180)) {
						parent.phi = Math.PI*(5/180);
					}
					break;
				}
				//Down
				case 40: {
					parent.phi += (Math.PI/180)*5;
					if(parent.phi>Math.PI-Math.PI*(30/180)) {
						parent.phi = Math.PI-Math.PI*(30/180);
					}
					break;
				}
				//Left
				case 37: {
					parent.theta -= (Math.PI/180)*5;
					break;
				}
				//Right
				case 39: {
					parent.theta += (Math.PI/180)*5;
					break;
				}
				default: {
					break;
				}
			}
		});
	}
	parent.physics = function() {
		var v = new THREE.Vector3().setFromSpherical(new THREE.Spherical(parent.radius, parent.phi, parent.theta));
		gyro.camera.position.set(v.x, v.y, v.z);
		gyro.camera.lookAt(new THREE.Vector3(gyro.group.position.x, gyro.group.position.y/2, gyro.group.position.z));
	}
}