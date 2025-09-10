<script lang="ts">
    import { FixedResultsInfo } from '$lib/components/FixedResultsInfo';
    import { MethodsResults } from '$lib/components/MethodsResults';
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(0, 5));
    let v2: Vector = $state(new Vector(2.5, 0));

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
        { code: 'v1.absDistanceX(v2)', result: v1.absDistanceX(v2).toFixed(2) },
        { code: 'v1.distanceX(v2)', result: v1.distanceX(v2).toFixed(2) },

        { code: 'v1.absDistanceY(v2)', result: v1.absDistanceY(v2).toFixed(2) },
        { code: 'v1.distanceY(v2)', result: v1.distanceY(v2).toFixed(2) },

        { code: 'v1.distance(v2)', result: v1.distance(v2).toFixed(2) },
        { code: 'v1.distanceSq(v2)', result: v1.distanceSq(v2).toFixed(2) },

        { code: 'v1.distanceManhattan(v2)', result: v1.distanceManhattan(v2).toFixed(1) },
        { code: 'v1.distanceChebyshev(v2)', result: v1.distanceChebyshev(v2).toFixed(1) }
    ]);
</script>

<PageTitle title="Distance methods" />

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>
<MethodsResults {results} />
<FixedResultsInfo />
