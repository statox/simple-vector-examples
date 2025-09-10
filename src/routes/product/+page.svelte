<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(2.5, 0));
    let v2: Vector = $state(new Vector(0, 4));

    const vectors = $derived([
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
</script>

<h2>Product</h2>

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>

<div class="results">
    <div><code>v1.dot(v2)</code></div>
    <div>{v1.dot(v2)}</div>

    <div><code>v2.dot(v1)</code></div>
    <div>{v2.dot(v1)}</div>

    <div><code>v1.cross(v2)</code></div>
    <div>{v1.cross(v2)}</div>

    <div><code>v2.cross(v1)</code></div>
    <div>{v2.cross(v1)}</div>
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: 300px 300px;
    }
</style>
