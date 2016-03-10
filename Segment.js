'use strict';
class Segment {

	constructor (length, root) {
		this.length = length || 0;
		this.start = root;
		this.end = new Vector();
	}

	moveTowards (v) {
		this.end.copy(v);
		this.start
			.sub(v)
			.normalize()
			.multiplyScalar(this.length)
			.add(v);
	}

	moveBackwards (v) {
		this.start.copy(v);
		this.end
			.sub(v)
			.normalize()
			.multiplyScalar(this.length)
			.add(v);
	}

}
