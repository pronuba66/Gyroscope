
"use strict";
function _gyro_camera(gyro) {

	var parent = gyro.gyroCamera = this;

	parent.radius = 384;
	parent.phi = Math.PI/3;
	parent.theta = 0;

	gyro.camera = new THREE.PerspectiveCamera(45, 16/9, 1, 8192);

	parent.init = function() {
		
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
					if(parent.radius>512) {
						parent.radius = 512;
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