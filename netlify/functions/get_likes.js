
let firebase = require('./firebase')

exports.handler = async function(event) {
    let queryStringUserId = event.queryStringParameters.userid
   
  
  let db = firebase.firestore()
  let likesData = []
  let likesQuery = await db.collection('liked').where('userId','==', queryStringUserId).get()
  let likes = likesQuery.docs 

  console.log(answers.length)
  
  for (let i = 0; i < likes.length; i++) {
    let like = likes[i].data()
    likesData.push({
        userId: like.userId,
        likedProductId: like.likedProductId

    })
}


    return {
      statusCode: 200,
      body: JSON.stringify(answersData)
    }
  }