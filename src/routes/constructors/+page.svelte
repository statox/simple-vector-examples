<script lang="ts">
    import { MethodsResults } from '$lib/components/MethodsResults';
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

    const results = $derived([
        { code: 'v.toArray()', result: resultingArray, resultIsCode: true },
        { code: 'v.toObject()', result: resultingObject, resultIsCode: true },
        { code: 'v.toPolar()', result: resultingPolar, resultIsCode: true }
    ]);
</script>

<PageTitle title="Constructor methods" />

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>
<MethodsResults {results} />
