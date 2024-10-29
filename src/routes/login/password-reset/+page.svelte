<script lang="ts">
    import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<form method="post" use:enhance>
	<label for="email">
		<input id="email" name="email" placeholder="Email" type="email" />
	</label>
	<button>Reset</button>
</form>

{#if form && form.success}
    <div>Mail sent</div>
{/if}

{#if form && !form.success}
    <div>Something went wrong</div>
{/if}
