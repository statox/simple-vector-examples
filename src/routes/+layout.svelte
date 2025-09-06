<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import { Header } from '$lib/components/Header';

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <script src="https://kit.fontawesome.com/cc32401bee.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="container">
    <Header />
    {@render children?.()}
</div>
