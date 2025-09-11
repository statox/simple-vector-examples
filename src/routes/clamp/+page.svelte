<script lang="ts">
    import { PageTitle } from '$lib/components/PageTitle';
    import ClampMag from './clampMag.svelte';
    import ClampAxes from './clampAxes.svelte';
</script>

<PageTitle title="Clamp methods" />

<p>The clamp methods all take one or two parameters.</p>
<p>The first parameter is always the maximum bound of the value to clamp.</p>
<p>
    If a second parameter is provided then it is used as the minimum bound of the value to clamp. If
    it is not provided, the value is only clamped with the maxium bound.
</p>
<p>
    On this page uncheck the "Enable min bound" checkbox to stop passing a second parameter to the
    methods.
</p>

<ClampMag />
<ClampAxes />
