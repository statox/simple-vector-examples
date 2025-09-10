<script lang="ts">
    import { PageTitle } from '$lib/components/PageTitle';
    import { VectorsDisplay } from '$lib/components/VectorsDisplay';
    import { Vector } from 'simple-vector';

    let v1: Vector = $state(new Vector(2, 0));
    let v2: Vector = $state(new Vector(0, 4));

    const vectors = $derived([
        {
            name: 'v',
            vec: v1,
            color: '#00FF00',
            onUpdate: (newVector: Vector) => {
                v1 = newVector.clone().fixPrecision(1);
            },
            isDraggable: true
        }
    ]);

    let rotateByAngle = $state('Math.PI / 4');
    let rotateByDegAngle = $state(45);
    let rotateToAngle = $state('Math.PI / 3');
    let rotateToDegAngle = $state(45);

    let rotateTowardsAngle = $state('Math.PI / 12');
    let rotateTowardsDegAngle = $state(5);

    const vectors2 = $derived([
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
</script>

<PageTitle title="Rotation methods" />

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

<br />

<VectorsDisplay grid={{ size: 10, graduation: 1 }} vectors={vectors2}></VectorsDisplay>

<div class="results">
    <div>
        <code>
            v1.rotateTowards(v2,
            <input class="inline-input" type="string" bind:value={rotateTowardsAngle} />
            )
        </code>
    </div>
    <div>
        <button onclick={() => (v1 = v1.clone().rotateTowards(v2, eval(rotateTowardsAngle)))}
            >Rotate</button
        >
    </div>

    <div>
        <code>
            v.rotateTowardsDeg(v2
            <input class="inline-input" type="string" bind:value={rotateTowardsDegAngle} />
            )
        </code>
    </div>
    <div>
        <button
            onclick={() => (v1 = v1.clone().rotateTowardsDeg(v2, Number(rotateTowardsDegAngle)))}
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
