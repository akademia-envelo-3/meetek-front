export interface organizer {
  firstName: string;
  lastName: string;
  id: number;
}

export interface NewSection {
  name: string;
  description: string;
  sectionOwner: organizer;
}
