<script lang="ts">
    import { Vector } from 'simple-vector';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';

    let _p5: p5;
    let pause = $state(false);
    let drawPoints = $state(true);
    let nbVectors = $state(1000);
    let positions = $derived(new Array(nbVectors).fill(0).map(() => new Vector(150, 150)));
    let directions = $derived(
        new Array(nbVectors)
            .fill(0)
            .map(() => new Vector(1, 0).rotateBy(Math.random() * 2 * Math.PI))
    );

    let fps = $state(0);
    let lastCheckFrame = 0;
    let lastCheckTS = 0;

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(300, 300);
            p5.stroke(0);
            p5.strokeWeight(1);
        };

        p5.draw = () => {
            p5.background(100);

            for (let i = 0; i < nbVectors; i++) {
                positions[i].add(directions[i]).clampX(300, 0).clampY(300, 0);
                directions[i].rotateBy(0.009);
                if (drawPoints) {
                    p5.point(positions[i].x, positions[i].y);
                }
            }
            if (!drawPoints) {
                p5.text(p5.frameCount, 0, p5.height / 2);
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

<div>
    <button
        onclick={() => {
            pause = !pause;
            if (pause) {
                _p5.noLoop();
            } else {
                _p5.loop();
            }
        }}>{pause ? 'play' : 'pause'}</button
    >
</div>
<div><button onclick={() => (drawPoints = !drawPoints)}>Toggle points drawing</button></div>
<div>nb vectors: <input type="number" bind:value={nbVectors} /></div>
<div>FPS: {fps}</div>
