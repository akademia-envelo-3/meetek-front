export interface SectionAccessInfo {
  status: string;
  button: Button;
  sectionId: number;
  userId: number;
}

export interface Button {
  text: string;
  link?: string;
  action: string;
  class: string;
}
