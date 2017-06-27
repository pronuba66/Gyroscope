
"use strict";
function _gyro_lights(gyroScene) {

	var parent = gyroScene.gyroLights = this;

	parent.light1 = new THREE.DirectionalLight(0xffffff, 1);
	parent.light1Position = new THREE.Vector3(512, 512, 512);
	parent.light2 = new THREE.AmbientLight(0xffffff, 0.6);

	parent.init = function() {
		parent.light1.position.set(parent.light1Position.x, parent.light1Position.y, parent.light1Position.z);
		parent.light1.rotation.x = Math.PI;
		parent.light1.castShadow = true;
		gyroScene.scene.add(parent.light1);
		gyroScene.scene.add(parent.light2);
	}
	parent.physics = function() {
	}
}