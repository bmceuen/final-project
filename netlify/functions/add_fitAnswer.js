let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
 
  let body = JSON.parse(event.body)
  let userId = body.userId
  let pant_fit = body.pant_fit
  
  console.log(event)
  console.log(`user: ${userId}`)
  console.log(`pant_fit: ${pant_fit}`)

  let newFitAnswer = { 
    userId: userId,
    pant_fit: pant_fit, 
    created: firebase.firestore.FieldValue.serverTimestamp()
  }

  let docRef = await db.collection('answers').add(newFitAnswer)
  newFitAnswer.id = docRef.id
 
  return {
    statusCode: 200,
    body: JSON.stringify(newFitAnswer)
  }

}