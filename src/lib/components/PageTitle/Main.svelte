<script lang="ts">
    import { resolve } from '$app/paths';

    interface Props {
        title: string;
    }

    const { title }: Props = $props();
</script>

<h2>
    <a aria-label="back" href={resolve('/')}><i class="fas fa-arrow-left"></i></a>
    {title}
</h2>

<style>
    h2 {
        a {
            font-size: small;
        }
    }
</style>
