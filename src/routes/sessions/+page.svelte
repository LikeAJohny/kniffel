<script>
	export let data;

	let { sessions } = data;
	$: ({ sessions } = data);
</script>

<section id="session">
	<div class="container">
		{#if sessions}
			<ul>
				{#each sessions as session}
					<li>
						{session.player.name}: {session.score}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<style>
</style>
