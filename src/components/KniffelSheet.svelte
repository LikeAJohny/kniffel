<script lang="ts">
	import { goto } from '$app/navigation';
	import board from '@assets/kniffel-board.json';
	import { session } from '@stores/session.store';
	import KniffelGame from './KniffelGame.svelte';

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
	<!-- Game Header -->
	<header>
		<div class="player-name">Name: {$session.player?.name}</div>
		<div class="game-numbers">
			{#each $session?.games as game}
				<div class="game-number">{game.number + 1}. Spiel</div>
			{/each}
		</div>
	</header>
	<!-- Game -->
	<section class="sheet">
		<aside class="sheet-info">
			{#each board.upper as boardField}
				<div class="field-info">
					{#if boardField.image}
						<div class="image">
							<i class="fa-solid fa-{boardField.image}" />
							<i class="fa-solid fa-{boardField.image}" />
							<i class="fa-solid fa-{boardField.image}" />
						</div>
					{:else}
						<div class="title">
							{boardField.title}
						</div>
					{/if}
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
					{#if boardField.image}
						<div class="image">
							<i class="fa-solid fa-{boardField.image}" />
							<i class="fa-solid fa-{boardField.image}" />
							<i class="fa-solid fa-{boardField.image}" />
						</div>
					{:else}
						<div class="title">
							{boardField.title}
						</div>
					{/if}
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
				<KniffelGame number={game.number} on:gameUpdate={(e) => session?.updateGame(e.detail)} />
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

		header {
			display: grid;
			grid-template-columns: 11rem auto;
			height: 2rem;

			> * {
				display: grid;
				align-items: end;
				padding: 0.25rem 0;
			}

			.player-name {
				text-decoration: underline;
			}

			.game-numbers {
				display: flex;
				gap: 1px;

				.game-number {
					width: 4rem;
					text-align: center;
					font-size: 0.9rem;
				}
			}
		}

		section.sheet {
			display: grid;
			grid-template-columns: 11rem auto;

			aside {
				.field-info {
					display: grid;
					grid-template-columns: 50% 50%;
					align-items: center;
					height: 2.5rem;
					text-align: center;
					font-size: 0.7rem;

					.title,
					.rule,
					.image {
						display: grid;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 100%;
						padding: 0 0.5rem;
						border: 1px solid var(--secondary-color);
					}

					.image {
						display: flex;
						gap: 0.25rem;
						font-size: 1.25rem;
					}
				}
			}
			.games {
				display: flex;
			}
		}
	}
</style>
