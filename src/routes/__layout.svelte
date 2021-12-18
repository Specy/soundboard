<script lang="ts">
	import '../global.scss'
	import GlobalStyle from '$cmp/GlobalStyle.svelte'
	import Footer from '$cmp/Footer.svelte'
	import ErrorLogger from '$cmp/ErrorLogger.svelte'
	import PageTransition from '$cmp/PageTransition.svelte'
	import { page } from '$app/stores'
	import Nav from '$cmp/Nav.svelte';
</script>

<ErrorLogger>
	<Nav />
		<PageTransition refresh={$page.path}>
			<slot />
		</PageTransition>
	<Footer />
</ErrorLogger>
<GlobalStyle />
