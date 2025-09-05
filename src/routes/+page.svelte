<script lang="ts">
    import { P5_1vector } from '$lib/components/P5_1Vector';
    import { Vector } from 'simple-vector';

    let v: Vector = $state(new Vector(0, 100));

    const onVectorUpdate = (newVector: Vector) => {
        v = newVector.clone();
    };
</script>

<h1>simple-vector.ts examples</h1>

<P5_1vector {v} {onVectorUpdate}></P5_1vector>

<p>{v.toString()}</p>
