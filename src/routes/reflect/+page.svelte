<script lang="ts">
    import { VectorsDisplay, type GridProp } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';

    let _p5: p5;
    let v1: Vector = $state(new Vector(3, 3));
    let normal: Vector = $state(new Vector(0, 1));
    let reflected: Vector = $derived(v1.clone().reflect(normal));
    const v1Color = '#00FF00';
    const normalColor = '#FF0000';
    const reflectedColor = '#6e6ef4';

    const vectorsInvert = $derived([
        {
            name: 'v1',
            vec: v1,
            color: v1Color,
            onUpdate: (newVector: Vector) => {
                v1 = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        },
        {
            name: 'normal',
            vec: normal,
            color: normalColor,
            onUpdate: (newVector: Vector) => {
                normal = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        },
        {
            name: `v1.reflect(normal)`,
            vec: reflected,
            color: reflectedColor,
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };

    const drawVectorAsArrow = (p5: p5, v: Vector, scale: number) => {
        const x = p5.width / 2 + scale * v.x;
        const y = p5.height / 2 - scale * v.y;

        p5.strokeWeight(3);
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

    const drawGrid = (p5: p5, grid: GridProp, scale: number) => {
        p5.stroke(125, 80);
        p5.strokeWeight(1);
        for (let i = 0; i < grid.size / grid.graduation; i++) {
            const xPlus = p5.width / 2 + i * scale * grid.graduation;
            p5.line(xPlus, 0, xPlus, p5.height);
            const xMinus = p5.width / 2 - i * scale * grid.graduation;
            p5.line(xMinus, 0, xMinus, p5.height);
            const yPlus = p5.height / 2 + i * scale * grid.graduation;
            p5.line(0, yPlus, p5.width, yPlus);
            const yMinus = p5.height / 2 - i * scale * grid.graduation;
            p5.line(0, yMinus, p5.width, yMinus);
        }
    };

    const getScale = (p5: p5, grid: GridProp) => {
        return p5.width / grid.size;
    };

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(300, 300);
        };

        p5.draw = () => {
            const scale = getScale(p5, grid);
            p5.background(240, 240, 240);

            drawGrid(p5, grid, scale);

            // Draw the input vector as arriving on the center instead of
            // going out from the center
            const inputVec = vectorsInvert[0];
            p5.stroke(inputVec.color);
            p5.push();
            p5.translate(-inputVec.vec.x * scale, inputVec.vec.y * scale);
            drawVectorAsArrow(p5, inputVec.vec, scale);
            p5.pop();

            const normalVec = vectorsInvert[1];
            p5.stroke(normalVec.color);
            drawVectorAsArrow(p5, normalVec.vec, scale);

            // Draw the surface to reflect from as a line perpendicular to
            // the surface normal (We create two vectors to avoid doing maths
            // to translate a single vector, and we make them big enough to
            // go out of the canvas so that we can draw them as arrow but they
            // appear as a line)
            const surface1 = normalVec.vec.clone().resize(10).rotateByDeg(90);
            const surface2 = normalVec.vec.clone().resize(10).rotateByDeg(-90);
            p5.stroke('black');
            drawVectorAsArrow(p5, surface1, scale);
            drawVectorAsArrow(p5, surface2, scale);

            const reflectedVec = vectorsInvert[2];
            p5.stroke(reflectedVec.color);
            drawVectorAsArrow(p5, reflectedVec.vec, scale);
        };
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<h2>Reflect</h2>

<div>
    <p>
        On the first screen you can drag the input vector <span style="color: {v1Color}">v1</span>
        the input vector. This is the vector we are calling <code>.reflect()</code> on.
    </p>
    <p>
        You can also drag the <span style="color: {normalColor}">normal</span> vector. This is the
        argument we pass to <code>v1.reflect(normal)</code>. It represent the normal vector of the
        surface that <span style="color: {v1Color}">v1</span>
        will be reflected on. This surface is rendered as the black line on the second screen.
    </p>
    <p>
        And you can observe how the <span style="color: {reflectedColor}">reflected</span> vector evolves.
    </p>
    <p>
        The second screen is another representation to help visualize how <code>.reflect</code>
        works. It shows:
    </p>
    <ul>
        <li>
            <span style="color: {v1Color}">v1</span> as pointing toward the surface it will be reflected
            on. (The surface is the black line).
        </li>
        <li>
            <span style="color: {normalColor}">normal</span> pointing out of the surface at the
            point where <span style="color: {v1Color}">v1</span> intersects the surface.
        </li>
        <li>
            And <span style="color: {reflectedColor}">reflected</span> as going out from this impact
            point.
        </li>
    </ul>
    <p>
        <strong>Note</strong> how when <span style="color: {v1Color}">v1</span> and
        <span style="color: {normalColor}">normal</span>
        are perpendicular, ie. when the vector is parallel to the surface to reflect on,
        <span style="color: {reflectedColor}">reflected</span>
        keeps the same direction. In a physical simulation that's an edge case to handle before (or after)
        calling <code>.reflect()</code>.
    </p>
    <p>
        <strong>Note</strong> the magnitude of the <span style="color: {normalColor}">normal</span>
        vector doesn't impact the result of <code>.reflect()</code> (Because the method normalize it
        before doing its computation)
    </p>
</div>
<div class="results">
    <div>
        <h3><code>Input</code></h3>
        <VectorsDisplay {grid} vectors={vectorsInvert}></VectorsDisplay>
    </div>
</div>

<P5 {sketch} />

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
