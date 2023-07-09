import { SideBarMode, type Settings } from '@/types/settings';
import { writable, type Writable } from 'svelte/store';

export const createSettings = (): Writable<Settings> => {
	return writable({ sideBarMode: SideBarMode.FULL });
};

export const settings = createSettings();
