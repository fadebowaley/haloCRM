// structure-data.ts

export type StructureRow = {
    tenantId: string;
    name: string;
    level: number;
    parent: string;
    path: string;
    description: string;
    createdBy: string;
  };
  
  // Optional default data — currently empty
  export const defaultData: StructureRow[] = [];
  