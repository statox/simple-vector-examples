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

    let positions = $derived(
        new Array(nbVectors).fill(0).map(() => new Vector().randomize(topLeft, bottomRight))
    );
    let directions = $derived(
        new Array(nbVectors)
            .fill(0)
            .map(() => new Vector(1, 0).rotateBy(Math.random() * 2 * Math.PI))
    );

    const visionDistance = 30;
    const visionDistanceSq = visionDistance ** 2;

    let fps = $state(0);
    let lastCheckFrame = 0;
    let lastCheckTS = 0;

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(bottomRight.x, topLeft.y);
            p5.stroke(0);
            p5.strokeWeight(3);
        };

        p5.draw = () => {
            p5.background(100);

            for (let i = 0; i < nbVectors; i++) {
                // Get neighbors
                const neighborIndices: number[] = [];
                for (let j = 0; j < nbVectors; j++) {
                    if (j === i) {
                        continue;
                    }
                    const dSq = positions[i].distanceSq(positions[j]);
                    if (dSq > visionDistanceSq) {
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

                let cohesionDirection = new Vector(0, 0);
                if (!separationDirection.isZero()) {
                    separationDirection.normalize().resize(separationForce);
                    cohesionDirection = separationDirection.clone().invert().resize(cohesionForce);
                }

                directions[i]
                    .rotateByDeg(Math.random() * 20 - 10)
                    .rotateTowardsDeg(steeringDirection, 20)
                    .add(separationDirection)
                    .add(cohesionDirection)
                    .normalize();

                positions[i].add(directions[i]).wrap(topLeft, bottomRight);

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
