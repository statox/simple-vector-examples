<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let clampMax = $state(3);
    let clampMin = $state(1.5);
    let minBoundEnabled = $state(true);

    let v1: Vector = $state(new Vector(0, 4));
    let clamped: Vector = $derived.by(() => {
        try {
            if (minBoundEnabled) {
                return v1.clone().clampMag(clampMax, clampMin);
            }

            return v1.clone().clampMag(clampMax);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_e) {
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

    const vectorsClamp = $derived([
        ...baseVectors,
        {
            name: minBoundEnabled
                ? `v1.clampMag(${clampMax}, ${clampMin})`
                : `v1.clampMag(${clampMax})`,
            vec: clamped,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<h3>Clamp magnitude</h3>

<div class="input-container">
    <span> Enable min bound </span>
    <input type="checkbox" bind:checked={minBoundEnabled} />
    <span class="input">max bound</span>
    <input type="number" bind:value={clampMax} />
    {#if minBoundEnabled}
        <span class="input"> min bound </span>
        <input type="number" bind:value={clampMin} />
    {/if}
</div>

<div class="results">
    <div>
        {#if minBoundEnabled}
            <h3><code>v1.clampMag({clampMax}, {clampMin})</code></h3>
        {:else}
            <h3><code>v1.clampMag({clampMax})</code></h3>
        {/if}
        <VectorsDisplay {grid} vectors={vectorsClamp}></VectorsDisplay>
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
