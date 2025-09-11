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

<p>
    The rotation methods take as a parameter a number representing an angle. To let you test the
    methods taking an angle in radians, this page lets you input parameters as strings which are
    evaluated with <a
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval"
        ><code>eval()</code></a
    >.
</p>
<p>
    This way you can use a number or a valid javascript expression like <code>Math.PI/3</code> as you
    would in your code.
</p>
<p>
    Then you can drag the vector to its initial position then click <button disabled>rotate</button>
    to see how the methods modify the vector.
</p>

<VectorsDisplay grid={{ size: 10, graduation: 1 }} {vectors}></VectorsDisplay>

<div class="results">
    <div class="result-code">
        <code>
            v.rotateBy(
            <input class="inline-input" type="string" bind:value={rotateByAngle} />
            )
        </code>
    </div>
    <div class="result-value">
        <button onclick={() => (v1 = v1.clone().rotateBy(eval(rotateByAngle)))}>Rotate</button>
    </div>

    <div class="result-code">
        <code>
            v.rotateByDeg(
            <input class="inline-input" type="string" bind:value={rotateByDegAngle} />
            )
        </code>
    </div>
    <div class="result-value">
        <button onclick={() => (v1 = v1.clone().rotateByDeg(Number(rotateByDegAngle)))}
            >Rotate</button
        >
    </div>

    <div class="result-code">
        <code>
            v.rotateTo(
            <input class="inline-input" type="string" bind:value={rotateToAngle} />
            )
        </code>
    </div>
    <div class="result-value">
        <button onclick={() => (v1 = v1.clone().rotateTo(eval(rotateToAngle)))}>Rotate</button>
    </div>

    <div class="result-code">
        <code>
            v.rotateToDeg(
            <input class="inline-input" type="string" bind:value={rotateToDegAngle} />
            )
        </code>
    </div>
    <div class="result-value">
        <button onclick={() => (v1 = v1.clone().rotateToDeg(Number(rotateToDegAngle)))}
            >Rotate</button
        >
    </div>
</div>

<br />

<VectorsDisplay grid={{ size: 10, graduation: 1 }} vectors={vectors2}></VectorsDisplay>

<div class="results">
    <div class="result-code">
        <code>
            v1.rotateTowards(v2,
            <input class="inline-input" type="string" bind:value={rotateTowardsAngle} />
            )
        </code>
    </div>
    <div class="result-value">
        <button onclick={() => (v1 = v1.clone().rotateTowards(v2, eval(rotateTowardsAngle)))}
            >Rotate</button
        >
    </div>

    <div class="result-code">
        <code>
            v.rotateTowardsDeg(v2,
            <input class="inline-input" type="string" bind:value={rotateTowardsDegAngle} />
            )
        </code>
    </div>
    <div class="result-value">
        <button
            onclick={() => (v1 = v1.clone().rotateTowardsDeg(v2, Number(rotateTowardsDegAngle)))}
            >Rotate</button
        >
    </div>
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: max-content 1fr;
        column-gap: 1rem;

        margin-top: var(--gap);

        .result-code {
            color: var(--info-fg);
        }

        @media (width<500px) {
            grid-template-columns: 1fr;

            .result-value {
                padding-left: 1rem;
            }
        }
    }
</style>
