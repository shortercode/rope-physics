'use strict';
class Rope {

	constructor (links, length, start, end) {
		const segmentLength = length / links;
		const segments = [];
		let i = links - 1;
		let lastSegment = new Segment(segmentLength, new Vector());

		segments.push(lastSegment);
		while (i--) {
			lastSegment = new Segment(segmentLength, lastSegment.end);
			segments.push(lastSegment);
		}
		this.length = links;
		this.segments = segments;
		this.start = start;
		this.end = end;
		this.color = 'black';

		this.update();
	}

	update () {
		const l = this.length;
		let i;
		let anchor;
		if (this.end) {
			i = l;
			anchor = this.end;
			while (i--) {
				this.segments[i].moveTowards(anchor);
				anchor = this.segments[i].start;
			}
		}
		if (this.start) {
			anchor = this.start;
			i = 0;
			while (i < l) {
				this.segments[i].moveBackwards(anchor);
				anchor = this.segments[i].end;
				i++;
			}
		}
	}

	render (ctx, preventUpdate) {
		let point;
		let i = this.length;
		if (!preventUpdate) {
			this.update();
		}
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		point = this.segments[i - 1].end;
		ctx.moveTo(point.x, point.y);
		while (i--) {
			point = this.segments[i].start;
			ctx.lineTo(point.x, point.y);
		}
		ctx.stroke();
	}

}
