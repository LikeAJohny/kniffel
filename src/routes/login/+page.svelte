<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

{#if form?.message}
	<div class="form-messages" class:error={!form.success}>
		{form.message}
	</div>
{/if}
<form method="post" use:enhance>
	<label for="email">
		<input type="email" name="email" id="email" placeholder="Email" />
	</label>
	<label for="password">
		<input type="password" name="password" id="password" placeholder="Password" />
	</label>
	<button>Login</button>
</form>

<style lang="scss">
	.form-messages {
		display: grid;
		justify-content: center;
		margin: 1rem;
		padding: 1rem;
		font-size: 1.5rem;
		border: 1px solid green;

		&.error {
			border: 1px solid red;
		}
	}
</style>
