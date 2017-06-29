
"use strict";
function _gyro_arrows(gyro) {

	var parent = gyro.gyroArrows = this;
	parent.arrowHelperAccelerationGravity = [];
	parent.arrowHelperAccelerationRotational = [];
	parent.arrowHelperReferenceTorqueArm = [];
	parent.arrowHelperReferenceTorqueAxis = null;
	parent.arrowHelperTorque = [];
	parent.arrowHelperTorqueVertical = [];
	parent.arrowHelperTorqueHorizontal = [];
	parent.arrowHelperVeclotyRotational = [];
	parent.arrowHelperVelocityPrecession = [];
	gyro.pivot.updateMatrixWorld();
	gyro.group.updateMatrixWorld();

	var geometry;
	var arrowHelper;
	for(var i=0; i<gyro.numberOfSpheres; i++) {
		// Gravity
		parent.arrowHelperAccelerationGravity.push(new THREE.ArrowHelper(gyro.gravity, new THREE.Vector3(0, 0, 0), gyro.gravity.length(), 0x0000ff));
		parent.arrowHelperAccelerationGravity[i].visible = $('#form input[name="fgravity"]').is(':checked');

		// Rotational
		parent.arrowHelperAccelerationRotational.push(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1, 0x00ff00));
		parent.arrowHelperAccelerationRotational[i].visible = $('#form input[name="frotational"]').is(':checked');

		// Torque due to gravity
		parent.arrowHelperTorque.push(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1, 0xffffff));
		parent.arrowHelperTorque[i].visible = $('#form input[name="ftorque"]').is(':checked');
		
		// Torque due to gravity vertical componenet
		parent.arrowHelperTorqueVertical.push(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1, 0xffff00));
		parent.arrowHelperTorqueVertical[i].visible = $('#form input[name="ftorquevertical"]').is(':checked');
		
		// Torque due to gravity horizontal componenet
		parent.arrowHelperTorqueHorizontal.push(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1, 0xffff00));
		parent.arrowHelperTorqueHorizontal[i].visible = $('#form input[name="ftorquehorizontal"]').is(':checked');
		
		// Torque reference arm
		geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 512, 512));
		geometry.computeLineDistances();
		parent.arrowHelperReferenceTorqueArm.push(new THREE.Line(geometry, new THREE.LineDashedMaterial({
			color: 0x666666,
			linewidth: 1,
			scale: 1,
			dashSize: 8,
			gapSize: 4,
		})));
		parent.arrowHelperReferenceTorqueArm[i].geometry.dynamic = true;
		parent.arrowHelperReferenceTorqueArm[i].visible = $('#form input[name="ftorquereference"]').is(':checked');

		// Rotational velocity
		parent.arrowHelperVeclotyRotational.push(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1, 0x00ff00));
		parent.arrowHelperVeclotyRotational[i].visible = $('#form input[name="mrotational"]').is(':checked');

		// Precession
		parent.arrowHelperVelocityPrecession.push(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1, 0xff0000));
		parent.arrowHelperVelocityPrecession[i].visible = $('#form input[name="mprecession"]').is(':checked');
	}
	// Torque reference axis
	geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0, 0, 0));
	geometry.vertices.push(new THREE.Vector3(0, 1, 0));
	geometry.computeLineDistances();
	parent.arrowHelperReferenceTorqueAxis = new THREE.Line(geometry, new THREE.LineDashedMaterial({
		color: 0x666666,
		linewidth: 1,
		scale: 1,
		dashSize: 8,
		gapSize: 4,
	}));
	parent.arrowHelperReferenceTorqueAxis.geometry.dynamic = true;
	parent.arrowHelperReferenceTorqueAxis.visible = $('#form input[name="ftorquereference"]').is(':checked');

	parent.init = function() {
		for(var i=0; i<gyro.numberOfSpheres; i++) {
			// Gravity
			gyro.scene.add(parent.arrowHelperAccelerationGravity[i]);
			// Rotational
			gyro.scene.add(parent.arrowHelperAccelerationRotational[i]);
			// Torque due to gravity
			gyro.scene.add(parent.arrowHelperTorque[i]);
			// Torque due to gravity (vertical)
			gyro.scene.add(parent.arrowHelperTorqueVertical[i]);
			// Torque due to gravity (horizontal)
			gyro.scene.add(parent.arrowHelperTorqueHorizontal[i]);
			// Torque reference arm
			gyro.scene.add(parent.arrowHelperReferenceTorqueArm[i]);
			// Rotational velocity
			gyro.scene.add(parent.arrowHelperVeclotyRotational[i]);
			// Precession
			gyro.scene.add(parent.arrowHelperVelocityPrecession[i]);
		}
		// Torque reference axis
		gyro.scene.add(parent.arrowHelperReferenceTorqueAxis);

		$('#form input[name="fgravity"]').click(function(e) {
			if($(this).is(':checked')) {
				$(parent.arrowHelperAccelerationGravity).each(function(key, value) {
					value.visible = true;
				});
			} else {
				$(parent.arrowHelperAccelerationGravity).each(function(key, value) {
					value.visible = false;
				});
			}
		});
		$('#form input[name="frotational"]').click(function(e) {
			if($(this).is(':checked')) {
				$(parent.arrowHelperAccelerationRotational).each(function(key, value) {
					value.visible = true;
				});
			} else {
				$(parent.arrowHelperAccelerationRotational).each(function(key, value) {
					value.visible = false;
				});
			}
		});
		$('#form input[name="ftorque"]').click(function(e) {
			if($(this).is(':checked')) {
				$(parent.arrowHelperTorque).each(function(key, value) {
					value.visible = true;
				});
			} else {
				$(parent.arrowHelperTorque).each(function(key, value) {
					value.visible = false;
				});
			}
		});
		$('#form input[name="ftorquevertical"]').click(function(e) {
			if($(this).is(':checked')) {
				$(parent.arrowHelperTorqueVertical).each(function(key, value) {
					value.visible = true;
				});
			} else {
				$(parent.arrowHelperTorqueVertical).each(function(key, value) {
					value.visible = false;
				});
			}
		});
		$('#form input[name="ftorquehorizontal"]').click(function(e) {
			if($(this).is(':checked')) {
				$(parent.arrowHelperTorqueHorizontal).each(function(key, value) {
					value.visible = true;
				});
			} else {
				$(parent.arrowHelperTorqueHorizontal).each(function(key, value) {
					value.visible = false;
				});
			}
		});
		$('#form input[name="ftorquereference"]').click(function(e) {
			if($(this).is(':checked')) {
				$(parent.arrowHelperReferenceTorqueArm).each(function(key, value) {
					value.visible = true;
				});
				parent.arrowHelperReferenceTorqueAxis.visible = true;
			} else {
				$(parent.arrowHelperReferenceTorqueArm).each(function(key, value) {
					value.visible = false;
				});
				parent.arrowHelperReferenceTorqueAxis.visible = false;
			}
		});
		$('#form input[name="mrotational"]').click(function(e) {
			if($(this).is(':checked')) {
				$(parent.arrowHelperVeclotyRotational).each(function(key, value) {
					value.visible = true;
				});
			} else {
				$(parent.arrowHelperVeclotyRotational).each(function(key, value) {
					value.visible = false;
				});
			}
		});
		$('#form input[name="mprecession"]').click(function(e) {
			if($(this).is(':checked')) {
				$(parent.arrowHelperVelocityPrecession).each(function(key, value) {
					value.visible = true;
				});
			} else {
				$(parent.arrowHelperVelocityPrecession).each(function(key, value) {
					value.visible = false;
				});
			}
		});
	}
	parent.physics = function() {
		gyro.pivot.updateMatrixWorld();
		gyro.group.updateMatrixWorld();
		var v_group = new THREE.Vector3().setFromMatrixPosition(gyro.group.matrixWorld);
		gyro.precessionVelocity = ((Math.log(Math.cos(0)) - Math.log(Math.cos(gyro.angleMax)))*2*Math.sin(gyro.angle))/(Math.pow(gyro.rotationalVelocity, 2)*1024*64);
		for(var i=0; i<gyro.numberOfSpheres; i++) {
			gyro.spheres[i].updateMatrixWorld();
			var a_rotational = (i/gyro.numberOfSpheres)*(2*Math.PI)+gyro.group.rotation.y;
			var v_sphere = new THREE.Vector3().setFromMatrixPosition(gyro.spheres[i].matrixWorld);
			var v_rotational = v_group.clone().sub(v_sphere).cross(v_sphere);
			var l_rotational = gyro.gyroGyro.isAccelerating?gyro.rotationalAcceleration*550040:0.00000001;
			var v_anglePointer = new THREE.Vector3().setFromSpherical(new THREE.Spherical(1, Math.PI/2, gyro.pivot.rotation.y));
			var v_torqueAxis = new THREE.Vector3().setFromSpherical(new THREE.Spherical(gyro.orbitRadius*Math.cos(a_rotational), Math.PI/2, gyro.pivot.rotation.y));
			var a_torqueArm = v_sphere.clone().sub(v_torqueAxis).angleTo(v_group);
			var l_torqueArm = v_sphere.distanceTo(v_torqueAxis);
			var v_torque = v_anglePointer.clone().cross(v_sphere).multiplyScalar(Math.sin(gyro.angle));
			var l_torque = (1/l_torqueArm)*1024*12*Math.sin(gyro.angle);
			if(Math.sin(a_rotational) < 0) {
				a_torqueArm = -a_torqueArm;
			}
			var l_torqueVertical = v_group.clone().normalize().dot(v_torque);
			var v_torqueVertical = v_group.clone().multiplyScalar(l_torqueVertical);

			var v_torqueHorizontal = v_group.clone().cross(v_anglePointer);
			var l_torqueHorizontal = v_torqueHorizontal.clone().normalize().dot(v_torque);
			
			var l_velocityRotational = gyro.rotationalVelocity*1024;
			// (sin(a_torqueArm)/cos(a_torqueArm)
			// integral = Ln(cos(a_torqueArm)) - Ln(cos(gyro.angleMax))
			var l_velocityPrecession = ((Math.log(Math.cos(a_torqueArm)) - Math.log(Math.cos(gyro.angleMax)))*Math.sin(gyro.angle))/(Math.pow(gyro.rotationalVelocity, 2)*4);
			if(Math.cos(a_rotational) > 0) {
				l_velocityPrecession = -l_velocityPrecession;
			}
			var v_velocityPrecession = v_group.clone().normalize().multiplyScalar(l_velocityPrecession);

			l_torque = Math.abs(l_torque);
			if(l_torque == 0) {
				l_torque = 0.00000001;
			}
			if(l_velocityRotational == 0) {
				l_velocityRotational = 0.00000001;
			}
			l_torqueVertical = Math.abs(l_torqueVertical);
			if(l_torqueVertical == 0) {
				l_torqueVertical = 0.00000001;
			}
			l_torqueHorizontal = Math.abs(l_torqueHorizontal);
			if(l_torqueHorizontal == 0) {
				l_torqueHorizontal = 0.00000001;
			}
			l_velocityPrecession = Math.abs(l_velocityPrecession);
			if(l_velocityPrecession == 0) {
				l_velocityPrecession = 0.00000001;
			}

			// Gravity
			parent.arrowHelperAccelerationGravity[i].position.set(v_sphere.x, v_sphere.y, v_sphere.z);
			parent.arrowHelperAccelerationGravity[i].setDirection(gyro.gravity.clone().normalize());
			parent.arrowHelperAccelerationGravity[i].setLength(gyro.gravity.length());

			// Rotational
			parent.arrowHelperAccelerationRotational[i].position.set(v_sphere.x, v_sphere.y, v_sphere.z);
			parent.arrowHelperAccelerationRotational[i].setDirection(v_rotational.clone().normalize());
			parent.arrowHelperAccelerationRotational[i].setLength(l_rotational);

			// Torque due to gravity
			parent.arrowHelperTorque[i].position.set(v_sphere.x, v_sphere.y, v_sphere.z);
			parent.arrowHelperTorque[i].setDirection(v_torque.clone().normalize());
			parent.arrowHelperTorque[i].setLength(l_torque);

			// Torque due to gravity vertical componenet
			parent.arrowHelperTorqueVertical[i].position.set(v_sphere.x, v_sphere.y, v_sphere.z);
			parent.arrowHelperTorqueVertical[i].setDirection(v_torqueVertical.clone().normalize());
			parent.arrowHelperTorqueVertical[i].setLength(l_torqueVertical);

			// Torque due to gravity horizontal componenet
			parent.arrowHelperTorqueHorizontal[i].position.set(v_sphere.x, v_sphere.y, v_sphere.z);
			parent.arrowHelperTorqueHorizontal[i].setDirection(v_torqueHorizontal.clone().normalize());
			parent.arrowHelperTorqueHorizontal[i].setLength(l_torqueHorizontal);

			// Torque reference arm
			parent.arrowHelperReferenceTorqueArm[i].geometry.vertices[0].set(v_sphere.x, v_sphere.y, v_sphere.z);
			parent.arrowHelperReferenceTorqueArm[i].geometry.vertices[1].set(v_torqueAxis.x, v_torqueAxis.y, v_torqueAxis.z);
			parent.arrowHelperReferenceTorqueArm[i].geometry.verticesNeedUpdate = true;

			// Rotational velocity
			parent.arrowHelperVeclotyRotational[i].position.set(v_sphere.x, v_sphere.y, v_sphere.z);
			parent.arrowHelperVeclotyRotational[i].setDirection(v_rotational.clone().normalize());
			parent.arrowHelperVeclotyRotational[i].setLength(l_velocityRotational);
			
			// Precession
			parent.arrowHelperVelocityPrecession[i].position.set(v_sphere.x, v_sphere.y, v_sphere.z);
			parent.arrowHelperVelocityPrecession[i].setLength(l_velocityPrecession);
			parent.arrowHelperVelocityPrecession[i].setDirection(v_velocityPrecession.clone().normalize());
		}
		var v_torqueAxis = new THREE.Vector3().setFromSpherical(new THREE.Spherical(gyro.orbitRadius, Math.PI/2, gyro.pivot.rotation.y));
		parent.arrowHelperReferenceTorqueAxis.geometry.vertices[0].set(v_torqueAxis.x, v_torqueAxis.y, v_torqueAxis.z);
		parent.arrowHelperReferenceTorqueAxis.geometry.vertices[1].set(-v_torqueAxis.x, -v_torqueAxis.y, -v_torqueAxis.z);
		parent.arrowHelperReferenceTorqueAxis.geometry.verticesNeedUpdate = true;


		$(parent.arrowHelperAccelerationGravity).each(function(key, value) {
			if(gyro.single && key !== 0) {
				value.visible = false;
			}
		})
		$(parent.arrowHelperAccelerationRotational).each(function(key, value) {
			if(gyro.single && key !== 0) {
				value.visible = false;
			}
		})
		$(parent.arrowHelperReferenceTorqueArm).each(function(key, value) {
			if(gyro.single && key !== 0) {
				value.visible = false;
			}
		})
		$(parent.arrowHelperTorque).each(function(key, value) {
			if(gyro.single && key !== 0) {
				value.visible = false;
			}
		})
		$(parent.arrowHelperTorqueVertical).each(function(key, value) {
			if(gyro.single && key !== 0) {
				value.visible = false;
			}
		})
		$(parent.arrowHelperTorqueHorizontal).each(function(key, value) {
			if(gyro.single && key !== 0) {
				value.visible = false;
			}
		})
		$(parent.arrowHelperVeclotyRotational).each(function(key, value) {
			if(gyro.single && key !== 0) {
				value.visible = false;
			}
		})
		$(parent.arrowHelperVelocityPrecession).each(function(key, value) {
			if(gyro.single && key !== 0) {
				value.visible = false;
			}
		})
	}
}