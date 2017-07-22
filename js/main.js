
"use strict";
(function() {

	var gyro = new _gyro_scene();
	gyro.fps = 60;
	gyro.pause = $('#form input[name="mpause"]').is(':checked');
	gyro.fpsScale = 30/gyro.fps;
	gyro.frameRateScale = 1/parseInt($('#form input[name="sspeed"]:checked').val());
	gyro.single = $('#form input[name="msingle"]').is(':checked');
	gyro.isTranslucent = $('#form input[name="malpha"]').is(':checked');

	gyro.is_touch_device = function() {
		return 'ontouchstart' in window || navigator.maxTouchPoints;
	};

	new _gyro_renderer(gyro);
	new _gyro_lights(gyro);
	new _gyro_camera(gyro);
	new _gyro_gyro(gyro);
	new _gyro_arrows(gyro);
	
	$('#form input[name="mpause"]').prop('checked', gyro.pause);
	function init() {

		gyro.init();
		gyro.gyroRenderer.init();
		gyro.gyroLights.init();
		gyro.gyroCamera.init();
		gyro.gyroGyro.init();
		gyro.gyroArrows.init();


		// var mesh = new THREE.Mesh(new THREE.OctahedronGeometry(512, 4),
		// 	new THREE.MeshLambertMaterial({
		// 		color: 0xffffff,
		// 		side: THREE.BackSide,
		// 	}));
		// mesh.castShadow = true;
		// mesh.receiveShadow = true;
		// gyro.scene.add(mesh);

		$(document).on('keydown', function(e) {
			switch(e.keyCode) {
				case 80: {
					gyro.pause = !gyro.pause;
					$('#form input[name="mpause"]').prop('checked', gyro.pause);
					break;
				}
			}
		});
		$('#form').on('keydown', function(e) {
			e.stopPropagation();
		});
		$('#form input[name="msingle"]').click(function(e) {
			if($(this).is(':checked')) {
				gyro.single = true;
			} else {
				gyro.single = false;
			}
		});
		$('#form input[name="mpause"]').click(function(e) {
			if($(this).is(':checked')) {
				gyro.pause = true;
			} else {
				gyro.pause = false;
			}
		});
		$('#form input[name="sspeed"]').change(function(e) {
			gyro.frameRateScale = 1/parseInt($(this).val());
		});
		$('#form').click(function(e) {
			$("#form, #form *").blur();
			$('#canvas').focus();
			$('#canvas').click(); 
		});
		$('#form .button').click(function(e) {
			$('#form').toggleClass('hidden')
		});
		/*$('#form').on('mousedown', function(e) {
			$('#form').css({opacity: 0.25 });
		});
		$('#form').on('mouseup mouseleave', function(e) {
			$('#form').css({opacity: 1 });
		});
		$('#form').on('mouseleave', function(e) {
			$('#form').css({opacity: 1 });
		});*/
		$('#canvas').attr('tabindex', '-1');
		$('#canvas').focus();
		$('#canvas').click();
		$('canvas').on('mousedown', function(e) {
			if(gyro.is_touch_device()) {
				return;
			}
			e.preventDefault();
			var mouseX_start = e.pageX;
			var mouseY_start = e.pageY;
			var phi_start = gyro.gyroCamera.phi;
			var theta_start = gyro.gyroCamera.theta;
			$(this).on('mousemove', function(e) {
				if(gyro.is_touch_device()) {
					return;
				}
				e.preventDefault();
				var deltaX = mouseX_start - e.pageX;
				var deltaY = mouseY_start - e.pageY;
				gyro.gyroCamera.phi = phi_start + deltaY/256;
				if(gyro.gyroCamera.phi<Math.PI*(5/180)) {
					gyro.gyroCamera.phi = Math.PI*(5/180);
				}
				if(gyro.gyroCamera.phi>Math.PI-Math.PI*(30/180)) {
					gyro.gyroCamera.phi = Math.PI-Math.PI*(30/180);
				}
				gyro.gyroCamera.theta = theta_start + deltaX/256;
			});
		}).on('mouseup mouseout', function(e) {
			if(gyro.is_touch_device()) {
				return;
			}
			$(this).unbind('mousemove');
		});
		var touchEvent = {
			ID1: -1,
			ID2: -1,
			touchX_start: 0,
			touchY_start: 0,
			zoom_start: 0,
			radius_start: gyro.gyroCamera.radius,
			phi_start: gyro.gyroCamera.phi,
			theta_start: gyro.gyroCamera.theta,
		}
		$('canvas').on('touchstart', function(e) {
			if(!gyro.is_touch_device()) {
				return;
			}
			e.preventDefault();
			if(e.originalEvent.touches.length == 1) {
				touchEvent.ID1 = e.originalEvent.changedTouches[0].identifier;
				touchEvent.ID2 = -1;
				touchEvent.touchX_start = e.originalEvent.changedTouches[0].pageX;
				touchEvent.touchY_start = e.originalEvent.changedTouches[0].pageY;
				touchEvent.radius_start = gyro.gyroCamera.radius;
				touchEvent.phi_start = gyro.gyroCamera.phi;
				touchEvent.theta_start = gyro.gyroCamera.theta;
				$(this).on('touchmove', function(e) {
					if(!gyro.is_touch_device()) {
						return;
					}
					var deltaRadius = 0;
					$(e.originalEvent.touches).each(function(key, value1) {
						if(value1.identifier == touchEvent.ID1) {
							$(e.originalEvent.touches).each(function(key, value2) {
								if(value2.identifier == touchEvent.ID2) {
									deltaRadius = Math.sqrt(Math.pow(value1.pageX-value2.pageX, 2)+Math.pow(value1.pageY-value2.pageY, 2));
								}
							});
						}
					});
					if(deltaRadius != 0) {
						deltaRadius = touchEvent.zoom_start - deltaRadius;
					}
					var deltaX = touchEvent.touchX_start;
					var deltaY = touchEvent.touchY_start;
					$(e.originalEvent.changedTouches).each(function(key, value) {
						if(value.identifier == touchEvent.ID1) {
							deltaX -= value.pageX;
							deltaY -= value.pageY;
						}
					});
					gyro.gyroCamera.radius = touchEvent.radius_start + deltaRadius;
					if(gyro.gyroCamera.radius<32) {
						gyro.gyroCamera.radius = 32;
					}
					if(gyro.gyroCamera.radius>512) {
						gyro.gyroCamera.radius = 512;
					}
					gyro.gyroCamera.phi = touchEvent.phi_start + deltaY/512;
					if(gyro.gyroCamera.phi < Math.PI*(5/180)) {
						gyro.gyroCamera.phi = Math.PI*(5/180);
					}
					if(gyro.gyroCamera.phi > Math.PI-Math.PI*(30/180)) {
						gyro.gyroCamera.phi = Math.PI-Math.PI*(30/180);
					}
					gyro.gyroCamera.theta = touchEvent.theta_start + deltaX/256;
				});
			} else {
				touchEvent.ID2 = e.originalEvent.changedTouches[0].identifier;
				$(e.originalEvent.touches).each(function(key, value) {
					if(value.identifier == touchEvent.ID1) {
						touchEvent.zoom_start = Math.sqrt(Math.pow(value.pageX-e.originalEvent.changedTouches[0].pageX, 2)+Math.pow(value.pageY-e.originalEvent.changedTouches[0].pageY, 2));
					}
				});

			}
		}).on('touchend touchleave touchcancel', function(e) {
			if(!gyro.is_touch_device()) {
				return;
			}
			if(e.originalEvent.changedTouches[0].id == touchEvent.ID1) {
				$(this).unbind('touchmove');
				if(e.originalEvent.touches.length > 0) {
					touchEvent.ID1 = e.originalEvent.touches[0].identifier;
					touchEvent.touchX_start = e.originalEvent.touches[0].pageX;
					touchEvent.touchY_start = e.originalEvent.touches[0].pageY;
					touchEvent.phi_start = gyro.gyroCamera.phi;
					touchEvent.theta_start = gyro.gyroCamera.theta;
				} else {
					touchEvent.ID1 = -1;
				}
			} else if(e.originalEvent.changedTouches[0].id == touchEvent.ID2) {
				touchEvent.ID2 = -1;
			}
		});
		$('canvas').on('scroll mousewheel', function(e){
			if(gyro.is_touch_device()) {
				return;
			}
			e.preventDefault();
			e.delta = null;
			if(e.originalEvent) {
				if(e.originalEvent.wheelDelta) e.delta = e.originalEvent.wheelDelta/-40;
				if(e.originalEvent.deltaY) e.delta = e.originalEvent.deltaY;
				if(e.originalEvent.detail) e.delta = e.originalEvent.detail;
			}
			if(e.delta != null) {
				gyro.gyroCamera.radius += e.delta;
				if(gyro.gyroCamera.radius<32) {
					gyro.gyroCamera.radius = 32;
				}
				if(gyro.gyroCamera.radius>512) {
					gyro.gyroCamera.radius = 512;
				}
			}
			return false;
		});
	}

	function animate() {
		gyro.physics();
		gyro.gyroLights.physics();
		gyro.gyroCamera.physics();
		gyro.gyroGyro.physics();
		gyro.gyroArrows.physics();
		gyro.gyroRenderer.renderer.render(gyro.scene, gyro.camera);
		gyro.frameSkipCount++;
	}
	function fpsControl(fps) {
		var delay = 1000/fps;
		var time = null;
		var frame = -1;
		var tref;
		function loop(timestamp) {
			tref = requestAnimationFrame(loop)
			if(time === null) {
				time = timestamp;
			}
			var seg = Math.floor((timestamp-time)/delay);
			if (seg>frame) {
				frame = seg;
				animate();
			}
		}
		tref = requestAnimationFrame(loop);
	}
	fpsControl(gyro.fps);

	init();
	animate();
})();