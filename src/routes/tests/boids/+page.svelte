<script lang="ts">
    import { Vector } from 'simple-vector';
    import './override-simple-vector.ts';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';

    let _p5: p5;
    let nbVectors = $state(300);

    let separationForce = $state(1.2);
    let cohesionForce = $state(1);

    const topLeft = new Vector(0, 500);
    const bottomRight = new Vector(500, 0);
    const margin = 50;

    const topLeftMargin = topLeft.clone().addScalarX(margin).subtractScalarY(margin);
    const bottomRightMargin = bottomRight.clone().subtractScalarX(margin).addScalarY(margin);
    let positions = $derived(
        new Array(nbVectors)
            .fill(0)
            .map(() => new Vector().randomize(topLeftMargin, bottomRightMargin))
    );
    let directions = $derived(
        new Array(nbVectors)
            .fill(0)
            .map(() => new Vector(1, 0).rotateBy(Math.random() * 2 * Math.PI))
    );

    const up = new Vector(0, 1);
    const down = new Vector(0, -1);
    const right = new Vector(1, 0);
    const left = new Vector(-1, 0);

    const target = new Vector(bottomRight.x / 2, topLeft.y / 2);
    const targetDirection = Vector.randomUnitVector().resize(2);

    const visionDistance = 30;
    const visionDistanceSq = visionDistance ** 2;

    let fps = $state(0);
    let lastCheckFrame = 0;
    let lastCheckTS = 0;

    const canSeeOther = (position: Vector, direction: Vector, otherPosition: Vector) => {
        const dSq = position.distanceSq(otherPosition);
        if (dSq > visionDistanceSq) {
            return false;
        }
        const neighborRelativePos = otherPosition.clone().subtract(position);
        const angleWith = direction.angleDegWith(neighborRelativePos);

        if (angleWith > 90) {
            return false;
        }

        return true;
    };

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(bottomRight.x, topLeft.y);
            p5.stroke(0);
        };

        p5.draw = () => {
            p5.background(100);

            p5.strokeWeight(5);
            p5.stroke('red');
            p5.point(target.x, target.y);
            targetDirection.rotateByDeg(Math.random() * 20 - 10);
            if (
                (targetDirection.x < 0 && target.x < topLeftMargin.x) ||
                (targetDirection.x > 0 && target.x > bottomRightMargin.x)
            ) {
                targetDirection.invertX();
            }
            if (
                (targetDirection.y < 0 && target.y < bottomRightMargin.y) ||
                (targetDirection.y > 0 && target.y > topLeftMargin.y)
            ) {
                targetDirection.invertY();
            }
            target.add(targetDirection).wrap(topLeft, bottomRight);
            if (p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height) {
                target.x = p5.mouseX;
                target.y = p5.mouseY;
            }

            p5.strokeWeight(3);
            p5.stroke('black');
            for (let i = 0; i < nbVectors; i++) {
                // Get neighbors in the perception field
                const neighborIndices: number[] = [];
                for (let j = 0; j < nbVectors; j++) {
                    if (j === i) {
                        continue;
                    }
                    if (!canSeeOther(positions[i], directions[i], positions[j])) {
                        continue;
                    }

                    neighborIndices.push(j);
                }

                // Separation
                const separationDirection = new Vector(0, 0);
                const steeringDirection = new Vector(0, 0);
                for (const j of neighborIndices) {
                    const displacement = positions[i].clone().subtract(positions[j]);
                    separationDirection.add(displacement);
                    steeringDirection.add(directions[j]);
                }

                if (canSeeOther(positions[i], directions[i], target)) {
                    // target attracts boids
                    steeringDirection.add(target.clone().subtract(positions[i]));
                    // target repulses boids
                    // steeringDirection.add(positions[i].clone().subtract(target).resize(2));
                }

                let cohesionDirection = new Vector(0, 0);
                if (!separationDirection.isZero()) {
                    separationDirection.normalize().resize(separationForce);
                    cohesionDirection = separationDirection.clone().invert().resize(cohesionForce);
                }

                // Bounce against walls
                if (positions[i].x < topLeftMargin.x) {
                    steeringDirection.add(right);
                }
                if (positions[i].x > bottomRightMargin.x) {
                    steeringDirection.add(left);
                }
                if (positions[i].y < bottomRightMargin.y) {
                    steeringDirection.add(up);
                }
                if (positions[i].y > topLeftMargin.y) {
                    steeringDirection.add(down);
                }

                directions[i]
                    .rotateByDeg(Math.random() * 20 - 10)
                    .rotateTowardsDeg(steeringDirection, 20)
                    .add(separationDirection)
                    .add(cohesionDirection)
                    .normalize();

                positions[i]
                    .add(directions[i])
                    .clampY(topLeft.y, bottomRight.y)
                    .clampX(bottomRight.x, topLeft.x);

                p5.point(positions[i].x, positions[i].y);
            }

            const now = Date.now();
            if (now - lastCheckTS > 1000) {
                fps = p5.frameCount - lastCheckFrame;
                lastCheckFrame = p5.frameCount;
                lastCheckTS = now;
            }
        };
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<P5 {sketch} />

<div>nb point: <input type="number" bind:value={nbVectors} /></div>
<div>separationForce: <input type="number" bind:value={separationForce} /></div>
<div>cohesionForce: <input type="number" bind:value={cohesionForce} /></div>
<div>FPS: {fps}</div>
