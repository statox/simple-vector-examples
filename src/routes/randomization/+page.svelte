<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let topLeft: Vector = $state(new Vector(-3, 3));
    let bottomRight: Vector = $state(new Vector(3, -3));

    let randomized: Vector = $derived(new Vector().randomize(topLeft, bottomRight));
    let randomizedX: Vector = $derived(new Vector().randomizeX(topLeft, bottomRight));
    let randomizedY: Vector = $derived(new Vector().randomizeY(topLeft, bottomRight));

    const baseVectors = $derived([
        {
            name: 'topLeft',
            vec: topLeft,
            color: '#00FF00',
            onUpdate: (newVector: Vector) => {
                topLeft = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        },
        {
            name: 'bottomRight',
            vec: bottomRight,
            color: '#FF0000',
            onUpdate: (newVector: Vector) => {
                bottomRight = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        }
    ]);

    const vectorsRandomize = $derived([
        ...baseVectors,
        {
            name: `new Vector().randomize(topLeft, bottomRight)`,
            vec: randomized,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsRandomizeX = $derived([
        ...baseVectors,
        {
            name: `new Vector().randomizeX(topLeft, bottomRight)`,
            vec: randomizedX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsRandomizeY = $derived([
        ...baseVectors,
        {
            name: `new Vector().randomizeY(topLeft, bottomRight)`,
            vec: randomizedY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<h2>Randomization</h2>

<div class="results">
    <div>
        <h3><code>new Vector().randomize(topLeft, bottomRight)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsRandomize}></VectorsDisplay>
    </div>
    <div>
        <h3><code>new Vector().randomizeX(topLeft, bottomRight)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsRandomizeX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>new Vector().randomizeY(topLeft, bottomRight)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsRandomizeY}></VectorsDisplay>
    </div>
</div>

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
