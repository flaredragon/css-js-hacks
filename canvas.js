var canvas=document.getElementsByTagName("canvas")[0];
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext('2d');
c.strokeStyle="rgb(0,0,255)";
var mouse={
	x: undefined,
	y: undefined
}
var maxRadius=40;
// var minRadius=2;
window.addEventListener('mousemove',
	function(){
		mouse.x=event.x;
		mouse.y=event.y;
		console.log(mouse);
	}
);
window.addEventListener("resize",
	function()
	{
		canvas.width=window.innerWidth;
		canvas.height=window.innerHeight;
		init();
	}
	
);
var colorArray=[
	"#2C3E50",
	"#E74C3C",
	"#ECF0F1",
	"#3498DB",
	"#2980B9",



];
function Circle(x,y,dx,dy,radius)
{
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.minRadius=radius;
	this.color=colorArray[Math.floor(Math.random() * colorArray.length)];
	this.draw=function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0, Math.PI * 2,false);
		c.stroke();
		c.fillStyle=this.color;
		c.fill();
	}
	this.update=function(){
		if(this.x+this.radius>innerWidth || this.x-this.radius<0)
			this.dx=-this.dx;
		if(this.y + this.radius>innerHeight || this.y - this.radius<0)
			this.dy=-this.dy;
		this.x+=this.dx;
		this.y+= this.dy;


		if(mouse.x - this.x < 50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50)
			{
				if(this.radius<maxRadius)
				this.radius+=1;
			}
		else if(this.radius>this.minRadius)
			this.radius-=1;
		this.draw();
	}
}
var circleArray= [];
function init()
{
	circleArray=[];
	for(i=0;i<1200;i++)
	{
		var radius= (Math.random() * 3) +1;
		var x=Math.random() * ((innerWidth-(radius*2))+radius);
		var y=Math.random() * ((innerHeight-(radius*2))+radius);
		var dx=(Math.random() - 0.5)*2;
		var dy=(Math.random() - 0.5)*2;
		circleArray.push(new Circle(x,y,dx,dy,radius));
	}
}
init();
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	for(i=0;i<circleArray.length;i++)
	{
		circleArray[i].update();

	}
}
animate(); 