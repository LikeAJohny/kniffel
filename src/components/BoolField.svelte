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
		<button on:click={strike}>X</button>
		<button on:click={check}>V</button>
	</div>
	<input
		type="number"
		name="value"
		id="value"
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
		border: 0.5px solid var(--secondary-color);
		color: var(--font-color);

		.choice {
			position: absolute;
			top: -100%;
			left: 0;
			width: 100%;
			height: 100%;
			display: none;
			grid-template-columns: 1fr 1fr;

			&.open {
				display: grid;
			}

			button {
				border: 1px solid var(--font-color);
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
