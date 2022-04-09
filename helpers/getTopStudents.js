import firestore from '@react-native-firebase/firestore'

export async function getTopStudents (classId) {
  var Scoreboard = []
  const querySnapshot = await firestore()
    .collection('Instructor Text')
    .where('ClassId', '==', classId)
    .get()

  //collect feedbacks
  const classFeedbacks = []
  querySnapshot.forEach(documentSnapshot => {
    for (var feedbackIndex in documentSnapshot.data().Feedback)
      classFeedbacks.push({
        id: feedbackIndex,
        score: documentSnapshot.data().Feedback[feedbackIndex]['score'],
      })
  })

  //sum and clean
  for (var feedbackIndex in classFeedbacks) {
    var studentIndex = Scoreboard.findIndex(
      score => score['id'] === classFeedbacks[feedbackIndex].id,
    )
    if (studentIndex != -1) {
      //student exist in the array
      Scoreboard[studentIndex].score =
        Scoreboard[studentIndex].score + classFeedbacks[feedbackIndex].score
    } else {
      Scoreboard.push({
        id: classFeedbacks[feedbackIndex].id,
        score: classFeedbacks[feedbackIndex].score,
      })
    }
  }

  return Scoreboard.sort((a, b) => b.score - a.score)
}
