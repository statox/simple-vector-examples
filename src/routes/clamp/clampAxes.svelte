<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let clampMax = $state(2);
    let clampMin = $state(-2);
    let minBoundEnabled = $state(true);

    let v1: Vector = $state(new Vector(0, 4));
    let clampedX: Vector = $derived.by(() => {
        try {
            if (minBoundEnabled) {
                return v1.clone().clampX(clampMax, clampMin);
            }

            return v1.clone().clampX(clampMax);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_e) {
            return v1.clone().zero();
        }
    });
    let clampedY: Vector = $derived.by(() => {
        try {
            if (minBoundEnabled) {
                return v1.clone().clampY(clampMax, clampMin);
            }

            return v1.clone().clampY(clampMax);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_e) {
            return v1.clone().zero();
        }
    });
    let clampedAxes: Vector = $derived.by(() => {
        try {
            if (minBoundEnabled) {
                return v1.clone().clampAxes(clampMax, clampMin);
            }

            return v1.clone().clampY(clampMax);
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

    const vectorsClampX = $derived([
        ...baseVectors,
        {
            name: minBoundEnabled
                ? `v1.clampX(${clampMax}, ${clampMin})`
                : `v1.clampX(${clampMax})`,
            vec: clampedX,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);
    const vectorsClampY = $derived([
        ...baseVectors,
        {
            name: minBoundEnabled
                ? `v1.clampY(${clampMax}, ${clampMin})`
                : `v1.clampY(${clampMax})`,
            vec: clampedY,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);
    const vectorsClampAxes = $derived([
        ...baseVectors,
        {
            name: minBoundEnabled
                ? `v1.clampAxes(${clampMax}, ${clampMin})`
                : `v1.clampAxes(${clampMax})`,
            vec: clampedAxes,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<h3>Clamp axes</h3>

<span>max bound</span><input type="number" bind:value={clampMax} />
<span>Enable min bound <input type="checkbox" bind:checked={minBoundEnabled} /></span>
{#if minBoundEnabled}
    <span>min bound</span>
    <input type="number" bind:value={clampMin} />
{/if}

<div class="results">
    <div>
        {#if minBoundEnabled}
            <h3><code>v1.clampX({clampMax}, {clampMin})</code></h3>
        {:else}
            <h3><code>v1.clampX({clampMax})</code></h3>
        {/if}
        <VectorsDisplay {grid} vectors={vectorsClampX}></VectorsDisplay>
    </div>

    <div>
        {#if minBoundEnabled}
            <h3><code>v1.clampX({clampMax}, {clampMin})</code></h3>
        {:else}
            <h3><code>v1.clampX({clampMax})</code></h3>
        {/if}
        <VectorsDisplay {grid} vectors={vectorsClampY}></VectorsDisplay>
    </div>

    <div>
        {#if minBoundEnabled}
            <h3><code>v1.clampAxes({clampMax}, {clampMin})</code></h3>
        {:else}
            <h3><code>v1.clampAxes({clampMax})</code></h3>
        {/if}
        <VectorsDisplay {grid} vectors={vectorsClampAxes}></VectorsDisplay>
    </div>
</div>

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
