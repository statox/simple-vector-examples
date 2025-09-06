<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(0, 100));
    let v2: Vector = $state(new Vector(100, 0));
    let v3: Vector = $derived(v1.clone().mix(v2, 0.5));

    const vectors = $derived([
        {
            name: 'v1',
            vec: v1,
            color: '#FF0000',
            onUpdate: (newVector: Vector) => {
                v1 = newVector.clone();
            },
            isDraggable: true
        },
        {
            name: 'v2',
            vec: v2,
            color: '#00FF00',
            onUpdate: (newVector: Vector) => {
                v2 = newVector.clone();
            },
            isDraggable: true
        },
        {
            name: 'v3',
            vec: v3,
            color: '#0000FF',
            onUpdate: (newVector: Vector) => {
                v3 = newVector.clone();
            },
            isDraggable: false
        }
    ]);
</script>

<h2>Interpolation</h2>

<VectorsDisplay {vectors}></VectorsDisplay>
