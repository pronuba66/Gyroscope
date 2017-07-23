
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
		gyro.group.updateMatrixWorld();
		gyro.spheres[0].updateMatrixWorld();
		var v_gyro = new THREE.Vector3().setFromMatrixPosition(gyro.group.matrixWorld);
		var v_sphere = new THREE.Vector3().setFromMatrixPosition(gyro.spheres[0].matrixWorld);
		var v_camera1 = new THREE.Vector3().setFromSpherical(new THREE.Spherical(parent.radius, parent.phi, parent.theta));
		//var v_camera2 = v_sphere.clone().add(v_gyro);
		//var v_camera2 = v_sphere.clone().sub(v_gyro).normalize().multiplyScalar(512).add(v_gyro);
		
		gyro.camera1.position.set(v_camera1.x, v_camera1.y, v_camera1.z);
		gyro.camera1.lookAt(new THREE.Vector3(gyro.group.position.x, gyro.group.position.y/2, gyro.group.position.z));
		
		//gyro.camera2.position.set(v_camera2.x, v_camera2.y, v_camera2.z);
		//gyro.camera2.position.set(v_camera2.x-1, v_camera2.y+2, v_camera2.z-1);
		//gyro.camera2.lookAt(v_sphere);
		//gyro.camera2.rotation.x = gyro.gyroArrows.arrowHelperTorqueVertical[0].rotation.x;
		//gyro.camera2.rotation.y = gyro.gyroArrows.arrowHelperTorqueVertical[0].rotation.y;
		//gyro.camera2.rotation.z -= Math.asin((v_sphere.y-96)/96);
		//console.log(Math.asin((v_sphere.y-96)/96)*(180/Math.PI))
		//gyro.camera2.up = v_sphere;
		// var r = parent.radius/1024;
		// gyro.camera2.left = -r*960;
		// gyro.camera2.right = r*960;
		// gyro.camera2.top = r*540;
		// gyro.camera2.bottom = -r*540;
  //   	gyro.camera2.updateProjectionMatrix();
	}
}