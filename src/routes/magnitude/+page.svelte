<script lang="ts">
    import { MethodsResults } from '$lib/components/MethodsResults';
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v: Vector = $state(new Vector(0, 2.5));

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
        { code: 'v.mag()', result: v.mag() },
        { code: 'v.magSq()', result: v.magSq() }
    ]);
</script>

<PageTitle title="Magnitude methods" />

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>
<MethodsResults {results} />
