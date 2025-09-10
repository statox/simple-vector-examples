<script lang="ts">
    interface Props {
        results: {
            code: string;
            result: number | boolean | string;
            highlight?: boolean;
            resultIsCode?: boolean;
        }[];
    }

    const { results }: Props = $props();
</script>

<div class="results">
    {#each results as { code, result, highlight, resultIsCode } (code)}
        <div class="result-code"><code>{code}</code></div>
        <div class="result-value" class:highlight>
            {#if resultIsCode}
                <code>{result}</code>
            {:else}
                <span>{result}</span>
            {/if}
        </div>
    {/each}
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: max-content 1fr;
        column-gap: 1rem;

        margin-top: var(--gap);

        .highlight {
            color: #00ff00;
        }

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
