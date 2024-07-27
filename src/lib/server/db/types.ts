export type Project = {
    projectId: number;
    projectName: string;
    ownerEmail: string;
};

// SIMHENUA TYPES
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
    state: number;
};

const siteTypesArray = ["Ahu", "Hare paenga", "Moai", "Pukao", "Umu", "Ana kionga", "Mataa", "Taupea", "Manavai", "Taheta", "Tupa"] as const;
export type SiteType = typeof siteTypesArray[number];