
"use strict";
(function() {

	var gyro = new _gyro_scene();
	gyro.pause = $('#form input[name="mpause"]').is(':checked');
	gyro.frameRateScale = 1/parseInt($('#form input[name="sspeed"]:checked').val());
	gyro.single = $('#form input[name="msingle"]').is(':checked');
	gyro.isTranslucent = $('#form input[name="malpha"]').is(':checked');

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
		$('#form').on('mousedown', function(e) {
			$('#form').css({opacity: 0.25 });
		});
		$('#form').on('mouseup', function(e) {
			$('#form').css({opacity: 1 });
		});
		$('#form').on('mouseleave', function(e) {
			$('#form').css({opacity: 1 });
		});
		$('#canvas').attr('tabindex', '-1');
		$('#canvas').focus();
		$('#canvas').click();
		$('canvas').mousedown(function(e) {
			var mouseX_start = e.pageX;
			var mouseY_start = e.pageY;
			var phi_start = gyro.gyroCamera.phi;
			var theta_start = gyro.gyroCamera.theta;
			$(this).mousemove(function(e) {
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
		}).mouseup(function(e) {
			$(this).unbind('mousemove');
		}).mouseout(function(e) {
			$(this).unbind('mousemove');
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
	function fpsControl(fps, callback) {
		var delay = 1000/fps;
		var time = null;
		var frame = -1;
		var tref;
		function loop(timestamp) {
			if(time === null) {
				time = timestamp;
			}
			var seg = Math.floor((timestamp-time)/delay);
			if (seg>frame) {
				frame = seg;
				callback({
					time: timestamp,
					frame: frame
				})
			}
			tref = requestAnimationFrame(loop)
		}
		tref = requestAnimationFrame(loop);
	}
	fpsControl(60, animate);

	init();
	animate();
})();