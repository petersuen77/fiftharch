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
};

export type Site = {
    id: number;
    name: string;
    siteType: SiteType;
    state: number;
};

export type SiteType = ["Ahu", "Taheta"];
