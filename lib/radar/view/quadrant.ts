import { QuadrantConfig } from "../config-types";
import { type Vector } from "../util/vector";


// Define a quadrant from a graphical standpoint
export class Quadrant {
  config: QuadrantConfig;
  centre: Vector;
  // @ts-ignore Initialized by init
  startEndAngles: [number, number];
  // A vector pointing radially outward from the origin within the quadrant
  // @ts-ignore Initialized by init
  radialBasis: Vector;

  // A callable to return the origin of the rectangle that provides a clickable
  // link for the quadrant
  private linkRectOriginFn: any;

  constructor(quadrantConfig: QuadrantConfig, centre: Vector, quadrantPos: string) {
    this.config = quadrantConfig;
    this.centre = centre;

    this.init(quadrantPos);
  }

  labelPosition(outerRingRadius: number): { x: number, y: number, anchor: string } {
    const anchor = (this.radialBasis.x < 0) ? "start" : "end";
    return { x: outerRingRadius * this.radialBasis.x, y: outerRingRadius * this.radialBasis.y, anchor: anchor }
  }

  linkRectOrigin(outerRingRadius: number): Vector {
    return this.linkRectOriginFn(outerRingRadius);
  }

  // Based on a left-handed coordinate system with the origin at the centre of
  // the circledetermine a unit vector that points into this quadrant based on
  // start/end angles given
  private init(quadrantPos: string) {
    switch (quadrantPos) {
      case 'top-left': {
        this.radialBasis = { x: -1, y: -1 };
        this.startEndAngles = [3 * Math.PI / 2, 2 * Math.PI];
        this.linkRectOriginFn = ((radius: number) => { return { x: -radius, y: -radius } });
        break;
      }
      case 'top-right': {
        this.radialBasis = { x: 1, y: -1 };
        this.startEndAngles = [0, Math.PI / 2.];
        this.linkRectOriginFn = ((radius: number) => { return { x: 0, y: -radius } });
        break;
      }
      case 'bottom-right': {
        this.radialBasis = { x: 1, y: 1 };
        this.startEndAngles = [Math.PI / 2., Math.PI];
        this.linkRectOriginFn = ((_: number) => { return { x: 0, y: 0 } });
        break;
      }
      case 'bottom-left': {
        this.radialBasis = { x: -1, y: 1 };
        this.startEndAngles = [Math.PI, 3. * Math.PI / 2.];
        this.linkRectOriginFn = ((radius: number) => { return { x: -radius, y: 0 } });
        break;
      }
      default: throw Error(`Unknown quadrant position id: ${quadrantPos}`);
    }
  }
};
