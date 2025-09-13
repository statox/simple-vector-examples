<script lang="ts">
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(3, 0));
    let v2: Vector = $state(new Vector(0, 3));

    let scalar = $state(2);

    let divide: Vector = $derived.by(() => {
        try {
            return v1.clone().divide(v2);
        } catch {
            return new Vector();
        }
    });
    let divideX: Vector = $derived.by(() => {
        try {
            return v1.clone().divideX(v2);
        } catch {
            return new Vector();
        }
    });
    let divideY: Vector = $derived.by(() => {
        try {
            return v1.clone().divideY(v2);
        } catch {
            return new Vector();
        }
    });

    let divideScalar: Vector = $derived.by(() => {
        try {
            return v1.clone().divideScalar(scalar);
        } catch {
            return new Vector();
        }
    });
    let divideScalarX: Vector = $derived.by(() => {
        try {
            return v1.clone().divideScalarX(scalar);
        } catch {
            return new Vector();
        }
    });
    let divideScalarY: Vector = $derived.by(() => {
        try {
            return v1.clone().divideScalarY(scalar);
        } catch {
            return new Vector();
        }
    });

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

    const vectorsDivide = $derived([
        ...baseVectors,
        {
            name: `v1.divide(v2)`,
            vec: divide,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsDivideX = $derived([
        ...baseVectors,
        {
            name: `v1.divideX(v2)`,
            vec: divideX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsDivideY = $derived([
        ...baseVectors,
        {
            name: `v1.divideY(v2)`,
            vec: divideY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const vectorsDivideScalar = $derived([
        v1Vector,
        {
            name: `v1.divideScalar(${scalar})`,
            vec: divideScalar,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsDivideScalarX = $derived([
        v1Vector,
        {
            name: `v1.divideScalarX(${scalar})`,
            vec: divideScalarX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsDivideScalarY = $derived([
        v1Vector,
        {
            name: `v1.divideScalarY(${scalar})`,
            vec: divideScalarY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const grid = { size: 10, graduation: 1 };
</script>

<PageTitle title="Division methods" />

<p style="background-color: var(--box-bg)">
    <strong>Note</strong> when trying to divide by zero the methods will actually throw a
    <code>DivisionByZeroError</code> exception. In this page we just set the result to a zero vector
    instead.
</p>

<h3>Vector division</h3>
<div class="results">
    <div>
        <h3><code>v1.divide(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsDivide}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.divideX(v2</code></h3>
        <VectorsDisplay {grid} vectors={vectorsDivideX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.divideY(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsDivideY}></VectorsDisplay>
    </div>
</div>

<h3>Scalar division</h3>
<span>Scalar to divide:</span>
<input bind:value={scalar} type="number" step="0.1" />
<div class="results">
    <div>
        <h3><code>v1.divideScalar(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsDivideScalar}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.divideScalarX(v2</code></h3>
        <VectorsDisplay {grid} vectors={vectorsDivideScalarX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.divideScalarY(v2)</code></h3>
        <VectorsDisplay {grid} vectors={vectorsDivideScalarY}></VectorsDisplay>
    </div>
</div>

<style>
    .results {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
