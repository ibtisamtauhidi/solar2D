function startApp() {
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;
	document.getElementById("frame").innerHTML = "<canvas id='xcanvas' height='"+HEIGHT+"' width='"+WIDTH+"'></canvas>";
	updateTime();	
}
function init() {
	var xcanvas = document.getElementById("xcanvas");
	var xcontext = xcanvas.getContext("2d");
	xcanvas.width = xcanvas.width;

	for(i = 1;i<10;i++) PlotOrbit(xcontext,i);
	for(i = 1;i<10;i++) PlotBody(xcontext,i);
	PlotSun(xcontext);
}
function PlotSun(scene) {
	r = 50 * (scale/1350);
	scene.fillStyle = "#FF4F00";
	scene.beginPath();
	scene.arc(posX, posY, r, 0, Math.PI*2, true);
	scene.closePath();
	scene.fill();
}

function PlotBody(scene,id) {
	
	scene.fillStyle = "#"+bodyC[id];

	var timeDiff = currentTime.getTime() - epoch[id].getTime();
	if(timeDiff<0) timeDiff-=orbitPeriod[id];	
	var i = ((2*Math.PI)/orbitPeriod[id])*timeDiff;
	i= 2*Math.PI-i;

	var circumference = 2*Math.PI;
	var a = ((aphelion[id]/1000)*scale)+(50*(scale/1300));
	var e = eccentricity[id];
	var r = (a*(1-(e*e)))/(1-(e*Math.cos(i)));
	var x = r*(Math.cos(i))+posX;
	var y = r*(Math.sin(i))+posY;

	r = (bodyR[id]/1000) * (scale/1350);
	scene.beginPath();
	scene.arc(x, y, r, 0, Math.PI*2, true);
	scene.closePath();
	scene.fill();
	scene.fillStyle = "#"+bodyC[id];
	scene.font = "normal 12px Arial";
	scene.fillText(bodyN[id], x+30, y+30);
}

function PlotOrbit(scene,id) {
	scene.fillStyle = '#AAAABC';
	var circumference = 2*Math.PI;
	var a = ((aphelion[id]/1000)*scale)+(50*(scale/1300));
	var e = eccentricity[id];
	for(var i=0.001;i<circumference;i+=0.001) {
		var r = (a*(1-(e*e)))/(1-(e*Math.cos(i)));
		var x = r*(Math.cos(i))+posX;
		var y = r*(Math.sin(i))+posY;
		scene.fillRect(x,y,0.5,0.5);
	}
}
function zoomout() {
		zoomVAR = 1;
		zoom();	
}
function zoomin() {
	zoomVAR = 2;
	zoom();
}
function zoomend() {
	zoomVAR = 0;	
}
function zoom() {
	if(zoomVAR==1) {
		if(scale>20) {
			scale-=15;
			init();
			setTimeout(zoom,20);
		}
	} else if(zoomVAR==2) {
		scale+=15;
		init();
		setTimeout(zoom,20);
	}
}
function moveup() {
	moveVAR = 1;	
	move();
}
function moveleft() {
	moveVAR = 2;	
	move();
}
function moveright() {
	moveVAR = 3;	
	move();
}
function movedown() {
	moveVAR = 4;	
	move();
}
function move() {
	if(moveVAR==1) {
		posY-=2;
		init();
		setTimeout(move,30);
	} else if(moveVAR==2) {
		posX-=2;
		init();
		setTimeout(move,30);
	} else if(moveVAR==3) {
		posX+=2;
		init();
		setTimeout(move,30);
	} else if(moveVAR==4) {
		posY+=2;
		init();
		setTimeout(move,30);
	}	
}
function moveend() {
	moveVAR = 0;
}
function movecentre() {
	posX = window.innerWidth/2;
	posY = window.innerHeight/2;	
	init();
}
function printTime() {
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	var time= timeRate+" x | "+day+"/"+month+"/"+year+" "+hours+":"+minutes;
	if (seconds<10) {
		seconds="0" + seconds;
	}
	time = time+":"+seconds;
	document.getElementById("datetime").innerHTML=time;

}
function setAppTime() {
	switch(timeRate) {
		case 1:
			if(fastForward==1) {
				currentTime.setTime(currentTime.getTime()+120);	
				break;
			} else if(fastForward==0) {
				currentTime = new Date();
				break;
			}	
		case 2:
			currentTime.setTime(currentTime.getTime()+76800);	
			break;
		case 3:
			currentTime.setTime(currentTime.getTime()+3276800);	
			break;
		case 4:
			currentTime.setTime(currentTime.getTime()+16553600);	
			break;
		case 5:
			currentTime.setTime(currentTime.getTime()+213107200);	
			break;
		case 6:
			currentTime.setTime(currentTime.getTime()+1326214400);	
			break;
		case 7:
			currentTime.setTime(currentTime.getTime()+2452428800);	
			break;
		case 8:
			currentTime.setTime(currentTime.getTime()+12504857600);	
			break;
		case 9:
			currentTime.setTime(currentTime.getTime()+22604857600);	
			break;
	}
}
function updateTime() {
		setAppTime();
		printTime();
		init();
		setTimeout('updateTime()',100);
}
function slowTimeRate() {
	if(timeRate>1) {
		timeRate-=1;
	}
}
function fastTimeRate() {
	fastForward = 1;
	if(timeRate<9) {
		timeRate+=1;
	}
}
function normalTimeRate() {
	timeRate=1;
}
function toCurrentTime() {
		fastForward = 0;
		timeRate=1;
		currentTime = new Date();
}
function mouseover(id) {
	document.getElementById(""+id).style.background = "#F4F4F4";
}
function mouseout(id) {
	document.getElementById(""+id).style.background = "#F93";
}
function headermouseover() {
	document.getElementById("header").style.color = "#F4F4F4";
}
function headermouseout() {
	document.getElementById("header").style.color = "#000";
}
function intromouseover() {
	document.getElementById("okgotit").style.background = "#033";
}
function intromouseout() {
	document.getElementById("okgotit").style.background = "#036";
}
function resetApp() {
	scale = 1500;
	posX = window.innerWidth/2;
	posY = window.innerHeight/2;
	zoomVAR = 0;
	moveVAR = 0;
	currentTime = new Date();
	timeRate = 1;
	fastForward = 0;	
}
function okgotit() {
	$('#intro').fadeOut(500);	
}