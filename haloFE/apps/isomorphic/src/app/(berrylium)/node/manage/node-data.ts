export type NodeRow = {
    tenantId: string;
    level: string; // ObjectId as string
    parent?: string; // Optional ObjectId as string
    isMain: boolean;
    isOwner: boolean;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
    dateOfEstablishment?: string; // ISO string format for date
    users?: string[]; // Optional array of ObjectId strings
  };
  
  export const defaultNodeData: NodeRow[] = [
    {
      tenantId: '',
      level: '',
      parent: '',
      isMain: true,
      isOwner: false,
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      dateOfEstablishment: '',
      users: [],
    },
  ];
  