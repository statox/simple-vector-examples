<script lang="ts">
    import { P5_1vector } from '$lib/components/P5_1Vector';
    import { Vector } from 'simple-vector';

    let v: Vector = $state(new Vector(0, 100));

    const onVectorUpdate = (newVector: Vector) => {
        v = newVector.clone();
    };
</script>

<h2>Angle</h2>

<P5_1vector {v} {onVectorUpdate}></P5_1vector>

<div class="container">
    <div><code>v</code></div>
    <div>{v.toString()}</div>

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
    .container {
        display: grid;
        grid-template-columns: 200px 200px;
    }
</style>
