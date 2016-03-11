Intersection = {

	line: () => {
		const v = new Vector();
		const u = new Vector();
		return (a, b, c, d) => {
			v.copy(d).sub(c);
			u.copy(b).sub(a);

			const de = u.x * v.y - u.y * v.x;

			const r = (( a.y - c.y) * v.x - (a.x - c.x) * v.y) / de;
			const s = (( a.y - c.y) * u.x - (a.x - c.x) * u.y) / de;

			return (0 <= r && r <= 1 && 0 <= s && s <= 1);

			// P = A + r * (B - A)

			// return u.clone()
			//	.multiplyScalar(r)
			//	.add(a);
		}
	},

	circle: () => {
		const d = new Vector();
		const r = new Vector();
		return (Av, Ar, Bv, Br) => {
			d.copy(Bv)
				.sub(Av);
			r.copy(Ar)
				.add(Br);
			return r.lengthSq() > d.lengthSq();
		}
	}
}
