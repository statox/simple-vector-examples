<script lang="ts">
    import { resolve } from '$app/paths';

    interface Props {
        title: string;
    }

    const { title }: Props = $props();
</script>

<a aria-label="back" href={resolve('/')}>
    <i class="fas fa-angle-left"></i>
    back
</a>
<h2>
    {title}
</h2>

<style>
    /* Override missing.css margins */
    a {
        margin-block-start: calc(2 * var(--gap));
    }
    h2 {
        margin-block-start: var(--gap);
    }
</style>
