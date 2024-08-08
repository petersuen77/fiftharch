export type Project = {
    projectId: number;
    projectName: string;
    ownerEmail: string;
};

// SIMHENUA TYPES

export const KEY_SIM_HENUA = 'SimHENUA';

export type SimHENUA = {
    parks: Park[];
};

export type Park = {
    id: number;
    name: string;
    sites: Site[];
};

export type Site = {
    zone: string;
    id: number;
    siteType: SiteType;
    state: SiteState;
};

export const siteTypesArray = ["Ahu", "Hare paenga", "Moai", "Pukao", "Umu", "Ana kionga", "Mataa", "Taupea", "Manavai", "Taheta", "Tupa"] as const;
export type SiteType = typeof siteTypesArray[number];

export const siteStatesArray = ["Good", "Normal", "Poor"] as const;
export type SiteState = typeof siteStatesArray[number];