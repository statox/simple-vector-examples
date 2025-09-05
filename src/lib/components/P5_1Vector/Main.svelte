<script lang="ts">
    import { Vector } from 'simple-vector';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';

    interface Props {
        v: Vector;
        onVectorUpdate: (newVector: Vector) => void;
    }

    let { v, onVectorUpdate }: Props = $props();

    let _p5: p5;
    let mouse = $state(new Vector(0, 0));

    const drawVectorAsArrow = (p5: p5, v: Vector) => {
        const x = p5.width / 2 + v.x;
        const y = p5.height / 2 - v.y;

        p5.line(p5.width / 2, p5.height / 2, x, y);

        const rightArrow = v.clone().invert().rotateByDeg(45).resize(10);
        p5.line(x, y, x + rightArrow.x, y - rightArrow.y);

        const leftArrow = v.clone().invert().rotateByDeg(-45).resize(10);
        p5.line(x, y, x + leftArrow.x, y - leftArrow.y);
    };

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(300, 300);
        };

        p5.draw = () => {
            p5.background(240, 240, 240);

            drawVectorAsArrow(p5, v);

            if (p5.mouseIsPressed) {
                mouse = new Vector(
                    p5.mouseX - p5.width / 2,
                    p5.height / 2 - p5.mouseY
                ).fixPrecision(0);
                onVectorUpdate(mouse);
            }
        };
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<P5 {sketch} />
