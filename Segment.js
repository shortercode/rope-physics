class Segment {

	constructor (parent, length, x, y, z) {
		this.parent = parent;
		this.length = length || 0;
		this.start = parent? parent.end : new Vector(x, y, z);
		this.end = new Vector();
	}

	angleTowards (v) {
		this.end.copy(v)
			.sub(this.start)
			.normalize()
			.multiplyScalar(this.length);
	}

	moveTowards (v) {

	}

}
