<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(0, 100));
    let v2: Vector = $state(new Vector(100, 0));
    let mix: Vector = $derived(v1.clone().mix(v2, 0.5));
    let mixX: Vector = $derived(v1.clone().mixX(v2, 0.5));
    let mixY: Vector = $derived(v1.clone().mixY(v2, 0.5));
    let projectOnto: Vector = $derived(v1.clone().projectOnto(v2));

    const baseVectors = $derived([
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
        }
    ]);

    const vectorsMix = $derived([
        ...baseVectors,
        {
            name: 'v1.mix(v2, 0.5)',
            vec: mix,
            color: '#6e6ef4',
            isDraggable: false
        }
    ]);

    const vectorsMixX = $derived([
        ...baseVectors,
        {
            name: 'v1.mixX(v2, 0.5)',
            vec: mixX,
            color: '#f46ef4',
            isDraggable: false
        }
    ]);

    const vectorsMixY = $derived([
        ...baseVectors,
        {
            name: 'v1.mixY(v2, 0.5)',
            vec: mixY,
            color: '#b16ef4',
            isDraggable: false
        }
    ]);

    const vectorsProjectOnto = $derived([
        ...baseVectors,
        {
            name: 'v1.projectOnto(v2)',
            vec: projectOnto,
            color: '#6eb1f4',
            isDraggable: false
        }
    ]);
</script>

<h2>Interpolation</h2>

<div class="container">
    <div>
        <h3><code>v1.mix(v2, 0.5)</code></h3>
        <VectorsDisplay vectors={vectorsMix}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.mixX(v2, 0.5)</code></h3>
        <VectorsDisplay vectors={vectorsMixX}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.mixY(v2, 0.5)</code></h3>
        <VectorsDisplay vectors={vectorsMixY}></VectorsDisplay>
    </div>
    <div>
        <h3><code>v1.projectOnto(v2)</code></h3>
        <VectorsDisplay vectors={vectorsProjectOnto}></VectorsDisplay>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
