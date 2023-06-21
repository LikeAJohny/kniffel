<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let darkMode: Writable<boolean> = writable(true);

	onMount(() => {
		const storedDarkSetting = localStorage.getItem('dark-mode');

		if (storedDarkSetting) {
			darkMode.set(storedDarkSetting === 'true');
		}

		darkMode.subscribe((dark) => {
			document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
			localStorage.setItem('dark-mode', dark ? 'true' : 'false');
		});
	});
</script>

<div class="theme-switch-wrapper">
	<em>Dark Mode</em>
	<label class="theme-switch" for="checkbox">
		<input type="checkbox" id="checkbox" bind:checked={$darkMode} />
		<div class="slider round" />
	</label>
</div>

<style lang="scss">
	.theme-switch-wrapper {
		display: flex;
		align-items: center;

		em {
			margin-right: 10px;
			font-size: 1rem;
		}
	}

	.theme-switch {
		display: inline-block;
		height: 34px;
		position: relative;
		width: 60px;
	}

	.theme-switch input {
		display: none;
	}

	.slider {
		background-color: #ccc;
		bottom: 0;
		cursor: pointer;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		transition: 0.4s;
	}

	.slider:before {
		background-color: #fff;
		bottom: 4px;
		content: '';
		height: 26px;
		left: 4px;
		position: absolute;
		transition: 0.4s;
		width: 26px;
	}

	input:checked + .slider {
		background-color: #66bb6a;
	}

	input:checked + .slider:before {
		transform: translateX(26px);
	}

	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
