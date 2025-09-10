<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let resizedMag = $state(2);

    let v1: Vector = $state(new Vector(3, 3));
    let normalized: Vector = $derived.by(() => {
        try {
            return v1.clone().normalize();
        } catch {
            return v1.clone().zero();
        }
    });
    let resized: Vector = $derived.by(() => {
        try {
            return v1.clone().resize(resizedMag);
        } catch {
            return v1.clone().zero();
        }
    });

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

    const vectorsNormalize = $derived([
        ...baseVectors,
        {
            name: `v1.normalize()`,
            vec: normalized,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsResize = $derived([
        ...baseVectors,
        {
            name: `v1.resize(${resizedMag})`,
            vec: resized,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<h3>Length</h3>

<div class="results">
    <div>
        <h3><code>v1.resize({resizedMag})</code></h3>
        <span>Resized magnitude</span><input type="number" bind:value={resizedMag} />
        <VectorsDisplay {grid} vectors={vectorsResize}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.normalize()</code></h3>
        <VectorsDisplay {grid} vectors={vectorsNormalize}></VectorsDisplay>
    </div>
</div>

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
