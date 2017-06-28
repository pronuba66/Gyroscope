
"use strict";
function _gyro_gyro(gyro) {
	
	var parent = gyro.gyroGyro = this;

	gyro.rotationalAcceleration = (Math.PI/180)*0.005;
	gyro.rotationalVelocity = gyro.rotationalAcceleration*256;
	gyro.precessionVelocity = 0;

	parent.radiusHolder = 16;
	parent.heightTopHolder = 48;
	parent.heightBottomHolder = 96;
	
	gyro.orbitRadius = 96;
	gyro.numberOfSpheres = 16;
	gyro.sphereRadius = 16;
	gyro.spheres = [];

	gyro.angle = 0;
	gyro.angleMax = Math.atan(gyro.orbitRadius/parent.heightBottomHolder);

	parent.isAccelerating = false;
	gyro.group = new THREE.Object3D();
	gyro.pivot = new THREE.Object3D();

	parent.init = function() {
		var mesh;
		// Holder
		mesh = new THREE.Mesh(new THREE.CylinderGeometry(4, 12, 12228, gyro.numberOfSpheres*8), new THREE.MeshPhysicalMaterial({
			color: 0xffffff,
			transparent: true,
			opacity: 0.2,
			side: THREE.DoubleSide,
		}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.y = -12228/2;
		mesh.updateMatrix();
		gyro.scene.add(mesh);

		var geometry = new THREE.Geometry();
		// Outer Ring
		mesh = new THREE.Mesh(new THREE.TorusGeometry(gyro.orbitRadius, gyro.sphereRadius, 16, gyro.numberOfSpheres*8));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.rotation.x = Math.PI/2;
		mesh.updateMatrix();
		geometry.merge(mesh.geometry, mesh.matrix);

		//Inner Plane
		mesh = new THREE.Mesh(new THREE.CylinderGeometry(gyro.orbitRadius, gyro.orbitRadius, 2, gyro.numberOfSpheres*8));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.updateMatrix();
		geometry.merge(mesh.geometry, mesh.matrix);

		mesh = new THREE.Mesh(geometry, new THREE.MeshPhysicalMaterial({
			color: 0xffffff,
			transparent: true,
			opacity: 0.05,
			side: THREE.DoubleSide,
			depthWrite: false,
		}));
		gyro.group.add(mesh);

		// Top Holder
		mesh = new THREE.Mesh(new THREE.CylinderGeometry(parent.radiusHolder, parent.radiusHolder, parent.heightTopHolder, gyro.numberOfSpheres*8), new THREE.MeshPhysicalMaterial({
			color: 0xaaaaaa,
		}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.y = parent.heightTopHolder/2;
		gyro.group.add(mesh);
		mesh = new THREE.Mesh(new THREE.CylinderGeometry(parent.radiusHolder, 0, parent.heightBottomHolder, gyro.numberOfSpheres*8), new THREE.MeshPhysicalMaterial({
			color: 0xaaaaaa,
		}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.y = -parent.heightBottomHolder/2;
		gyro.group.add(mesh);

		//Spheres
		for(var i=0; i<gyro.numberOfSpheres; i++) {
			var mesh;
			/*if(i==0) {
				mesh = new THREE.Mesh(new THREE.SphereGeometry(gyro.sphereRadius*0.8, 16, 8), new THREE.MeshPhysicalMaterial({
					color: 0x333333,
					transparent: true,
					opacity: 0.4,
				}));
			} else {*/
				mesh = new THREE.Mesh(new THREE.SphereGeometry(gyro.sphereRadius*0.8, 16, 8), new THREE.MeshLambertMaterial({
					color: 0xffffff,
					transparent: true,
					opacity: 0.4,
				}));
			//}
			var radius = gyro.orbitRadius;
			var phi = Math.PI/2;
			var theta = (i/gyro.numberOfSpheres)*(2*Math.PI);
			var v = new THREE.Vector3().setFromSpherical(new THREE.Spherical(radius, phi, theta));
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			mesh.position.set(v.x, v.y, v.z);
			gyro.spheres.push(mesh);
			gyro.group.add(mesh);
		}
		gyro.group.position.y = parent.heightBottomHolder;
		gyro.pivot.add(gyro.group);
		gyro.pivot.rotation.z = this.angle;
		gyro.scene.add(gyro.pivot);
		$('#form input[name="snutation"').change(function() {
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
		if(parent.isAccelerating) {1
			gyro.rotationalVelocity += gyro.rotationalAcceleration;
		}
		gyro.group.rotation.y += gyro.rotationalVelocity;
		gyro.pivot.rotation.z = gyro.angle;
		gyro.pivot.rotation.y -= gyro.precessionVelocity;
	}
}