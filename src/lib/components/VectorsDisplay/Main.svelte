<script lang="ts">
    import { Vector } from 'simple-vector';
    import type { VectorProp } from './utils';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';

    interface Props {
        vectors: VectorProp[];
    }

    let { vectors }: Props = $props();

    let _p5: p5;

    const drawVectorAsArrow = (p5: p5, v: Vector) => {
        const x = p5.width / 2 + v.x;
        const y = p5.height / 2 - v.y;

        try {
            const rightArrow = v.clone().invert().rotateByDeg(45).resize(10);
            p5.line(x, y, x + rightArrow.x, y - rightArrow.y);

            const leftArrow = v.clone().invert().rotateByDeg(-45).resize(10);
            p5.line(x, y, x + leftArrow.x, y - leftArrow.y);

            p5.line(p5.width / 2, p5.height / 2, x, y);
        } catch {
            p5.circle(p5.width / 2, p5.height / 2, 10);
        }
    };

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(300, 300);
        };

        p5.draw = () => {
            p5.background(240, 240, 240);

            for (const { vec, color } of vectors) {
                p5.stroke(color);
                drawVectorAsArrow(p5, vec);
            }

            if (p5.mouseIsPressed) {
                const mouse = new Vector(
                    p5.mouseX - p5.width / 2,
                    p5.height / 2 - p5.mouseY
                ).fixPrecision(0);

                for (let i = 0; i < vectors.length; i++) {
                    const v = vectors[i];
                    if (!v.isDraggable) {
                        continue;
                    }

                    const d = mouse.distance(v.vec);
                    if (d < 30 && v.onUpdate) {
                        v.onUpdate(mouse);
                        break;
                    }
                }
            }
        };
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<P5 {sketch} />

<div class="vector-values">
    {#each vectors as v (v.name)}
        <div style="color: {v.color}"><code>{v.name}</code></div>
        <div style="color: {v.color}">{v.vec.toString()}</div>
    {/each}
</div>

<style>
    .vector-values {
        display: grid;
        grid-template-columns: 200px 200px;
    }
</style>
