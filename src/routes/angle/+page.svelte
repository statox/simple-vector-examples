<script lang="ts">
    import { FixedResultsInfo } from '$lib/components/FixedResultsInfo';
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
        { code: 'v.horizontalAngle()', result: v.horizontalAngle().toFixed(3) },
        { code: 'v.verticalAngle()', result: v.verticalAngle().toFixed(3) },
        { code: 'v.horizontalAngleDeg()', result: v.horizontalAngleDeg().toFixed(0) },
        { code: 'v.verticalAngleDeg()', result: v.verticalAngleDeg().toFixed(0) },
        { code: 'v.slope()', result: v.slope().toFixed(3) }
    ]);
</script>

<PageTitle title="Angle methods" />

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>
<MethodsResults {results} />
<FixedResultsInfo />
