<script>
    import { resolve } from '$app/paths';
    import { ThemeSwitcher } from '$lib/components/ThemeSwitcher';
</script>

<header>
    <h1>
        <a href={resolve('/')}>SimpleVector - Interactive examples</a>
    </h1>
    <nav>
        <span><ThemeSwitcher /></span>
    </nav>
</header>

<style>
    h1 {
        a {
            text-decoration: none;
        }
    }
</style>
