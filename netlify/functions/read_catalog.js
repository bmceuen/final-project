
let firebase = require('./firebase')

exports.handler = async function(event) {
    
    // console.log(event)
  // let queryStringUserId = event.queryStringParameters.userId 
  // not necessary given we are read only
  
  let db = firebase.firestore()
  let productsData = []
  let querySnapshot = await db.collection('products').get()
  let productList = querySnapshot.docs 

  console.log(productList.length)
  
  for (let i = 0; i < productList.length; i++) {
    let productId = productList[i].id
    let productData = productList[i].data() 
    
    // productImage = productList[i].image_url
    // let productName = productList[i].product_name
    // let productBrand = productList[i].brand
    // let productPrice = productList[i].price

    productsData.push({
      id: productId,
      image_url: productData.image_url,
      product_name: productData.product_name,
      brand: productData.brand,
      price: productData.price,
      url: productData.url,
      category: productData.category
    })
  }

    console.log(productsData)


    return {
      statusCode: 200,
      body: JSON.stringify(productsData)
    }
  }