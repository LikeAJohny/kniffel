<script>
	export let data;

	let { kniffelSessions, kniffelExtremeSessions } = data;
	$: ({ kniffelSessions, kniffelExtremeSessions } = data);
</script>

<section id="sessions">
	<div class="container">
		<h2>Kniffel</h2>
		<div class="sessions">
			{#if kniffelSessions}
				{#each kniffelSessions as kniffelSession}
					<div class="session">
						<header class="session-header">
							{kniffelSession?.name}
							{#if kniffelSession.finished_at}
								- {new Date(kniffelSession.finished_at).toLocaleDateString()}
							{/if}
						</header>
						<details>
							<summary>
								Score: {kniffelSession.score}
							</summary>
							Detailed Scores TBA
						</details>
					</div>
				{/each}
			{/if}
		</div>
		<h2>Kniffel Extreme</h2>
		<div class="sessions">
			{#if kniffelExtremeSessions}
				{#each kniffelExtremeSessions as kniffelExtremeSession}
					<div class="session">
						<header class="session-header">
							{kniffelExtremeSession?.name}
							{#if kniffelExtremeSessions.finished_at}
								- {new Date(kniffelExtremeSession.finished_at).toLocaleDateString()}
							{/if}
						</header>
						<details>
							<summary>
								Score: {kniffelExtremeSession.score}
							</summary>
							Detailed Scores TBA
						</details>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	#sessions {
		display: grid;
		gap: 1rem;

		h2 {
			font-size: 1.5rem;
			margin: 1rem 0;
		}

		.sessions {
			padding: 1rem 0;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;

			.session {
				padding: 1rem;
				display: grid;
				gap: 1rem;
				border: 1px solid var(--primary-color);

				.session-header {
					font-size: 1.25rem;
					border-bottom: 1px solid var(--primary-color);
				}
			}
		}
	}
</style>
