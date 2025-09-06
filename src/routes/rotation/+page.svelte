<script lang="ts">
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(0, 4));

    const vectors = $derived([
        {
            name: 'v',
            vec: v1,
            color: '#FF0000',
            onUpdate: (newVector: Vector) => {
                v1 = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        }
    ]);

    let rotateByAngle = $state('Math.PI / 3');
    let rotateByDegAngle = $state(45);
    let rotateToAngle = $state('Math.PI / 3');
    let rotateToDegAngle = $state(45);
</script>

<h2>Rotation</h2>

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>

<div class="results">
    <div>
        <code>
            v.rotateBy(
            <input class="inline-input" type="string" bind:value={rotateByAngle} />
            )
        </code>
    </div>
    <div>
        <button onclick={() => (v1 = v1.clone().rotateBy(eval(rotateByAngle)))}>Rotate</button>
    </div>

    <div>
        <code>
            v.rotateByDeg(
            <input class="inline-input" type="string" bind:value={rotateByDegAngle} />
            )
        </code>
    </div>
    <div>
        <button onclick={() => (v1 = v1.clone().rotateByDeg(Number(rotateByDegAngle)))}
            >Rotate</button
        >
    </div>

    <div>
        <code>
            v.rotateTo(
            <input class="inline-input" type="string" bind:value={rotateToAngle} />
            )
        </code>
    </div>
    <div>
        <button onclick={() => (v1 = v1.clone().rotateTo(eval(rotateToAngle)))}>Rotate</button>
    </div>

    <div>
        <code>
            v.rotateToDeg(
            <input class="inline-input" type="string" bind:value={rotateToDegAngle} />
            )
        </code>
    </div>
    <div>
        <button onclick={() => (v1 = v1.clone().rotateToDeg(Number(rotateToDegAngle)))}
            >Rotate</button
        >
    </div>
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: 500px 1fr;

        .inline-input {
            display: inline;
        }
    }
</style>
