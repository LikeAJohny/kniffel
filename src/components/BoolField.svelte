<script lang="ts">
	export let score: number = 0;
	export let value: number | null = null;
	let choiceOpen: boolean = false;

	function strike() {
		value = 0;
		choiceOpen = false;
	}

	function check() {
		value = score;
		choiceOpen = false;
	}
</script>

<div class="field">
	<div class="choice" class:open={choiceOpen}>
		<button class="strike" on:click={strike}>✖︎</button>
		<button class="check" on:click={check}>✔︎</button>
	</div>
	<input
		type="number"
		name="value"
		id="value"
		inputmode="none"
		bind:value
		on:focusin={() => (choiceOpen = true)}
		on:focusout={() => setTimeout(() => (choiceOpen = false), 10)}
	/>
</div>

<style lang="scss">
	.field {
		display: grid;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 4em;
		height: 2.5rem;
		border: 1px solid var(--secondary-color);
		color: var(--font-color);

		.choice {
			position: absolute;
			top: 0;
			left: 0;
			width: calc(4rem - 2px);
			height: calc(2.5rem - 2px);
			display: none;
			grid-template-columns: 1fr 1fr;
			gap: 2px;
			background-color: var(--secondary-color);
			border-radius: 3px;
			z-index: 99;

			&.open {
				display: grid;
			}

			button {
				border-radius: 3px;
				border: none;

				&.strike {
					background-color: var(--bg-color);
					color: var(--font-color);
				}

				&.check {
					background-color: var(--primary-color);
					color: white;
				}
			}
		}

		input {
			width: 100%;
			height: 100%;
			font-size: 1.1rem;
			font-weight: 700;
			text-align: center;
			border: none;
			background: none;
			color: var(--font-color);
		}
	}
</style>
