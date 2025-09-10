<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';
    import './override-simple-vector.ts';

    let v1: Vector = $state(new Vector(0, 1.5));
    let topLeft: Vector = $state(new Vector(-1, 1));
    let bottomRight: Vector = $state(new Vector(1, -1));
    let wraped: Vector = $derived(v1.clone().wrap(topLeft, bottomRight));

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
            name: 'topLeft',
            vec: topLeft,
            color: '#6e6ef4',
            onUpdate: (newVector: Vector) => {
                topLeft = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        },
        {
            name: 'bottomRight',
            vec: bottomRight,
            color: '#f46ef4',
            onUpdate: (newVector: Vector) => {
                bottomRight = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        },
        {
            name: 'v1.wrap(topLeft, bottomRight)',
            vec: wraped,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);
</script>

<h2>Wrap</h2>

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>
