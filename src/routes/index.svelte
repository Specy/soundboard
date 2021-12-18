<script lang="ts">
	import FileImporter from "$cmp/FileImporter.svelte";
</script>

<FileImporter on:import={console.log} text='Import pack'/>

<style lang="scss">
</style>