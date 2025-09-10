<script lang="ts">
    import { Vector } from 'simple-vector';
    import type { GridProp, VectorProp } from './utils';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';

    interface Props {
        vectors: VectorProp[];
        grid: GridProp;
    }

    let { grid, vectors }: Props = $props();

    let _p5: p5;
    let scale = $state(1);
    let draggedVectorIndex: number | null = null;

    const drawVectorAsArrow = (p5: p5, v: Vector) => {
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

    const drawGrid = (p5: p5, grid: GridProp) => {
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

    const mouseIsInCanvas = (p5: p5) => {
        return p5.mouseX >= 0 && p5.mouseY >= 0 && p5.mouseX < p5.width && p5.mouseY < p5.height;
    };

    const updateScale = (p5: p5, grid: GridProp) => {
        scale = p5.width / grid.size;
    };

    const screenToVectorCoord = (p5: p5, v: Vector) => {
        return new Vector(v.x - p5.width / 2, p5.height / 2 - v.y).divideScalar(scale);
    };

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(300, 300);
        };

        p5.draw = () => {
            updateScale(p5, grid);
            p5.background(240, 240, 240);

            drawGrid(p5, grid);
            for (const { vec, color } of vectors) {
                p5.stroke(color);
                drawVectorAsArrow(p5, vec);
            }

            if (p5.mouseIsPressed && mouseIsInCanvas(p5)) {
                const mouse = screenToVectorCoord(p5, new Vector(p5.mouseX, p5.mouseY));

                const draggableVectors = vectors.filter((v) => v.isDraggable);
                if (draggedVectorIndex !== null) {
                    const vec = draggableVectors[draggedVectorIndex];
                    if (vec.onUpdate) {
                        vec.onUpdate(mouse);
                    }
                } else {
                    for (let i = 0; i < draggableVectors.length; i++) {
                        const v = draggableVectors[i];
                        const d = mouse.distance(v.vec);

                        if (
                            v.onUpdate &&
                            (d < grid.graduation / 2 || draggableVectors.length === 1)
                        ) {
                            draggedVectorIndex = i;
                            v.onUpdate(mouse);
                            break;
                        }
                    }
                }
            } else {
                draggedVectorIndex = null;
            }
        };
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<div class="canvas-container">
    <P5 {sketch} />
</div>

<div class="vector-values">
    {#each vectors as v (v.name)}
        <div style="color: {v.color}"><code>{v.name}</code></div>
        <div style="color: {v.color}">{v.vec.toString()}</div>
    {/each}
</div>

<style>
    .canvas-container {
        /* Prevent the user from scrolling the page when dragging a vector on mobile */
        touch-action: none;
        /* Also prevent text selection or context menu appearance */
        user-select: none;
        -webkit-user-select: none;
    }
    .vector-values {
        display: grid;
        grid-template-columns: 200px 400px;
    }
</style>
