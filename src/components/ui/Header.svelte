<script lang="ts">
	import { page } from '$app/stores';
	import iconClose from '@assets/icon-close.svg';
	import iconOpen from '@assets/icon-hamburger.svg';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	let navOpen = $state(false);

	function clickNavigation() {
		setTimeout(() => (navOpen = !navOpen), 100);
	}
</script>

<header class="primary-header" class:overlay={navOpen}>
	<div class="container">
		<div class="nav-wrapper">
			<a class="branding" href="/">
				<h1>Kniffel</h1>
			</a>
			<button
				aria-controls="primary-navigation"
				aria-expanded={navOpen ? 'true' : 'false'}
				class="mobile-nav-toggle"
				onclick={clickNavigation}
			>
				<img
					alt=""
					aria-controls="primary-navigation"
					aria-hidden="true"
					class="icon-hamburger"
					src={iconOpen}
				/>
				<img
					alt=""
					aria-controls="primary-navigation"
					aria-hidden="true"
					class="icon-close"
					src={iconClose}
				/>
				<span class="visually-hidden">Menu</span>
			</button>
			<nav id="primary-navigation" class="primary-navigation" class:visible={navOpen}>
				<ul class="nav-list" aria-label="Primary">
					<li>
						<a href="/" class="btn" onclick={clickNavigation}>Neues Spiel</a>
					</li>
					<li>
						<a href="/play" onclick={clickNavigation}>Aktives Spiel</a>
					</li>
					<li>
						<a href="/sessions" onclick={clickNavigation}>Gespielte Spiele</a>
					</li>
					{#if !$page.data.session}
						<li>
							<a href="/login" onclick={clickNavigation}>Anmelden</a>
						</li>
						<li>
							<a href="/signup" onclick={clickNavigation}>Registrieren</a>
						</li>
					{/if}
					{#if $page.data.session}
						<li>
							<a href="/logout" data-sveltekit-reload>Abmelden</a>
						</li>
					{/if}
				</ul>
				<div class="settings">
					<ThemeSwitcher />
				</div>
			</nav>
		</div>
	</div>
</header>

<style lang="scss">
	/* Header */
	.primary-header {
		display: grid;
		align-items: center;
		width: 100%;
		height: 4rem;
		background-color: var(--bg-color);
		z-index: 10;
		border-bottom: 1px solid var(--font-color);

		.branding {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
			color: #a4a99e;
			text-decoration: none;
			text-transform: uppercase;

			h1 {
				margin: 0;
			}
		}

		.primary-navigation {
			display: flex;
			align-items: center;
			gap: 2rem;

			.nav-list {
				list-style: none;
			}
		}
	}

	/* Primary Navigation */

	.nav-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	/*
  a word on mobile first:
  mobile first is used to choose the path of least resistance.
  start with the easy stuff, add complexity for other screen sizes later.
  with a mobile nav you will be adding complexity for mobile devices, though.
  hence we choose to do mobile last for the mobile navigation.
  */
	.mobile-nav-toggle {
		display: none;
	}

	.nav-list {
		display: flex;
		gap: 1rem;
	}

	.nav-list a {
		color: var(--font-color);
		text-decoration: none;
	}

	.nav-list a:hover {
		border-bottom: 1px solid white;
	}

	@media (max-width: 50rem) {
		.primary-header.overlay::before {
			content: '';
			position: fixed;
			inset: 0;
			background-image: linear-gradient(rgb(0 0 0 / 0), rgb(0 0 0 / 1));
			z-index: 100;
		}

		.primary-navigation {
			display: none !important;
			position: absolute;
			inset: 4rem 0 auto;
			padding: 2rem 0.5rem;
			background-color: var(--bg-color);
			z-index: 999;
		}

		.primary-navigation.visible {
			display: block !important;
		}

		.primary-navigation:is(.visible) > body {
			height: 100dvh;
		}

		.nav-list {
			display: grid;
			gap: 1rem;
			padding-right: 1rem;
			text-align: right;
		}

		.nav-list a {
			color: var(--font-color);
			text-decoration: none;
		}

		.nav-list a:hover,
		.nav-list a:focus {
			color: var(--secondary-color);
			text-decoration: none;
		}

		.mobile-nav-toggle {
			display: block;
			right: 1rem;
			z-index: 100;
			cursor: pointer;
			background: transparent;
			border: 0;
			padding: 0.5rem;
		}

		.mobile-nav-toggle .icon-close {
			display: none;
		}

		.settings {
			display: flex;
			justify-content: end;
			margin-top: 2rem;
			padding: 2rem 1rem;
			border-top: 1px solid var(--font-color);
		}
	}
</style>
