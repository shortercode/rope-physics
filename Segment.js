class Segment {

	constructor (parent, length, root) {
		this.parent = parent;
		this.length = length || 0;
		this.start = parent? parent.end : root;
		this.end = new Vector();
	}

	angleTowards (v) {
		this.end.copy(v)
			.sub(this.start)
			.normalize()
			.multiplyScalar(this.length);
	}

	moveTowards (v) {
		this.end.copy(v);
		this.start
			.sub(v)
			.normalize()
			.multiplyScalar(this.length);
	}

}
