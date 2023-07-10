<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '@stores/session.store';
	import KniffelExtremeGame from './KniffelExtremeGame.svelte';
	import Sidebar from './Sidebar.svelte';

	function handleSave() {
		fetch('/api/sessions', {
			method: 'POST',
			body: JSON.stringify({ ...$session }),
			headers: {
				'content-type': 'application/json'
			}
		}).then(() => {
			session.destroy();
			goto('/');
		});
	}
</script>

{#if $session.status === 'finished'}
	<button on:click={handleSave}>Save Session</button>
{/if}

<div id="sheet">
	<!-- Game -->
	<section class="sheet">
		<Sidebar />
		<div class="games">
			{#each $session?.games as game}
				<KniffelExtremeGame
					number={game.number}
					on:gameUpdate={(e) => session?.updateGame(e.detail)}
				/>
			{/each}
		</div>
	</section>
</div>

<style lang="scss">
	#sheet {
		display: grid;
		justify-content: start;
		overflow-x: scroll;
		padding: 1rem;

		section.sheet {
			display: flex;

			.games {
				display: flex;
				position: sticky;
				top: 0;
			}
		}
	}
</style>
