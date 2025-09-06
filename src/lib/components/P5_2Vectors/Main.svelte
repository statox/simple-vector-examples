<script lang="ts">
    import { Vector } from 'simple-vector';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';

    interface Props {
        v1: Vector;
        v2: Vector;
        v1Color: string;
        v2Color: string;
        onVector1Update: (newVector: Vector) => void;
        onVector2Update: (newVector: Vector) => void;
    }

    let { v1, v2, v1Color, v2Color, onVector1Update, onVector2Update }: Props = $props();

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

            p5.stroke(v1Color);
            drawVectorAsArrow(p5, v1);
            p5.stroke(v2Color);
            drawVectorAsArrow(p5, v2);

            if (p5.mouseIsPressed) {
                mouse = new Vector(
                    p5.mouseX - p5.width / 2,
                    p5.height / 2 - p5.mouseY
                ).fixPrecision(0);
                const d1 = mouse.distance(v1);
                const d2 = mouse.distance(v2);

                if (d1 <= d2 && d1 < 30) {
                    onVector1Update(mouse);
                } else if (d2 < 30) {
                    onVector2Update(mouse);
                }
            }
        };
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<P5 {sketch} />
