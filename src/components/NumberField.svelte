<script lang="ts">
	export let value: number | null;
</script>

<div class="field">
	<input type="number" name="value" id="value" bind:value />
</div>

<style lang="scss">
	.field {
		display: grid;
		justify-content: center;
		align-items: center;
		width: 4em;
		height: 2.5rem;
		border-bottom: 0.5px solid var(--secondary-color);
		color: var(--font-color);

		&:last-of-type {
			border-bottom: none;
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
