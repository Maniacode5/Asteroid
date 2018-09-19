import _ from "lodash";

let height = window.innerHeight, width = window.innerWidth;
// récupère la hauteur et la largeur de la fenêtre

// set up svg width & height
let svg = document.getElementById('svg');
const setSvgSize = (w, h) => {
	svg.setAttribute('width', width);
	svg.setAttribute('height', height);
};

// function to create svg nodes
const createNode = (n, attrs) => {
	n = document.createElementNS('http://www.w3.org/2000/svg', n);
	for (let a in attrs) {
		n.setAttributeNS(null, a.replace(/[A-Z]/g, m => '-' + m.toLowerCase()), attrs[a]);
	}
	svg.appendChild(n);
	return n;
};

// particle constructor

let gravity = false;
//--------------------------
class Particle {
	constructor() {
		this.r = _.random(20, 30); // rayon particule (entre 20 & 30 px)
		this.d = this.r * 2; // diamètre (rayon * 2)
		this.x = _.random(this.r, width - this.d); // position x (entre rayon et largeur ecran - diametre)
		this.y = _.random(this.r, height - this.d); // position y (entre rayon et hauteur ecran - diametre)
		this.col = '#F15025'; // couleur particule
		this.mass = 10 * this.r; // poids de la particule
		// on créé un élément circle en x y et de rayon r et de couleur col
		this.el = createNode('circle', { cx: this.x, cy: this.y, r: this.r, fill: this.col});
		/* on créé le vecteur de trajectoire de la particule
		(vitesse et direction aléatoire dans un périmetre de 3 par rapport au centre de la particule) */
		this.vx = _.random(-3, 3, true); //
		this.vy = _.random(-3, 3, true); //
	}
	get vector() {
		return [this.vx, this.vy];
	}
	rotate(v, theta) {
		return [v[0] * Math.cos(theta) - v[1] * Math.sin(theta), v[0] * Math.sin(theta) + v[1] * Math.cos(theta)];
	}
	update() {
		this.x += this.vx; // on ajoute vx (position x de la trjectoire) à x pour obtenir la nouvelle position
		this.y += this.vy; // on ajoute vy (position y de la trjectoire) à y pour obtenir la nouvelle position
		this.y += (gravity ? 9.8 : 0); // on rajoute la gravité si il y en a

		// check si la paricule touche la bordure de la fenetre
		if (this.x <= this.r || this.x + this.r > width) { // check en x (mur de droite & gauche)
			this.x = this.x <= this.r
								? this.r
								: width - this.r;
			this.vx *= -1; // on inverse la trajectoire en x
		}
		if (this.y <= this.r || this.y + this.r > height) { // check en y (mur du haut & bas)
			this.y = this.y <= this.r
								? this.r
								: height - this.r;
			this.vy *= -1; // on inverse la trajectoire en y
		}
		// update pos
		this.draw();
	}
	collide(b) {
		// get angle
		let theta = -Math.atan2(b.y - this.y, b.x - this.x);
		// mass
		let m1 = this.mass,
			 m2 = b.mass;
		// update vectors
		let v1 = this.rotate(this.vector, theta),
			 v2 = this.rotate(b.vector, theta);
		// calculate momentum
		let u1 = this.rotate([v1[0] * (m1 - m2) / (m1 + m2) + v2[0] * 2 * m2 / (m1 + m2), v1[1]], -theta),
			 u2 = this.rotate([v2[0] * (m2 - m1) / (m1 + m2) + v1[0] * 2 * m1 / (m1 + m2), v2[1]], -theta);
		// set new velocities
		this.vx = u1[0];
		this.vy = u1[1];
		b.vx = u2[0];
		b.vy = u2[1];
	}
	checkForIntercept(b) {
		let dx = Math.abs(this.x - b.x), // Difference de position X
			 dy = Math.abs(this.y - b.y), // Difference de position Y
			 dis = Math.sqrt(dx * dx + dy * dy), // Distance entre les particules (Racine de A^2 + B^2)
			 r_combined = this.r + b.r, // Somme des rayons des particules
			 collision = dis < r_combined; // Y a t'il collision ?

		/**
			On calcul les nouvelles trajectoires des particules si il y a colision
		**/
		if (collision) {

			let theta = -Math.atan2(b.y - this.y, b.x - this.x);

			let rx = (dis - r_combined) * Math.cos(theta) / 2,
				 ry = (dis - r_combined) * Math.sin(theta) / 2;

			ry = ry < 0 ? 0 : ry;
			rx = rx < 0 ? 0 : rx;

			this.x += this.x < b.x ? -rx : rx;
			b.x += this.x < b.x ? rx : -rx;

			this.y += this.y < b.y ? -ry : ry;
			b.y += this.y < b.y ? ry : -ry;

			this.collide(b, dx, dy);
			this.collision = true;
			b.collision = true;
		}
	}
	draw() {
		this.el.setAttribute('cx', this.x);
		this.el.setAttribute('cy', this.y);
		this.el.setAttribute('fill', this.collision ? '#F47F60' : this.col);
		this.collision = false;
	}
}
//---------------------
// create particles

let particles = [];
let maxParticles = 100;

for (let i = 0; i < maxParticles; i++) {
	particles.push(new Particle());
}

// animation loop

const loop = () => {
	// accounting for page resizing
	width = window.innerWidth;
	height = window.innerHeight;
	setSvgSize(width, height);
	// looping through particles checking for collisions and updating pos
	for (let i = 0; i < maxParticles; i++) {
		for (let n = i + 1; n < maxParticles; n++) {
			particles[i].checkForIntercept(particles[n])
		}
		particles[i].update();
	}
	window.requestAnimationFrame(loop);
}

loop();

// button

document.getElementById('add-gravity').addEventListener('click', ev => {
	gravity = !gravity;
});
