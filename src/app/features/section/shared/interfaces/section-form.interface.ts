export interface organizers {
  firstName?: string;
  lastName?: string;
  id?: number;
}

export interface AddNewSection {
  name: string;
  description: string;
  sectionOwner: organizers;
}
