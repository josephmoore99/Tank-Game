window.onload = function() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	
	var img=document.getElementById("explosion");
	
	var tankCrash = false;
	
	var p1 = {
		x: 820,
		y: 230,
		bx: 65,
		by: 65,
		ba: 0,
		angle: 0,
		fire: false,
		fx: 0,
		fy: 0,
		up: false,
		down: false,
		left: false,
		right: false,
		color: "#CC4444",
		hit: false,
		name: "RED"
	}

	var p2 = {	
		x: 50,
		y: 230,
		bx: 115,
		by: 15,
		ba: 0,
		angle: 0,
		fire: false,
		fx: 0,
		fy: 0,
		up: false,
		down: false,
		left: false,
		right: false,
		color: "#4444CC",
		hit: false,
		name: "BLUE"
	}

	function draw(player) {
		ctx.fillStyle=player.color;
		if(player.angle != 0){
			ctx.save();
			ctx.translate(player.x + 15, player.y + 15);
			ctx.rotate(player.angle);
			ctx.fillRect(-15,-15,30,30);
			ctx.fillStyle="black";
			ctx.fillRect(-2, -20, 4, 22);
			ctx.restore();
		}
		else{
			ctx.fillRect(player.x, player.y, 30, 30);
			ctx.fillStyle="black";
			ctx.fillRect(player.x+13,player.y-5,4,22);
		}
		if(player.fire == true) {
			ctx.beginPath();
			player.bx += 4 * Math.sin(player.ba);
			player.by -= 4 * Math.cos(player.ba);
			ctx.arc(player.bx, player.by, 2, 0, 2*Math.PI);
			ctx.stroke();
			if(player.bx >= 900 || player.bx <= 0 || player.by >= 500 || player.by <= 0){
				player.fire = false;
				player.bx = player.x + 15;
				player.by = player.y + 15;
			}
			else{
				player.fire = true;
			}
		}
		else{
			ctx.beginPath();
			player.bx = player.x + 15;
			player.by = player.y + 15;
			ctx.arc(player.x + 15, player.y + 15, 2, 0, 2 * Math.PI);
			ctx.stroke();
		}
		testForCollision();
		if(tankCrash == true){
			ctx.drawImage(img,player.x-15,player.y-15,60,60);
			ctx.font="20px Arial";
			ctx.fillText("TIE!", 400,240);
			setTimeout(function() {
				resetGame();
			}, 1000);
			
		}
		if(player.hit == true){
			ctx.drawImage(img,player.x-15,player.y-15,60,60);
			ctx.font="20px Arial";
			ctx.fillText(player.name + " HAS FALLEN!", 400,240);
			setTimeout(function() {
				resetGame();
			}, 1000);
		}
	}
	
	function checkKey(e) {
			e = e || window.event;

			if (e.keyCode == '38') {
				// up arrow
				p1.up = true;
			}
			else if (e.keyCode == '40') {
				// down arrow
				p1.down = true;
			}
			else if (e.keyCode == '37') {
			   // left arrow
				p1.left = true;
			}
			else if (e.keyCode == '39') {
			   // right arrow
				p1.right = true;
			}
			else if (e.keyCode == '191' && p1.fire != true) {
				// forward slash key
				p1.ba = p1.angle;
				p1.fire = true;
				p1.fx = p1.x + 15;
				p1.fy = p1.y + 15;
			}

			else if (e.keyCode == '87') {
				// w
				p2.up = true;
			}
			else if (e.keyCode == '83') {
				// s
				p2.down = true;
			}
			else if (e.keyCode == '65') {
			   // a
				p2.left = true;
			}
			else if (e.keyCode == '68') {
			   // d
				p2.right = true;
			}
			else if (e.keyCode == '32' && p2.fire != true) {
				p2.ba = p2.angle;
				p2.fire = true;
				p2.fx = p2.x + 15;
				p2.fy = p2.y +15;
			}
	}

	function update() {
	
		if(p1.up == true){
			p1.y -= 2 * Math.cos(p1.angle);
			p1.x += 2 * Math.sin(p1.angle);
		}
		else if(p1.down == true){
			p1.y += 2 * Math.cos(p1.angle);
			p1.x -= 2 * Math.sin(p1.angle);
		}
		else if(p1.left == true){
			p1.angle -= .03;
		}
		else if(p1.right == true){
			p1.angle += .03;
		}
		else{
			p1.x += 0;
			p1.y += 0;
		}
		
		if(p2.up == true){
			p2.y -= 2 * Math.cos(p2.angle);
			p2.x += 2 * Math.sin(p2.angle);
		}
		else if(p2.down == true){
			p2.y += 2 * Math.cos(p2.angle);
			p2.x -= 2 * Math.sin(p2.angle);
		}
		else if(p2.left == true){
			p2.angle -= .03;
		}
		else if(p2.right == true){
			p2.angle += .03;
		}
		else{
			p2.x += 0;
			p2.y += 0;
		}
		//check for wall
		if(p1.x <= 0){
			p1.x += 2;
		}
		else if(p1.x >= 870){
			p1.x -= 2;
		}
		if(p1.y <= 0){
			p1.y += 2
		}
		else if(p1.y >= 470){
			p1.y -= 2;
		}
		if(p2.x <= 0){
			p2.x += 2;
		}
		else if(p2.x >= 870){
			p2.x -= 2;
		}
		if(p2.y <= 0){
			p2.y += 2
		}
		else if(p2.y >= 470){
			p2.y -= 2;
		}
		
		//draw the players
		ctx.clearRect(0,0,900,500);
		draw(p1);
		draw(p2);

	}
	document.onkeydown = checkKey;
	document.onkeyup = stopMovement;
	
	function stopMovement(e) {
			e = e || window.event;
			
			if (e.keyCode == '38') {
				// up arrow
				p1.up = false;
			}
			else if (e.keyCode == '40') {
				// down arrow
				p1.down = false;
			}
			else if (e.keyCode == '37') {
			   // left arrow
				p1.left = false;
			}
			else if (e.keyCode == '39') {
			   // right arrow
				p1.right = false;
			}
			
			else if (e.keyCode == '87') {
				// w
				p2.up = false;
			}
			else if (e.keyCode == '83') {
				// s
				p2.down = false;
			}
			else if (e.keyCode == '65') {
			   // a
				p2.left = false;
			}
			else if (e.keyCode == '68') {
			   // d
				p2.right = false;
			}
	}
	
	function fire(player) {
		player.ba = player.angle;
	}
	
	function testForCollision(player){
		if(Math.sqrt(Math.pow(p1.x - p2.x, 2)+ Math.pow(p1.y - p2.y, 2)) < 35){
			tankCrash = true;
		}
		else if(Math.sqrt(Math.pow(p1.x + 15 - p2.bx, 2)+ Math.pow(p1.y + 15 - p2.by, 2)) < 17){
			p1.hit = true;
		}
		else if(Math.sqrt(Math.pow(p2.x + 15 - p1.bx, 2)+ Math.pow(p2.y + 15 - p1.by, 2)) < 17){
			p2.hit = true;
		}
		else{
			
		}

	}
	
	function resetGame() {
			p1.x = 820;
			p1.y = 230;
			p1.bx = 65;
			p1.by = 65;
			p1.ba = 0;
			p1.angle = 0;
			p1.fire = false;
			p1.fx = 0;
			p1.fy = 0;
			p1.up = false;
			p1.down = false;
			p1.left = false;
			p1.right = false;
			p1.color = p1.color;
			p1.hit = false;
			p1.name = "RED";
			
			p2.x = 50;
			p2.y = 230;
			p2.bx = 115;
			p2.by = 15;
			p2.ba = 0;
			p2.angle = 0;
			p2.fire = false;
			p2.fx = 0;
			p2.fy = 0;
			p2.up = false;
			p2.down = false;
			p2.left = false;
			p2.right = false;
			p2.color = p2.color;
			p2.hit = false;
			p2.name = "BLUE";
			
			tankCrash = false;
}

	setInterval(update, 10);
	
	};