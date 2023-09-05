import Question from "./Answer"
const Questions = ({ questions, onDelete}) => {
  return (
    <>
    {questions.map((task,index) =>( 
        <Question key={index} task={task} 
         onDelete={onDelete}/>
    ))}
    </>
  )
}
export default Questions