<script lang="ts">
	import { goto } from '$app/navigation';
	import board from '@assets/kniffel-extreme-board.json';
	import { destroySession, type SessionStore } from '@stores/session.store';
	import { getContext } from 'svelte';
	import KniffelExtremeGame from './KniffelExtremeGame.svelte';

	const session = getContext<SessionStore>('session');

	function handleSave() {
		fetch('/api/sessions', {
			method: 'POST',
			body: JSON.stringify({ ...$session }),
			headers: {
				'content-type': 'application/json'
			}
		}).then(() => {
			destroySession();
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
		<aside class="sheet-info">
			<div class="player-name">Name: {$session.player?.name}</div>
			{#each board.upper as boardField}
				<div class="field-info">
					<div class="title">{boardField.title}</div>
					<div class="rule">{boardField.rule}</div>
				</div>
			{/each}
			<div class="field-info">
				<div class="title">Gesamt</div>
				<div class="rule">&gt;</div>
			</div>
			<div class="field-info">
				<div class="title">Bonus bei 73 oder mehr</div>
				<div class="rule">Plus 45</div>
			</div>
			<div class="field-info">
				<div class="title">Gesamt oberer Teil</div>
				<div class="rule">&gt;</div>
			</div>
			<hr />
			{#each board.lower as boardField}
				<div class="field-info">
					<div class="title">{boardField.title}</div>
					<div class="rule">{boardField.rule}</div>
				</div>
			{/each}
			<div class="field-info">
				<div class="title">Gesamt unterer Teil</div>
				<div class="rule">&gt;</div>
			</div>
			<div class="field-info">
				<div class="title">Gesamt oberer Teil</div>
				<div class="rule">&gt;</div>
			</div>
			<div class="field-info">
				<div class="title">Endsumme</div>
				<div class="rule">&gt;</div>
			</div>
		</aside>
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
			display: grid;
			grid-template-columns: 11rem auto;

			aside {
				position: sticky;
				left: -7rem;
				background-color: var(--bg-color);
				z-index: 99;

				.player-name {
					padding: 0.5rem 0;
				}

				.field-info {
					display: grid;
					grid-template-columns: 50% 50%;
					align-items: center;
					height: 2.5rem;
					text-align: center;
					font-size: 0.7rem;

					.title,
					.rule {
						display: grid;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 100%;
						padding: 0 0.5rem;
						border: 1px solid var(--secondary-color);
					}
				}
			}

			.games {
				display: flex;
				position: sticky;
				top: 0;
			}
		}
	}
</style>
