const lineIntersect = function ()
{
	const v = new Vector();
	const u = new Vector();
	return () => (a, b, c, d) {
		v.copy(d).sub(c);
		u.copy(b).sub(a);

		const de = u.x * v.y - u.y * v.x;
		const r = (( a.y - c.y) * v.x - (a.x - c.x) * v.y) / de;

		 return u.clone()
			.multiplyScalar(r)
			.add(a);
	};
}();
const inside = function (a, b, p)
{
	return (b.x - a.x) * (p.y - a.y) > (b.y - a.y) * (p.x - a.x);
};
const clip = function* (subject, clip)
{
	let a;
	let b;
	let c;
	let d;

	let i;
	let ii;
	let l;
	let ll;

	let bCInside;
	let bDInside;

	let input;
	let switcher;
	let output;

	/*
		The algorithm works by cutting the SUBJECT polygon
		by 1 side of the CLIP polygon at a time, then feeding
		the resulting polygon back in for the next side.

		To initialise we populate the OUTPUT array with our
		SUBJECT data. This seems a bit backwards but the loop
		transfers the previous OUTPUT to the INPUT at the start
		of each cycle, so we're avoiding adding a special case
		to the loop for the first cycle.

		Per cycle:
		1. Switch references OUTPUT and INPUT.
		2. Remove all points from the OUTPUT polygon.
		3. Get the current segment from the CLIP polygon as
		vertices A and B.
		4. Loop all segments from the INPUT polygon.
			4. i. Get the current segment from the INPUT polygon
			as vertices C and D.
			4. ii. Decide based upon wether C and D are inside
			CLIP polygon if we should push C, D and/or the
			INTERSECTION to the OUTPUT polygon
	*/
	input = [];
	output = subject.slice(0);
	for (i = 0, l = clip.length; i < l; i++)
	{

		/*
			To avoid creating a new array on each loop
			we swap the INPUT and OUTPUT arrays via a temporary
			variable called SWITCHER. This preserves the
			reference to both arrays allowing us to clear and
			recycle the OUTPUT array.
		*/

		switcher = input;
		input = output;
		output = switcher;
		switcher = null;
		output.length = 0;

		a = clip[i];
		b = clip[i + 1] || clip[0];

		for (ii = 0, ll = input.length; ii < ll; ii++)
		{

			c = input[ii];
			d = input[ii + 1] || input[0];

			bCInside = inside(a, b, c);
		   	bDInside = inside(a, b, d);

			if (bCInside === true)
			{
				if (bDInside === false)
				{
					output.push(intersection(a, b, c, d));
				}
				output.push(c);
			}
			else
			{
				if (bDInside === true)
				{
					output.push(intersection(a, b, c, d));
				}
			}
		}
	}
	return output;
};
