<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(3, 0));
    let v2: Vector = $state(new Vector(0, 3));

    let mixFactor = $state(0.5);
    let mix: Vector = $derived(v1.clone().mix(v2, mixFactor));
    let mixX: Vector = $derived(v1.clone().mixX(v2, mixFactor));
    let mixY: Vector = $derived(v1.clone().mixY(v2, mixFactor));

    let projectOnto: Vector = $derived(v1.clone().projectOnto(v2));

    const baseVectors = $derived([
        {
            name: 'v1',
            vec: v1,
            color: '#00FF00',
            onUpdate: (newVector: Vector) => {
                v1 = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        },
        {
            name: 'v2',
            vec: v2,
            color: '#FF0000',
            onUpdate: (newVector: Vector) => {
                v2 = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        }
    ]);

    const vectorsMix = $derived([
        ...baseVectors,
        {
            name: `v1.mix(v2, ${mixFactor})`,
            vec: mix,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsMixX = $derived([
        ...baseVectors,
        {
            name: `v1.mixX(v2, ${mixFactor})`,
            vec: mixX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsMixY = $derived([
        ...baseVectors,
        {
            name: `v1.mixY(v2, ${mixFactor})`,
            vec: mixY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const vectorsProjectOnto = $derived([
        ...baseVectors,
        {
            name: 'v1.projectOnto(v2)',
            vec: projectOnto,
            color: '#6eb1f4',
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<h2>Interpolation</h2>

<span>Mix factor:</span>
<input bind:value={mixFactor} type="number" min="0" max="1" step="0.1" />

<div class="results">
    <div>
        <h3><code>v1.mix(v2, {mixFactor})</code></h3>
        <VectorsDisplay {grid} vectors={vectorsMix}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.mixX(v2, {mixFactor})</code></h3>
        <VectorsDisplay {grid} vectors={vectorsMixX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.mixY(v2, {mixFactor})</code></h3>
        <VectorsDisplay {grid} vectors={vectorsMixY}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.projectOnto(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsProjectOnto}></VectorsDisplay>
    </div>
</div>

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
