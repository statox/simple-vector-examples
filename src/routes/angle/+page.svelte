<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v: Vector = $state(new Vector(0, 2.5));

    const vectors = $derived([
        {
            name: 'v',
            vec: v,
            color: '#FF0000',
            onUpdate: (newVector: Vector) => {
                v = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        }
    ]);
</script>

<h2>Angle</h2>

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>

<div class="results">
    <div><code>v.horizontalAngle()</code></div>
    <div>{v.horizontalAngle()}</div>

    <div><code>v.horizontalAngleDeg()</code></div>
    <div>{v.horizontalAngleDeg()}</div>

    <div><code>v.verticalAngle()</code></div>
    <div>{v.verticalAngle()}</div>

    <div><code>v.verticalAngleDeg()</code></div>
    <div>{v.verticalAngleDeg()}</div>

    <div><code>v1.slope()</code></div>
    <div>{v.slope()}</div>
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: 300px 300px;
    }
</style>
