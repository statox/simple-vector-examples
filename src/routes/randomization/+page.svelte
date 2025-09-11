<script lang="ts">
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(1, 1));
    let topLeft: Vector = $state(new Vector(-3, 3));
    let bottomRight: Vector = $state(new Vector(3, -3));

    let randomized: Vector[] = $derived(
        new Array(10).fill(0).map(() => v1.clone().randomize(topLeft, bottomRight).fixPrecision(5))
    );
    let randomizedX: Vector[] = $derived(
        new Array(10).fill(0).map(() => v1.clone().randomizeX(topLeft, bottomRight).fixPrecision(5))
    );
    let randomizedY: Vector[] = $derived(
        new Array(10).fill(0).map(() => v1.clone().randomizeY(topLeft, bottomRight).fixPrecision(5))
    );

    const inputVectors = $derived([
        {
            name: 'v1',
            vec: v1,
            color: '#0000FF',
            onUpdate: (newVector: Vector) => {
                v1 = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        },
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

    const baseVectors = $derived([
        {
            name: 'topLeft',
            vec: topLeft,
            color: '#00FF00',
            isDraggable: false
        },
        {
            name: 'bottomRight',
            vec: bottomRight,
            color: '#FF0000',
            isDraggable: false
        }
    ]);

    const vectorsRandomize = $derived([
        ...baseVectors,
        ...randomized.map((v, i) => {
            return {
                name: `random ${i + 1}`,
                vec: v,
                color: '#b16ef4',
                isDraggable: false
            };
        })
    ]);

    const vectorsRandomizeX = $derived([
        ...baseVectors,
        ...randomizedX.map((v, i) => {
            return {
                name: `random ${i + 1}`,
                vec: v,
                color: '#b16ef4',
                isDraggable: false
            };
        })
    ]);

    const vectorsRandomizeY = $derived([
        ...baseVectors,
        ...randomizedY.map((v, i) => {
            return {
                name: `random ${i + 1}`,
                vec: v,
                color: '#b16ef4',
                isDraggable: false
            };
        })
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<PageTitle title="Randomization methods" />

<p>
    The randomization methods take two <code>Vector</code> as parameters <code>topLeft</code> and
    <code>bottomRight</code> which are used to bound the generated random values.
</p>
<p>
    On this page you can drag the <code>topLeft</code> and <code>bottomRight</code> vectors to
    change the bounds as well as the <code>v1</code> vector on which we call the
    <code>.randomizeX</code>, <code>.randomizeY</code> and <code>.randomize</code> methods. Each time
    these vectors are changed, the page generates 10 vectors to show a sample of output of the methods.
</p>
<p>
    You will notice that the results of <code>.randomizeX</code> all keep the same <code>.y</code>
    value as <code>v1</code> but have a <code>.x</code> value between the <code>.x</code> properties
    of <code>topLeft</code> and <code>bottomRight</code>.
</p>
<p>
    Similarly the results of <code>.randomizeY</code> all keep the same <code>.x</code>
    value as <code>v1</code> but have a <code>.y</code> value between the <code>.y</code> properties
    of <code>topLeft</code> and <code>bottomRight</code>.
</p>
<p>
    Finally, the results of <code>.randomize</code> are independent from the properties of
    <code>v1</code>
    and only depend on the <code>.x</code> and <code>.y</code> properties of <code>topLeft</code>
    and <code>bottomRight</code>.
</p>

<div class="results">
    <div class="result-section">
        <h3><code>Input</code></h3>
        <VectorsDisplay {grid} vectors={inputVectors}></VectorsDisplay>
    </div>
    <div class="result-section">
        <h3><code>v1.randomizeX(topLeft, bottomRight)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsRandomizeX}></VectorsDisplay>
    </div>
</div>
<div class="results">
    <div class="result-section">
        <h3><code>Input</code></h3>
        <VectorsDisplay {grid} vectors={inputVectors}></VectorsDisplay>
    </div>
    <div class="result-section">
        <h3><code>v1.randomizeY(topLeft, bottomRight)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsRandomizeY}></VectorsDisplay>
    </div>
</div>
<div class="results">
    <div class="result-section">
        <h3><code>Input</code></h3>
        <VectorsDisplay {grid} vectors={inputVectors}></VectorsDisplay>
    </div>
    <div class="result-section">
        <h3><code>v1.randomize(topLeft, bottomRight)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsRandomize}></VectorsDisplay>
    </div>
</div>

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
