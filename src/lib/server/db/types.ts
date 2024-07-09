export type Project = {
    projectId: number;
    projectName: string;
    ownerEmail: string;
};

// SIMHENUA TYPES
export type Park = {
    id: number;
    name: string;
};

export type SimHENUA = {
    parks: Park[];
};
