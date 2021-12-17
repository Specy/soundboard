import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import {resolve} from 'path'
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		target: '#svelte',
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$cmp: resolve('./src/components/'),
					$lib: resolve('./src/lib/')
				}
			}
		}
	}
};

export default config;
