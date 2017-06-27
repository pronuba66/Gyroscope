
"use strict";
(function() {
	var pause = false;

	var frameSkip = 1;
	var frameSkipCount = 0;
	var gyro = new _gyro_scene();
	new _gyro_renderer(gyro);
	new _gyro_lights(gyro);
	new _gyro_camera(gyro);
	new _gyro_gyro(gyro);
	new _gyro_arrows(gyro);

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
					pause = !pause;
					break;
				}
			}
		});
		$('#form').on('keydown', function(e) {
			e.stopPropagation();
		});
		$('#form input[name="sspeed"').change(function() {
			frameSkip = $(this).val();
			frameSkipCount = 0;
		});
		$('#form').click(function(e) {
			$("#form, #form *").blur(); 
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
		$('#canvas').focus();
	}

	function animate() {
		if(frameSkipCount%frameSkip == 0) {
			if(!pause) {
				gyro.physics();
				gyro.gyroLights.physics();
				gyro.gyroGyro.physics();
				gyro.gyroArrows.physics();
			}
		}
		frameSkipCount++;
		gyro.gyroCamera.physics();
		gyro.gyroRenderer.renderer.render(gyro.scene, gyro.camera);
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
			var seg = Math.floor((timestamp-time)/delay); // calc frame no.
			if (seg>frame) {                                // moved to next frame?
				frame = seg;                                  // update
				callback({                                    // callback function
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