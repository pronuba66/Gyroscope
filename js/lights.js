
"use strict";
function _gyro_lights(gyroScene) {

	var parent = gyroScene.gyroLights = this;

	parent.ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
	gyroScene.scene.add(parent.ambientLight);

	parent.spotLight = new THREE.SpotLight(0xffffff, 0.8, 512, Math.PI/4);
	parent.spotLight.position.set(128, 256, 128);
	parent.spotLight.target.position.set(0, 0, 0);
	parent.spotLight.castShadow = true;
	parent.spotLight.shadow.mapSize.width = parent.spotLight.shadow.mapSize.height = 1024;
	gyroScene.scene.add(parent.spotLight);
	//gyroScene.scene.add(new THREE.SpotLightHelper(parent.spotLight));

	parent.init = function() {
	}
	parent.physics = function() {
	}
}