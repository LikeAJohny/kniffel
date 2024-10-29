<script>
	import { run } from 'svelte/legacy';

	let { data } = $props();

	let { kniffelSessions, kniffelExtremeSessions } = $state(data);
	run(() => {
		({ kniffelSessions, kniffelExtremeSessions } = data);
	});

	console.log(kniffelSessions, kniffelExtremeSessions);
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
							- {new Date(kniffelSession.started_at).toLocaleDateString()}
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
							- {kniffelExtremeSession.score}
							- {new Date(kniffelExtremeSession.started_at).toLocaleDateString()}
						</header>
						<details>
							<summary>Details</summary>
							<div class="details">
								Played <br />
								{new Date(kniffelExtremeSession.started_at).toLocaleDateString()}
								{new Date(kniffelExtremeSession.started_at).toLocaleTimeString()}
								-
								{new Date(kniffelExtremeSession.finished_at).toLocaleDateString()}
								{new Date(kniffelExtremeSession.finished_at).toLocaleTimeString()}
							</div>
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

				details {
					summary {
						cursor: pointer;
					}
					.details {
						padding: 0.5rem 0.75rem;
					}
				}
			}
		}
	}
</style>
