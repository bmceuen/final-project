
let firebase = require('./firebase')

exports.handler = async function(event) {
    
    // console.log(event)
  // let queryStringUserId = event.queryStringParameters.userId 
  // not necessary given we are read only
  
  let db = firebase.firestore()
  let answersData = []
  let answersQuery = await db.collection('answers').get()
  let answers = answersQuery.docs 

  console.log(answers.length)
  
  for (let i = 0; i < answers.length; i++) {
    let answerId = answers[i].id
    let answerData = answers[i].data() 
    
    // productImage = productList[i].image_url
    // let productName = productList[i].product_name
    // let productBrand = productList[i].brand
    // let productPrice = productList[i].price

    answersData.push({
      id: answerId,
      answer: answerData.answer,
      category: answerData.category,
      userId: answerData.userId

      // id: productId,
      // image_url: productData.image_url,
      // product_name: productData.product_name,
      // brand: productData.brand,
      // price: productData.price,
      // url: productData.url,
      // category: productData.category
    })
  }

    console.log(answersData.length)


    return {
      statusCode: 200,
      body: JSON.stringify(answersData)
    }
  }