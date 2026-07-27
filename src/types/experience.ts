/**
 * Flat experience type used by the Experience section UI.
 * Derived from the database ExperiencePost type with computed fields.
 */
export type FlatExperience = {
  id: string;
  company: string;
  title: string;
  location: string;
  date: string;
  description: string[];
  technologies: string[];
  achievements: string[];
  type: string;
  logoUrl?: string;
  website?: string;
  isCurrent: boolean;
  startDate: string;
  endDate: string;
};
