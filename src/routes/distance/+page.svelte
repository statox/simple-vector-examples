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

<h2>Distance</h2>

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>

<div class="results">
    <div><code>v1.absDistanceX(v2)</code></div>
    <div>{v1.absDistanceX(v2)}</div>

    <div><code>v1.distanceX(v2)</code></div>
    <div>{v1.distanceX(v2)}</div>

    <div><code>v1.absDistanceY(v2)</code></div>
    <div>{v1.absDistanceY(v2)}</div>

    <div><code>v1.distanceY(v2)</code></div>
    <div>{v1.distanceY(v2)}</div>

    <div><code>v1.distance(v2)</code></div>
    <div>{v1.distance(v2)}</div>

    <div><code>v1.distanceSq(v2)</code></div>
    <div>{v1.distanceSq(v2)}</div>
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: 300px 300px;
    }
</style>
