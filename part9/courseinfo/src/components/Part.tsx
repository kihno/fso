import { CoursePart } from "../types";

interface PartProps {
  course: CoursePart;
}

const Part = (props: PartProps) => {
  const { course } = props;

  const Body = () => {
    switch (course.kind){
      case "basic":
        return(
          <div>
            <em>{course.description}</em>
          </div>
        )
      case "group":
        return(
          <div>
            <div>project exercises {course.groupProjectCount}</div>
          </div>
        )
      case "background":
        return(
          <div>
            <em>{course.description}</em>
            <div>{course.backgroundMaterial}</div>
          </div>
        )
      case "special":
        return(
          <div>
            <em>{course.description}</em>
            <div>required skills: {course.requirements.join(', ')}</div>
          </div>
        )
    }
  }

  return(
    <p>
      <strong>{course.name} {course.exerciseCount}</strong>
      <Body />
    </p>
  )
};

export default Part
