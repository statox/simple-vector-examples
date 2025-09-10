<script lang="ts">
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v: Vector = $state(new Vector(0, 2.5));

    const resultingArray = $derived.by(() => {
        const a = v.toArray();
        return `[${a[0]}, ${a[1]}]`;
    });
    const resultingObject = $derived.by(() => {
        const o = v.toObject();
        return `{x : ${o.x}, y: ${o.y}}`;
    });
    const resultingPolar = $derived.by(() => {
        const p = v.toPolar();
        return `{r : ${p.r}, theta: ${p.theta}}`;
    });

    const vectors = $derived([
        {
            name: 'v',
            vec: v,
            color: '#00FF00',
            onUpdate: (newVector: Vector) => {
                v = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        }
    ]);
</script>

<PageTitle title="Constructor methods" />

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>

<div class="results">
    <div><code>v.toArray()</code></div>
    <div><code>{resultingArray}</code></div>

    <div><code>v.toObject()</code></div>
    <div><code>{resultingObject}</code></div>

    <div><code>v.toPolar()</code></div>
    <div><code>{resultingPolar}</code></div>
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: 150px 1fr;
    }
</style>
