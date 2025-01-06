export interface RepairRequest {
    id: string;
    ownerId: string; // Reference to the User who created it
    mechanicId?: string; // Reference to the mechanic who claimed it
    description: string;
    status: "open" | "claimed" | "inProgress" | "completed";
    createdAt: Date;
  }
  