
"use strict";
function _gyro_scene() {
	
	var parent = this;
	parent.scene = new THREE.Scene();
	parent.gravity = new THREE.Vector3(0, -64, 0);

	var axisHelper = new THREE.AxisHelper(32);

	parent.init = function() {
		parent.scene.add(axisHelper);
	}
	parent.physics = function() {
	}
}