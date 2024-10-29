<script lang="ts">
	import { SideBarMode } from '@/types/settings';
	import board from '@assets/kniffel-extreme-board.json';
	import { session } from '@stores/session.store';
	import { settings } from '@stores/settings.store';

	const sideBarWidth = $settings.sideBarMode === SideBarMode.FULL ? '11rem' : '3rem';
	const sideBarCols = $settings.sideBarMode === SideBarMode.FULL ? 2 : 1;
</script>

<aside class="sheet-info" style="--side-bar-width: {sideBarWidth}; --side-bar-cols: {sideBarCols}">
	{#if $settings.sideBarMode === SideBarMode.COLLAPSED}
		<div class="player-name">{$session.player?.name}</div>
	{:else}
		<div class="player-name">Name: {$session.player?.name}</div>
	{/if}
	{#each board.upper as boardField}
		<div class="field-info">
			{#if $settings.sideBarMode === SideBarMode.FULL}
				{#if boardField.image}
					<div class="image">
						<i class={boardField.image}></i>
						<i class={boardField.image}></i>
						<i class={boardField.image}></i>
					</div>
				{:else}
					<div class="title">
						{boardField.title}
					</div>
				{/if}
				<div class="rule">{boardField.rule}</div>
			{/if}
			{#if $settings.sideBarMode === SideBarMode.COLLAPSED}
				{#if boardField.image}
					<div class="image">
						<i class={boardField.image}></i>
					</div>
				{:else}
					<div class="title">
						{boardField.title}
					</div>
				{/if}
			{/if}
		</div>
	{/each}
	<div class="field-info">
		{#if $settings.sideBarMode === SideBarMode.FULL}
			<div class="title">Gesamt</div>
			<div class="rule"><i class="fa-solid fa-greater-than"></i></div>
		{:else}
			<div class="title">
				<i class="fa-regular fa-equals"></i>
			</div>
		{/if}
	</div>
	<div class="field-info">
		{#if $settings.sideBarMode === SideBarMode.FULL}
			<div class="title">Bonus bei 73 oder mehr</div>
			<div class="rule">Plus 45</div>
		{:else}
			<div class="title">
				<i class="fa-solid fa-plus"></i>
			</div>
		{/if}
	</div>
	<div class="field-info">
		{#if $settings.sideBarMode === SideBarMode.FULL}
			<div class="title">Gesamt oberer Teil</div>
			<div class="rule"><i class="fa-solid fa-greater-than"></i></div>
		{:else}
			<div class="title">
				<i class="fa-solid fa-equals"></i>
			</div>
		{/if}
	</div>
	<hr />
	{#each board.lower as boardField}
		<div class="field-info">
			{#if $settings.sideBarMode === SideBarMode.FULL}
				<div class="title">
					{boardField.title}
				</div>
				<div class="rule">{boardField.rule}</div>
			{/if}
			{#if $settings.sideBarMode === SideBarMode.COLLAPSED}
				{#if boardField.image}
					<div class="image">
						<i class={boardField.image}></i>
					</div>
				{:else}
					<div class="title">
						{boardField.title}
					</div>
				{/if}
			{/if}
		</div>
	{/each}
	<div class="field-info">
		{#if $settings.sideBarMode === SideBarMode.FULL}
			<div class="title">Gesamt unterer Teil</div>
			<div class="rule">
				<i class="fa-solid fa-greater-than"></i>
			</div>
		{:else}
			<div class="title">
				<i class="fa-regular fa-equals"></i>
			</div>
		{/if}
	</div>
	<div class="field-info">
		{#if $settings.sideBarMode === SideBarMode.FULL}
			<div class="title">Gesamt oberer Teil</div>
			<div class="rule"><i class="fa-solid fa-greater-than"></i></div>
		{:else}
			<div class="title">
				<i class="fa-regular fa-equals"></i>
			</div>
		{/if}
	</div>
	<div class="field-info">
		{#if $settings.sideBarMode === SideBarMode.FULL}
			<div class="title">Endsumme</div>
			<div class="rule"><i class="fa-solid fa-greater-than"></i></div>
		{:else}
			<div class="title">
				<i class="fa-solid fa-flag-checkered"></i>
			</div>
		{/if}
	</div>
</aside>

<style lang="scss">
	aside {
		position: sticky;
		left: -7rem;
		width: var(--side-bar-width);
		background-color: var(--bg-color);
		z-index: 99;

		.player-name {
			padding: 0.5rem 0;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		.field-info {
			display: grid;
			grid-template-columns: repeat(var(--side-bar-cols), 1fr);
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
</style>
