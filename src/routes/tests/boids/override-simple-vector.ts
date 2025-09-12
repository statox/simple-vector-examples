import { Vector } from 'simple-vector';
declare module 'simple-vector' {
    interface Vector {
        wrap(topLeft: Vector, bottomRight: Vector): Vector;
    }
}

Vector.prototype.wrap = function (topLeft: Vector, bottomRight: Vector) {
    if (this.x < topLeft.x) {
        this.x = bottomRight.x - (topLeft.x - this.x);
    } else if (this.x > bottomRight.x) {
        this.x = topLeft.x + (this.x - bottomRight.x);
    }

    if (this.y > topLeft.y) {
        this.y = bottomRight.y - (topLeft.y - this.y);
    } else if (this.y < bottomRight.y) {
        this.y = topLeft.y + (this.y - bottomRight.y);
    }

    return this.clampX(bottomRight.x, topLeft.x).clampY(topLeft.y, bottomRight.y);
};
