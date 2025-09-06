<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v: Vector = $state(new Vector(0, 100));

    const vectors = $derived([
        {
            name: 'v',
            vec: v,
            color: '#000000',
            onUpdate: (newVector: Vector) => {
                v = newVector.clone();
            },
            isDraggable: true
        }
    ]);
</script>

<h2>Angle</h2>

<VectorsDisplay {vectors}></VectorsDisplay>

<div class="results">
    <div><code>v.horizontalAngle()</code></div>
    <div>{v.horizontalAngle()}</div>

    <div><code>v.horizontalAngleDeg()</code></div>
    <div>{v.horizontalAngleDeg()}</div>

    <div><code>v.verticalAngle()</code></div>
    <div>{v.verticalAngle()}</div>

    <div><code>v.verticalAngleDeg()</code></div>
    <div>{v.verticalAngleDeg()}</div>
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: 300px 300px;
    }
</style>
