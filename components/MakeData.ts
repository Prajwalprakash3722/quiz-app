import axios from 'axios';


function shuffle(array: any) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}






const MakeData = async () => {

  const res = await axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')


  const data = await res.data.results

  let Questions: { questionText: any; answerOptions: any; }[] = []

  data.map((item: any) => {

    let Answers: { answerText: any; isCorrect: boolean; }[] = []

    item.incorrect_answers.map((item: any) => {
      let Adata = {
        answerText: item,
        isCorrect: false
      }
      Answers.push(Adata)
    })

    let Correct = {
      answerText: item.correct_answer,
      isCorrect: true
    }
    const QData = {
      questionText: item.question,
      answerOptions: shuffle(Answers.concat(Correct))
    }
    Questions.push(QData)

  })

  return Questions;


}




export default MakeData;