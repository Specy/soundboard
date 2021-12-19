<script lang="ts">
	import '../global.scss'
	import GlobalStyle from '$cmp/GlobalStyle.svelte'
	import Footer from '$cmp/Footer.svelte'
	import ErrorLogger from '$cmp/ErrorLogger.svelte'
	import PageTransition from '$cmp/PageTransition.svelte'
	import { page } from '$app/stores'
	import Nav from '$cmp/Nav.svelte';
	import { theme } from '$lib/theme'
	import { browser } from "$app/env";
	theme.subscribe((value) => {
		if(!browser) return
		if(value === 'dark') return document.body.classList.add("body-dark")
		document.body.classList.remove("body-dark")	
	})
</script>

<ErrorLogger>
	<Nav />
		<PageTransition refresh={$page.path}>
			<slot />
		</PageTransition>
	<Footer />
</ErrorLogger>
<GlobalStyle />
