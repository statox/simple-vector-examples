<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(0, 5));
    let v2: Vector = $state(new Vector(2.5, 0));
    const v1Color = '#FF0000';
    const v2Color = '#00FF00';

    const vectors = $derived([
        {
            name: 'v1',
            vec: v1,
            color: v1Color,
            onUpdate: (newVector: Vector) => {
                v1 = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        },
        {
            name: 'v2',
            vec: v2,
            color: v2Color,
            onUpdate: (newVector: Vector) => {
                v2 = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        }
    ]);
</script>

<h2>Comparison</h2>

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>

<div class="results">
    <div><code>v1.isEqualTo(v2)</code></div>
    <div class:green={v1.isEqualTo(v2)}>{v1.isEqualTo(v2)}</div>

    <div><code>v1.isParallelTo(v2)</code></div>
    <div class:green={v1.isParallelTo(v2)}>{v1.isParallelTo(v2)}</div>

    <div><code>v1.isPerpendicularTo(v2)</code></div>
    <div class:green={v1.isPerpendicularTo(v2)}>{v1.isPerpendicularTo(v2)}</div>

    <div><code>v1.isZero()</code></div>
    <div class:green={v1.isZero()}>{v1.isZero()}</div>

    <div><code>v2.isZero()</code></div>
    <div class:green={v2.isZero()}>{v2.isZero()}</div>
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: 300px 300px;
    }

    .green {
        color: #00ff00;
    }
</style>
