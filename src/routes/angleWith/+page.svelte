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
        { code: 'v1.angleWith(v2)', result: v1.angleWith(v2).toFixed(3) },
        { code: 'v1.orientedAngleWith(v2)', result: v1.orientedAngleWith(v2).toFixed(3) },
        { code: 'v1.angleDegWith(v2)', result: v1.angleDegWith(v2).toFixed(0) },
        { code: 'v1.orientedAngleDegWith(v2)', result: v1.orientedAngleDegWith(v2).toFixed(0) }
    ]);
</script>

<PageTitle title="AngleWith methods" />

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>
<MethodsResults {results} />
<FixedResultsInfo />
