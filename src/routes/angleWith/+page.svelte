<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(0, 100));
    let v2: Vector = $state(new Vector(50, 0));
    const v1Color = '#FF0000';
    const v2Color = '#00FF00';

    const vectors = $derived([
        {
            name: 'v1',
            vec: v1,
            color: v1Color,
            onUpdate: (newVector: Vector) => {
                v1 = newVector.clone();
            },
            isDraggable: true
        },
        {
            name: 'v2',
            vec: v2,
            color: v2Color,
            onUpdate: (newVector: Vector) => {
                v2 = newVector.clone();
            },
            isDraggable: true
        }
    ]);
</script>

<h2>AngleWith</h2>

<VectorsDisplay {vectors}></VectorsDisplay>

<div class="container">
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
    .container {
        display: grid;
        grid-template-columns: 200px 200px;
    }
</style>
