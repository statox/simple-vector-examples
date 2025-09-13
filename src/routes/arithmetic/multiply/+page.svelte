<script lang="ts">
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(3, 0));
    let v2: Vector = $state(new Vector(0, 3));

    let scalar = $state(2);

    let multiply: Vector = $derived(v1.clone().multiply(v2));
    let multiplyX: Vector = $derived(v1.clone().multiplyX(v2));
    let multiplyY: Vector = $derived(v1.clone().multiplyY(v2));

    let multiplyScalar: Vector = $derived(v1.clone().multiplyScalar(scalar));
    let multiplyScalarX: Vector = $derived(v1.clone().multiplyScalarX(scalar));
    let multiplyScalarY: Vector = $derived(v1.clone().multiplyScalarY(scalar));

    const v1Vector = $derived({
        name: 'v1',
        vec: v1,
        color: '#00FF00',
        onUpdate: (newVector: Vector) => {
            v1 = newVector.clone().fixPrecision(1);
        },
        isDraggable: true
    });
    const baseVectors = $derived([
        v1Vector,
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

    const vectorsMultiply = $derived([
        ...baseVectors,
        {
            name: `v1.multiply(v2)`,
            vec: multiply,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsMultiplyX = $derived([
        ...baseVectors,
        {
            name: `v1.multiplyX(v2)`,
            vec: multiplyX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsMultiplyY = $derived([
        ...baseVectors,
        {
            name: `v1.multiplyY(v2)`,
            vec: multiplyY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const vectorsMultiplyScalar = $derived([
        v1Vector,
        {
            name: `v1.multiplyScalar(${scalar})`,
            vec: multiplyScalar,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsMultiplyScalarX = $derived([
        v1Vector,
        {
            name: `v1.multiplyScalarX(${scalar})`,
            vec: multiplyScalarX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsMultiplyScalarY = $derived([
        v1Vector,
        {
            name: `v1.multiplyScalarY(${scalar})`,
            vec: multiplyScalarY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<PageTitle title="Multiplication methods" />

<h3>Vector multiplication</h3>
<div class="results">
    <div>
        <h3><code>v1.multiply(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsMultiply}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.multiplyX(v2</code></h3>
        <VectorsDisplay {grid} vectors={vectorsMultiplyX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.multiplyY(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsMultiplyY}></VectorsDisplay>
    </div>
</div>

<h3>Scalar multiplication</h3>
<span>Scalar to multiply:</span>
<input bind:value={scalar} type="number" step="0.1" />
<div class="results">
    <div>
        <h3><code>v1.multiplyScalar(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsMultiplyScalar}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.multiplyScalarX(v2</code></h3>
        <VectorsDisplay {grid} vectors={vectorsMultiplyScalarX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.multiplyScalarY(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsMultiplyScalarY}></VectorsDisplay>
    </div>
</div>

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
