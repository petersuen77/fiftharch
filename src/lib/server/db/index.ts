import type { Project, Park, SimHENUA } from './types';

const siteTypesArray = ["Ahu", "Hare paenga", "Moai", "Pukao", "Umu", "Ana kionga", "Mataa", "Taupea", "Manavai", "Taheta", "Tupa"] as const;

const KEY_PAGE_VISITS = 'pageVisits';
const KEY_PROJECTS_BY_USER_EMAIL = 'projects:by-user-email:#';

export function getPageVisitsKey(): string { return KEY_PAGE_VISITS; }

export function getProjectsByUserEmailKey(email:string): string { return KEY_PROJECTS_BY_USER_EMAIL.replace('#', email); }