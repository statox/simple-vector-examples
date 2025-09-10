<script lang="ts">
    import { FixedResultsInfo } from '$lib/components/FixedResultsInfo';
    import { MethodsResults } from '$lib/components/MethodsResults';
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(2.5, 0));
    let v2: Vector = $state(new Vector(0, 4));

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
        { code: 'v1.dot(v2)', result: v1.dot(v2).toFixed(2) },
        { code: 'v2.dot(v1)', result: v2.dot(v1).toFixed(2) },
        { code: 'v1.cross(v2)', result: v1.cross(v2).toFixed(2) },
        { code: 'v2.cross(v1)', result: v2.cross(v1).toFixed(2) }
    ]);
</script>

<PageTitle title="Product methods" />

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>
<MethodsResults {results} />
<FixedResultsInfo />
