export interface Organizer {
  firstName: string;
  lastName: string;
  id: number;
}

export interface CreateSection {
  name: string;
  description: string;
  sectionOwner: Organizer;
}
