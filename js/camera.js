
"use strict";
function _gyro_camera(gyro) {

	var parent = gyro.gyroCamera = this;

	parent.radius = 384;
	parent.phi = Math.PI/3;
	parent.theta = 0;

	gyro.camera1 = new THREE.PerspectiveCamera(45, 16/9, 1, 8192);
	gyro.camera2 = new THREE.PerspectiveCamera(45, 16/9, 1, 8192);
	var width = 1920/4;
	var height = 1080/4;
	gyro.camera2 = new THREE.OrthographicCamera(-960, +960, 540, -540, 1, 8192);
	gyro.camera = gyro.camera1;

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
		gyro.group.updateMatrixWorld();
		var w = new THREE.Vector3().setFromMatrixPosition(gyro.group.matrixWorld).normalize().multiplyScalar(512);
		gyro.camera1.position.set(v.x, v.y, v.z);
		gyro.camera1.lookAt(new THREE.Vector3(gyro.group.position.x, gyro.group.position.y/2, gyro.group.position.z));
		gyro.camera2.position.set(w.x, w.y, w.z);
		gyro.camera2.lookAt(new THREE.Vector3(gyro.group.position.x, gyro.group.position.y/2, gyro.group.position.z));
		var r = parent.radius/512;
		gyro.camera2.left = -r*960;
		gyro.camera2.right = r*960;
		gyro.camera2.top = r*540;
		gyro.camera2.bottom = -r*540;
    	gyro.camera2.updateProjectionMatrix();
	}
}