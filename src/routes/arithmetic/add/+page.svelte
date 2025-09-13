<script lang="ts">
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(3, 0));
    let v2: Vector = $state(new Vector(0, 3));

    let scalar = $state(2);

    let add: Vector = $derived(v1.clone().add(v2));
    let addX: Vector = $derived(v1.clone().addX(v2));
    let addY: Vector = $derived(v1.clone().addY(v2));

    let addScalar: Vector = $derived(v1.clone().addScalar(scalar));
    let addScalarX: Vector = $derived(v1.clone().addScalarX(scalar));
    let addScalarY: Vector = $derived(v1.clone().addScalarY(scalar));

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

    const vectorsAdd = $derived([
        ...baseVectors,
        {
            name: `v1.add(v2)`,
            vec: add,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsAddX = $derived([
        ...baseVectors,
        {
            name: `v1.addX(v2)`,
            vec: addX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsAddY = $derived([
        ...baseVectors,
        {
            name: `v1.addY(v2)`,
            vec: addY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const vectorsAddScalar = $derived([
        v1Vector,
        {
            name: `v1.addScalar(${scalar})`,
            vec: addScalar,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsAddScalarX = $derived([
        v1Vector,
        {
            name: `v1.addScalarX(${scalar})`,
            vec: addScalarX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsAddScalarY = $derived([
        v1Vector,
        {
            name: `v1.addScalarY(${scalar})`,
            vec: addScalarY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<PageTitle title="Addition methods" />

<h3>Vector addition</h3>
<div class="results">
    <div>
        <h3><code>v1.add(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsAdd}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.addX(v2</code></h3>
        <VectorsDisplay {grid} vectors={vectorsAddX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.addY(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsAddY}></VectorsDisplay>
    </div>
</div>

<h3>Scalar addition</h3>
<span>Scalar to add:</span>
<input bind:value={scalar} type="number" step="0.1" />
<div class="results">
    <div>
        <h3><code>v1.addScalar(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsAddScalar}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.addScalarX(v2</code></h3>
        <VectorsDisplay {grid} vectors={vectorsAddScalarX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.addScalarY(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsAddScalarY}></VectorsDisplay>
    </div>
</div>

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
