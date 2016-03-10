'use strict';
class Quaternion {

	constructor (x, y, z, w) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = ( w !== undefined ) ? w : 1;
	}

	clone () {
		return new Quaternion(this.x, this.y, this.z, this.w);
	}

	copy (quat) {

		this.x = quat.x;
		this.y = quat.y;
		this.z = quat.z;
		this.w = quat.w;

		return this;
	}

	setFromAxisAngle (axis, angle) {

		const halfAngle = angle / 2, s = Math.sin(halfAngle);

		this.x = axis.x * s;
		this.y = axis.y * s;
		this.z = axis.z * s;
		this.w = Math.cos(halfAngle);

		return this;

	}

}
