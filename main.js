'use strict';
class Camera {

	constructor (near) {
		this.x = 0;
		this.y = 0;
		this.world = new Matrix();
		this.rotation = new Quaternion();
		this.scale = new Vector(1, 1, 1);
		this.position = new Vector();
		//this.near = near || 1;
		this.update();
	}

	update () {
		this.world.compose(this.rotation, this.scale, this.position);
		//this.x = this.near * this.position.x / -this.position.z;
		//this.y = this.near * this.position.y / -this.position.z;
	}

}

class FlatV extends Vector{

	constructor (x, y, z) {
		super(x, y, z);
	}

	project (v, c) {
		this.copy(v);
		this.applyMatrix(c.world);
		//this.applyMatrix(c.projection);
		//this.x = 2 * c.x / (r - 1) - (r + 1) / (r - 1);
		//this.y = 2 * c.y / (t - b) - (t + b) / (t - b);

		//this.x = ((v.x - c.position.x) / (v.z - c.position.z)) * 512 + 512;	// x/z
		//this.y = ((v.y - c.position.y) / (v.z - c.position.z)) * 512 + 512;	// y/z

		this.x = ((this.x) / (this.z)) * 512 + 512;	// x/z
		this.y = ((this.y) / (this.z)) * 512 + 512;
		this.z = 0;
	}

}

class Line {

	constructor (rope, camera) {
		this.rope = rope;
		this.camera = camera;
		this.points = [];
		this.length = rope.length;
		this.color = 'black';
		let i = rope.length;
		while (i--) {
			this.points.push(new FlatV());
		}
	}

	update () {
		this.rope.update();
		let i = this.length;
		this.points[i - 1].project(this.rope.segments[i - 2].end, this.camera);
		while (i--) {
			this.points[i].project(this.rope.segments[i].start, this.camera);
		}
	}

	render (ctx, preventUpdate) {
		let point;
		let i = this.length - 1;
		if (!preventUpdate) {
			this.update();
		}
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		point = this.points[i];
		ctx.moveTo(point.x, point.y);
		while (i--) {
			point = this.points[i];
			ctx.lineTo(point.x, point.y);
		}
		ctx.stroke();
	}

}

const UP = new Vector(1, 1, 0).normalize();
const redraw = (t) => {
	requestAnimationFrame(redraw);
	cam.rotation.setFromAxisAngle(UP, t / 1600);
	cam.update();

	mouse.x = (distance * Math.cos(t / 800));
	mouse.y = (distance * Math.sin(t / 800));
	mouse.z = 310;
	//mouse.z = (distance * Math.cos(t / 1600)) + 512;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(38, 38, 38)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	line.render(ctx);

	let i = trails.length;
	while (i--) {
		trails[i].render(ctx);
	}
	//deopt badness
	//for(let r of trails) {
	//	r.render(ctx);
	//}
}

const resize = (width, height) => {
	canvas.width = width;
	canvas.height = height;
};

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const cam = new Camera();
cam.position = new Vector(0, 0, 512);
cam.update();
const mouse = new Vector(0, 0, 0);

const rope = new Rope(
	400,
	400,
	new Vector(0, 0, 0),
	mouse
);

const line = new Line(rope, cam);
line.color = 'white';

const trails = [];
const tack = new Vector(0, 0, 200);

(function(){
	let i = rope.length - 20;
	let r;
	let l;
	while ((i -= 5) > 50) {
		r = new Rope(
			i * 3,
			Math.sqrt((i * i) + (400 * 400)),
			null,//rope.segments[i].end,
			rope.segments[i].end
		);
		l = new Line(r, cam);
		l.color = "rgba(" + [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)].join() + ", 0.6)";
		trails.push(l);
	}
}());

let distance = 200;

resize(1024, 1024);
document.body.appendChild(canvas);
canvas.addEventListener('mousemove', onmousemove, false);
redraw();
