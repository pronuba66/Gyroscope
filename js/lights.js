
"use strict";
function _gyro_lights(gyroScene) {

	var parent = gyroScene.gyroLights = this;

	parent.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	gyroScene.scene.add(parent.ambientLight);

	parent.pointLight1 = new THREE.PointLight(0xffffff, 0.4, 1024);
	parent.pointLight2 = new THREE.PointLight(0xffffff, 0.4, 1024);
	parent.pointLight3 = new THREE.PointLight(0xffffff, 0.4, 1024);
	parent.pointLight4 = new THREE.PointLight(0xffffff, 0.4, 1024);

	parent.spotLight = new THREE.SpotLight(0xffffff, 2, 1024, Math.PI/4, 0.5);

	parent.init = function() {
		parent.pointLight1.position.set(512, 384, 0);
		gyroScene.scene.add(parent.pointLight1);
		parent.pointLight2.position.set(-512, -384, 0);
		gyroScene.scene.add(parent.pointLight2);
		parent.pointLight3.position.set(0, 384, 512);
		gyroScene.scene.add(parent.pointLight3);
		parent.pointLight4.position.set(0, -384, -512);
		gyroScene.scene.add(parent.pointLight4);

		parent.spotLight.position.set(256, 384, 256);
		parent.spotLight.target.position.set(0, 0, 0);
		parent.spotLight.castShadow = true;
		parent.spotLight.shadow.mapSize.width = parent.spotLight.shadow.mapSize.height = 1024;
		gyroScene.scene.add(parent.spotLight);
		//gyroScene.scene.add(new THREE.SpotLightHelper(parent.spotLight));
	}
	parent.physics = function() {
	}
}