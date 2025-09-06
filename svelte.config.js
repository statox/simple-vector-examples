import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const REPO_NAME = '/simple-vector-examples';
const prod = process.env.ENV === 'prod';
const base = prod ? REPO_NAME : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: [vitePreprocess(), mdsvex()],
    kit: {
        adapter: adapter({
            pages: 'docs',
            assets: 'docs',
            precompress: false,
            fallback: '404.html',
            domain: '',
            jekyll: false
        }),
        paths: {
            base
        }
    },
    extensions: ['.svelte', '.svx']
};

export default config;
