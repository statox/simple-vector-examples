<script lang="ts">
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(3, 0));
    let v2: Vector = $state(new Vector(0, 3));

    let scalar = $state(2);

    let subtract: Vector = $derived(v1.clone().subtract(v2));
    let subtractX: Vector = $derived(v1.clone().subtractX(v2));
    let subtractY: Vector = $derived(v1.clone().subtractY(v2));

    let subtractScalar: Vector = $derived(v1.clone().subtractScalar(scalar));
    let subtractScalarX: Vector = $derived(v1.clone().subtractScalarX(scalar));
    let subtractScalarY: Vector = $derived(v1.clone().subtractScalarY(scalar));

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

    const vectorsSubtract = $derived([
        ...baseVectors,
        {
            name: `v1.subtract(v2)`,
            vec: subtract,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsSubtractX = $derived([
        ...baseVectors,
        {
            name: `v1.subtractX(v2)`,
            vec: subtractX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsSubtractY = $derived([
        ...baseVectors,
        {
            name: `v1.subtractY(v2)`,
            vec: subtractY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const vectorsSubtractScalar = $derived([
        v1Vector,
        {
            name: `v1.subtractScalar(${scalar})`,
            vec: subtractScalar,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsSubtractScalarX = $derived([
        v1Vector,
        {
            name: `v1.subtractScalarX(${scalar})`,
            vec: subtractScalarX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsSubtractScalarY = $derived([
        v1Vector,
        {
            name: `v1.subtractScalarY(${scalar})`,
            vec: subtractScalarY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<PageTitle title="Subtraction methods" />

<h3>Vector subtraction</h3>
<div class="results">
    <div>
        <h3><code>v1.subtract(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsSubtract}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.subtractX(v2</code></h3>
        <VectorsDisplay {grid} vectors={vectorsSubtractX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.subtractY(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsSubtractY}></VectorsDisplay>
    </div>
</div>

<h3>Scalar subtraction</h3>
<span>Scalar to subtract:</span>
<input bind:value={scalar} type="number" step="0.1" />
<div class="results">
    <div>
        <h3><code>v1.subtractScalar(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsSubtractScalar}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.subtractScalarX(v2</code></h3>
        <VectorsDisplay {grid} vectors={vectorsSubtractScalarX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.subtractScalarY(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsSubtractScalarY}></VectorsDisplay>
    </div>
</div>

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
