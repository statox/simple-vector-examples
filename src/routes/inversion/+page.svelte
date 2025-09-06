<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(0, 3));

    let invert: Vector = $derived(v1.clone().invert());
    let invertX: Vector = $derived(v1.clone().invertX());
    let invertY: Vector = $derived(v1.clone().invertY());

    const baseVectors = $derived([
        {
            name: 'v1',
            vec: v1,
            color: '#00FF00',
            onUpdate: (newVector: Vector) => {
                v1 = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        }
    ]);

    const vectorsInvert = $derived([
        ...baseVectors,
        {
            name: `v1.invert()`,
            vec: invert,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsInvertX = $derived([
        ...baseVectors,
        {
            name: `v1.invertX()`,
            vec: invertX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsInvertY = $derived([
        ...baseVectors,
        {
            name: `v1.invertY()`,
            vec: invertY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<h2>Inversion</h2>

<div class="results">
    <div>
        <h3><code>v1.invert()</code></h3>
        <VectorsDisplay {grid} vectors={vectorsInvert}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.invertX()</code></h3>
        <VectorsDisplay {grid} vectors={vectorsInvertX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.invertY()</code></h3>
        <VectorsDisplay {grid} vectors={vectorsInvertY}></VectorsDisplay>
    </div>
</div>

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
