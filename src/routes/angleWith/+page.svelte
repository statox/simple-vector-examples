<script lang="ts">
    import { P5_2vectors } from '$lib/components/P5_2Vectors';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(0, 100));
    let v2: Vector = $state(new Vector(50, 0));
    const v1Color = '#FF0000';
    const v2Color = '#00FF00';

    const onVector1Update = (newVector: Vector) => {
        v1 = newVector.clone();
    };
    const onVector2Update = (newVector: Vector) => {
        v2 = newVector.clone();
    };
</script>

<h2>AngleWith</h2>

<P5_2vectors {v1} {v2} {v1Color} {v2Color} {onVector1Update} {onVector2Update}></P5_2vectors>

<div class="container">
    <div style="color: {v1Color}"><code>v1</code></div>
    <div style="color: {v1Color}">{v1.toString()}</div>

    <div style="color: {v2Color}"><code>v2</code></div>
    <div style="color: {v2Color}">{v2.toString()}</div>

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
