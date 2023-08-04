import { CoursePart } from "../types"
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  const { courseParts } = props;

  return(
    <div>
      {courseParts.map(course =>
        <Part key={course.name} course={course}/>
      )}
    </div>
  )
}

export default Content;
