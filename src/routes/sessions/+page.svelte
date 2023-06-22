<script>
	export let data;

	let { kniffelSessions, kniffelExtremeSessions } = data;
	$: ({ kniffelSessions, kniffelExtremeSessions } = data);
</script>

<section id="session">
	<div class="container">
		<h2>Kniffel</h2>
		{#if kniffelSessions}
			<ul>
				{#each kniffelSessions as kniffelSession}
					<li>
						{kniffelSession.player.name}: {kniffelSession.score}
					</li>
				{/each}
			</ul>
		{/if}

		<h2>Kniffel Extreme</h2>
		{#if kniffelExtremeSessions}
			<ul>
				{#each kniffelExtremeSessions as kniffelExtremeSession}
					<li>
						{kniffelExtremeSession.player.name}: {kniffelExtremeSession.score}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<style>
</style>
