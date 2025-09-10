<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(0, 5));
    let v2: Vector = $state(new Vector(2.5, 0));

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

<h2>AngleWith</h2>

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>

<div class="results">
    <div><code>v1.angleWith(v2)</code></div>
    <div>{v1.angleWith(v2)}</div>

    <div><code>v1.angleDegWith(v2)</code></div>
    <div>{v1.angleDegWith(v2)}</div>

    <div><code>v1.orientedAngleWith(v2)</code></div>
    <div>{v1.orientedAngleWith(v2)}</div>

    <div><code>v1.orientedAngleDegWith(v2)</code></div>
    <div>{v1.orientedAngleDegWith(v2)}</div>
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: 300px 300px;
    }
</style>
