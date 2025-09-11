<script lang="ts">
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let max = $state(2);
    let factor = $state(0.5);

    let v1: Vector = $state(new Vector(3, 3));
    let limited: Vector = $derived(v1.clone().limit(max, factor));
    let limitedX: Vector = $derived(v1.clone().limitX(max, factor));
    let limitedY: Vector = $derived(v1.clone().limitY(max, factor));

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

    const vectorsLimit = $derived([
        ...baseVectors,
        {
            name: `v1.limit(${max}, ${factor})`,
            vec: limited,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsLimitX = $derived([
        ...baseVectors,
        {
            name: `v1.limitX(${max}, ${factor})`,
            vec: limitedX,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const vectorsLimitY = $derived([
        ...baseVectors,
        {
            name: `v1.limitY(${max}, ${factor})`,
            vec: limitedY,
            color: '#6eb1f4',
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<PageTitle title="Limit methods" />

<div class="input-container">
    <span>max</span><input type="number" bind:value={max} />
    <span>factor</span> <input type="number" bind:value={factor} />
</div>

<div class="results">
    <div>
        <h3><code>v1.limit({max}, {factor})</code></h3>
        <VectorsDisplay {grid} vectors={vectorsLimit}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.limitX({max}, {factor})</code></h3>
        <VectorsDisplay {grid} vectors={vectorsLimitX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.limitY({max}, {factor})</code></h3>
        <VectorsDisplay {grid} vectors={vectorsLimitY}></VectorsDisplay>
    </div>
</div>

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .input-container {
        display: grid;
        grid-template-columns: max-content min-content;
        column-gap: 1rem;
    }
</style>
