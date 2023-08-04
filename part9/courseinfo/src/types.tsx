interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartPartBasic extends CoursePartDescription {
  kind: "basic"
}

export interface CoursePartPartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartPartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartPartBasic | CoursePartPartGroup | CoursePartPartBackground | CoursePartSpecial
