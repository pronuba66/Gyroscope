
"use strict";
function _gyro_gyro(gyro) {
	
	var parent = gyro.gyroGyro = this;

	gyro.rotationalAcceleration = (Math.PI/180)*0.005;
	gyro.rotationalVelocity = gyro.rotationalAcceleration*256;
	gyro.precessionVelocity = 0;

	parent.radiusHolder = 8;
	parent.heightTopHolder = 48;
	parent.heightBottomHolder = 96;
	
	gyro.orbitRadius = 96;
	gyro.numberOfSpheres = 16;
	gyro.sphereRadius = 16;
	gyro.spheres = [];

	gyro.angle = -($('#form input[name="snutation"]:checked').val()/180)*Math.PI;
	gyro.angleMax = Math.atan(gyro.orbitRadius/parent.heightBottomHolder);

	parent.isAccelerating = false;
	gyro.group = new THREE.Object3D();
	gyro.pivot = new THREE.Object3D();

	parent.noiseTexture = (function(amount) {
		var noiseSize = 512;
		var size = noiseSize*noiseSize;
		var data = new Uint8Array(4*size);
		for (var i=0; i<size*4; i+=4) {
		    data[i+0] = Math.round((1-Math.random()*amount)*255);
		    data[i+1] = data[i];
		    data[i+2] = data[i];
		    data[i+3] = Math.round((1-Math.random()*amount)*255);
		}
		var texture = new THREE.DataTexture(data, noiseSize, noiseSize, THREE.RGBAFormat);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.needsUpdate = true;
		return texture;
	})(0.2);
	parent.init = function() {
		var mesh;
		// Area
		mesh = new THREE.Mesh(new THREE.BoxGeometry(12228, 12228, 1), new THREE.MeshLambertMaterial({
			color: 0xcccccc,
		}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.rotation.x = -Math.PI/2;
		//gyro.scene.add(mesh);

		// Holder
		mesh = new THREE.Mesh(new THREE.CylinderGeometry(4, 12, 12228, gyro.numberOfSpheres*8), new THREE.MeshLambertMaterial({
			color: 0xffffff,
		}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.y = -12228/2;
		gyro.scene.add(mesh);

		// Outer Ring
		mesh = new THREE.Mesh(new THREE.TorusGeometry(gyro.orbitRadius, gyro.sphereRadius, 16, gyro.numberOfSpheres*8), new THREE.MeshPhysicalMaterial({
			color: 0xffffee,
			map: parent.noiseTexture,
		}));
		mesh.rotation.x = Math.PI/2;
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		parent.meshOuterRing = mesh;
		gyro.group.add(mesh);

		//Inner Plane
		mesh = new THREE.Mesh(new THREE.CylinderGeometry(gyro.orbitRadius, gyro.orbitRadius, 2, gyro.numberOfSpheres*8), new THREE.MeshPhysicalMaterial({
			color: 0xffbe33,
			map: parent.noiseTexture,
		}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		parent.meshInnerPlane = mesh;
		gyro.group.add(mesh);

		// Top Holder
		mesh = new THREE.Mesh(new THREE.CylinderGeometry(parent.radiusHolder, parent.radiusHolder, parent.heightTopHolder, gyro.numberOfSpheres*8), new THREE.MeshPhysicalMaterial({
			color: 0xffffff,
			map: parent.noiseTexture,
		}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.y = parent.heightTopHolder/2;
		gyro.group.add(mesh);

		// Bottom Holder
		mesh = new THREE.Mesh(new THREE.CylinderGeometry(parent.radiusHolder, 0, parent.heightBottomHolder, gyro.numberOfSpheres*8), new THREE.MeshPhysicalMaterial({
			color: 0xffffff,
			map: parent.noiseTexture,
		}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.y = -parent.heightBottomHolder/2;
		gyro.group.add(mesh);

		//Spheres
		for(var i=0; i<gyro.numberOfSpheres; i++) {
			var mesh;
			var radius = gyro.orbitRadius;
			var phi = Math.PI/2;
			var theta = (i/gyro.numberOfSpheres)*(2*Math.PI);
			var v = new THREE.Vector3().setFromSpherical(new THREE.Spherical(radius, phi, theta));
			mesh = new THREE.Mesh(new THREE.SphereGeometry(gyro.sphereRadius*0.8, 16, 16), new THREE.MeshBasicMaterial({
				color: 0xffffff,
				transparent: true,
				opacity: 0.25,
				depthWrite: false,
				depthTest: true,
			}));
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			mesh.position.set(v.x, v.y, v.z);
			gyro.spheres.push(mesh);
			gyro.group.add(mesh);
		}
		gyro.group.position.y = parent.heightBottomHolder;
		// gyro.group.castShadow = true;
		// gyro.group.receiveShadow = true;
		gyro.pivot.add(gyro.group);
		gyro.pivot.rotation.z = this.angle;
		// gyro.pivot.castShadow = true;
		// gyro.pivot.receiveShadow = true;
		gyro.scene.add(gyro.pivot);
		$('#form input[name="malpha"]').click(function(e) {
			if($(this).is(':checked')) {
				gyro.isTranslucent = true;
			} else {
				gyro.isTranslucent = false;
			}
		});
		$('#form input[name="snutation"]').change(function() {
			var nutation = $(this).val();
			gyro.angle = -($(this).val()/180)*Math.PI;
		});
		$(document).on('keydown', function(e) {
			switch(e.keyCode) {
				//+
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54: {
					gyro.angle = -(e.keyCode-49)*(Math.PI/180)*10;
					$('#form input[name="snutation"]').prop('checked', false);
					$('#form input[name="snutation"][value="'+(e.keyCode-49)*10+'"]').prop('checked', true);
					break;
				}
				case 32: {
					parent.isAccelerating = true;
				}
				default: {
					break;
				}
			}
		});
		$(document).on('keyup', function(e) {
			switch(e.keyCode) {
				case 32: {
					parent.isAccelerating = false;
				}
				default: {
					break;
				}
			}
		});
	}
	parent.physics = function() {
		if(!gyro.pause) {
			if(parent.isAccelerating) {
				gyro.rotationalVelocity += gyro.rotationalAcceleration*gyro.frameRateScale;
			}
			gyro.group.rotation.y += gyro.rotationalVelocity*gyro.frameRateScale;
			gyro.pivot.rotation.y -= gyro.precessionVelocity*gyro.frameRateScale;
		}
		if(gyro.isTranslucent) {
			parent.meshOuterRing.material.color.set(0xffffff);
			parent.meshOuterRing.material.map = null;
			parent.meshOuterRing.material.needsUpdate = true;
			parent.meshOuterRing.material.transparent = true;
			parent.meshOuterRing.material.opacity = 0.25;
			parent.meshOuterRing.material.depthWrite = false;
			parent.meshOuterRing.material.depthTest = true;
			parent.meshInnerPlane.visible = false;
		} else {
			parent.meshOuterRing.material.color.set(0xffffee);
			parent.meshOuterRing.material.map = parent.noiseTexture;
			parent.meshOuterRing.material.needsUpdate = true;
			parent.meshOuterRing.material.transparent = false;
			parent.meshOuterRing.material.opacity = 1;
			parent.meshOuterRing.material.depthWrite = true;
			parent.meshOuterRing.material.depthTest = true;
			parent.meshInnerPlane.visible = true;
		}
		gyro.pivot.rotation.z = gyro.angle;
		if(gyro.single) {
			$(gyro.spheres).each(function(key, value) {
				if(key !== 0) {
					value.visible = false;
				}
			});
		} else {
			$(gyro.spheres).each(function(key, value) {
				value.visible = true;
			});
		}
	}
}