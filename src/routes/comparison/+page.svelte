<script lang="ts">
    import { MethodsResults } from '$lib/components/MethodsResults';
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(2.5, 0));
    let v2: Vector = $state(new Vector(0, 5));

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

    const results = $derived([
        { code: 'v1.isEqualTo(v2)', result: v1.isEqualTo(v2), highlight: v1.isEqualTo(v2) },
        {
            code: 'v1.isCloseTo(v2, 0.2)',
            result: v1.isCloseTo(v2, 0.2),
            highlight: v1.isCloseTo(v2, 0.2)
        },
        {
            code: 'v1.isParallelTo(v2)',
            result: v1.isParallelTo(v2),
            highlight: v1.isParallelTo(v2)
        },
        {
            code: 'v1.isPerpendicularTo(v2)',
            result: v1.isPerpendicularTo(v2),
            highlight: v1.isPerpendicularTo(v2)
        },
        { code: 'v1.isZero()', result: v1.isZero(), highlight: v1.isZero() },
        { code: 'v2.isZero()', result: v2.isZero(), highlight: v2.isZero() }
    ]);
</script>

<PageTitle title="Comparison methods" />

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>
<MethodsResults {results} />
