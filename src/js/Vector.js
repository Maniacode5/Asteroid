const _x 	  		    = Symbol("x");
const _y 	  		    = Symbol("y");
const _length 		  = Symbol("length");
const _angle  		  = Symbol("angle");
const _coordinates 	= Symbol("coordinates");
const _position 	  = Symbol("position");
const _vector 	  = Symbol("vector");

export class Point {
  get x () {
    return this[_x];
  }

  get y () {
    return this[_y];
  }

  get vector () {
    return new Vector(
      Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)),
      Math.atan2(this.y, this.x) * 180 / Math.PI
    );
  }

  constructor (x, y) {
    this[_x] = x;
    this[_y] = y;
  }
}

export class Vector {
  static fromCoordinates = (x, y) => Vector.fromPoint(new Point(x, y));

  static fromPoint = (point) => point.vector;

  static add = (vector, ...vectors) => vector.add(...vectors);

  static subtract = (vector, ...vectors) => vector.subtract(...vectors);

  static equal = (a, b) => a.equal(b);

  get angle () {
    return this[_angle];
  }

  get length () {
    return this[_length];
  }

  get coordinates () {
    return this[_coordinates];
  }

  constructor (length, angle) {
    this[_angle] = angle;
    this[_length] = length;
    this[_coordinates] = new Point(
      this.length * Math.cos(this.angle * (Math.PI/180)),
      this.length * Math.sin(this.angle * (Math.PI/180))
    );
  }

  rotate (angle) {
    return new Vector(
      this.length,
      this.angle + angle
    )
  }

  add = (...vectors) => Vector.fromCoordinates(
    vectors.reduce((acc, vector) => acc + vector.coordinates.x, this.coordinates.x),
    vectors.reduce((acc, vector) => acc + vector.coordinates.y, this.coordinates.y)
  );

  subtract = (...vectors) => Vector.fromCoordinates(
    vectors.reduce((acc, vector) => acc - vector.coordinates.x, this.coordinates.x),
    vectors.reduce((acc, vector) => acc - vector.coordinates.y, this.coordinates.y)
  );

  multiply = (multiplicator) =>  new Vector(
      this.length * multiplicator,
      this.angle
  );

  divide = (divisor) =>  new Vector(
      this.length / divisor,
      this.angle
  )

  equal = (vector) => vector.coordinates.x === this.coordinates.x && vector.coordinates.y === this.coordinates.y
}

export class Segment {
  static intersect = ({ position: A, vector: AB }, { position: C, vector: CD}) => {
    const divisor = ((AB.coordinates.x * CD.coordinates.y) - (AB.coordinates.y * CD.coordinates.x)); // diviseur
    let m; // Paramétre du point d'intersection [CD] <> ]AB[ (si 0 < m < 1 le point d'intersection est sur [CD])
    let k;  // Paramétre du point d'intersection [AB] <> ]CD[ (si 0 < k < 1 le point d'intersection est sur [AB])

    if (divisor) { // Les droites se coupents, on calcul les paramétres des 2 segements sur leurs droites secantes
      m = (AB.coordinates.x * A.coordinates.y
           - AB.coordinates.x * C.coordinates.y
           - AB.coordinates.y * A.coordinates.x
           + AB.coordinates.y * C.coordinates.x
          ) / divisor;
      k = (CD.coordinates.x * A.coordinates.y
           - CD.coordinates.x * C.coordinates.y
           - CD.coordinates.y * A.coordinates.x
           + CD.coordinates.y * C.coordinates.x
          ) / divisor;
    } else { // Les droites sont paralleles, pas d'intersection
      return null;
    }

    if (k < 0 || k > 1 || m < 0 || m > 1) { // Les vecteurs ne se coupent pas
      return null;
    }

    const ABIntersect = C.add(CD.multiply(m));
    const CDIntersect = A.add(AB.multiply(k));

    if (!Vector.equal(ABIntersect, CDIntersect)) { // On vérifie le calcul
      throw new Error("Something is wrong.")
    }

    return ABIntersect;
  }

  get position () {
    return this[_position];
  }

  get vector () {
    return this[_vector];
  }

  constructor (position, vector) {
    this[_position] = position;
    this[_vector] = vector;
  }
}

export default Vector;
