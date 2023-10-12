import { type Vector } from "./vector";

// Given a start and stop radius that defines one quarter of an annulus
// generate a random set of positions. The algorithm ensures that there is no
// overlap between the position. Radii & blipWidth are left in the coordinate system that
// that they are originally defined in.
export class BlipPositionGenerator {
  // Defines the directional vector from the origin of a quadrant
  // Used to orient the final positions that are generated
  private radialBasis: Vector;
  private innerRadius: number;
  private outerRadius: number;
  private symbolRadius: number;

  // Generate 0-90deg and remap to the quadrant defined by radialBasis
  private angleStart = 0.;
  private angleEnd = Math.PI / 2.;

  constructor(radialBasis: Vector,
    innerRadius: number, outerRadius: number, symbolRadius: number) {
    this.radialBasis = radialBasis;
    // Avoid overlapping ring boundaries by shrinking the generation area by the symbol radius
    this.innerRadius = innerRadius + symbolRadius;
    this.outerRadius = outerRadius - symbolRadius;
    this.symbolRadius = symbolRadius;

    this.throwIfObjectNotValid();
  }

  generateCentres(numberOfPositions: number): Vector[] {
    let centres: Vector[] = [];
    while (centres.length < numberOfPositions) {
      const trialCentre = this.generateTrialCentre();
      if (this.accept(trialCentre, centres))
        centres.push(trialCentre);
    }
    return centres;
  }

  private generateTrialCentre(): Vector {
    // generate in polar coordinates and convert to XY
    // take into account area of circle proportional to r^2
    // https://www.anderswallin.net/2009/05/uniform-random-points-in-a-circle-using-polar-coordinates/
    const rGen = (this.outerRadius - this.innerRadius) * Math.sqrt(Math.random());
    // Compute angular width of the symbol at this radius and shrink the angular
    // generation region by this amount at each end to avoid overlapping the boundary
    const symbolTheta = Math.atan(this.symbolRadius / rGen);
    const thetaGenStart = this.angleStart + symbolTheta;
    const thetaGenEnd = this.angleEnd - symbolTheta;
    const thetaGen = (thetaGenEnd - thetaGenStart) * Math.random();
    return {
      x: this.radialBasis.x * ((this.innerRadius + rGen) * Math.cos(thetaGenStart + thetaGen)),
      y: this.radialBasis.y * ((this.innerRadius + rGen) * Math.sin(thetaGenStart + thetaGen))
    };
  }

  private accept(trialCentre: Vector, existingCentres: Vector[]) {
    let accept = true;
    for (let existingCentre of existingCentres) {
      if (this.intersects(trialCentre, existingCentre)) {
        accept = false;
        break;
      }
    }
    return accept;
  }

  private intersects(c1: Vector, c2: Vector) {
    const centreSep = Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
    return (centreSep < 2. * this.symbolRadius)
  }



  private throwIfObjectNotValid() {
    if (this.innerRadius >= this.outerRadius) {
      throw Error(`Invalid arguments: innerRadius >= outerRadius (${this.innerRadius} >= ${this.outerRadius})`);
    }
  }
};
