let db = firebase.firestore()
firebase.auth().onAuthStateChanged(async function(user)
{
    if (user)
    {
        //this checks to see if they have answered the t-shirt question
        
                    let querySnapshot1 = await db.collection('answers')
                                                .where('userId', '==', user.uid)
                                                .where('category', '==', 't-shirts')
                                                .get()
                    let findAnswer1 = querySnapshot1.docs
                    

                    let querySnapshot2 = await db.collection('answers')
                                                .where('userId', '==', user.uid)
                                                .where('category', '==', 'sneakers')
                                                .get()
                    
                    let findAnswer2 = querySnapshot2.docs

                    let querySnapshot3 = await db.collection('answers')
                                                .where('userId', '==', user.uid)
                                                .where('category', '==', 'denim')
                                                .get()
                    
                    let findAnswer3 = querySnapshot3.docs

        

                    if (findAnswer1.length > 0) //they have answered the tshirt question
                    {
                        if(findAnswer2.length>0) //they have answered the sneakers question
                        {
                            
                                category = 'denim'
                        }
                        else
                        {
                            category = 'sneakers'
                        }
                    }
                    else
                    {
                        category = 't-shirts'
                    }
         
        
        let querySnapshot4 = await db.collection('answers')
                                    .where('userId', '==', user.uid)
                                    .where('pant_fit', 'in', ['Slim','Straight','Skinny'])
                                    .get()

        let findAnswer4 = querySnapshot4.docs
            
        
        let productsDiv = document.querySelector('.products')
        let sideNavDiv = document.querySelector('.sidebar')


        // function for quiz form
        // function renderQuiz(brandsArray){
            // productsDiv.insertAdjacentHTML('beforeend', `
            // <div class="selector border-2 border-gray-100 p-8">
            //     <form class="quiz text-center text-black">

            //     <p class="text-black text-xl p-4">What is your favorite ${category} brand?</p>
            
            //     <div class="quizImages flex">
            // `)
            // for (let i= 0; i<brandsArray.length; i++) {
            //     let company = brandsArray[i]
            //     productsDiv.insertAdjacentHTML('beforeend', `        
            //         <input type="radio" id=${company.brand} name=${company.category} value=${company.brand}/>
            //         <label class="quizOption" for=${company.brand}>
            //         <img src=${company.image}></img>
            //         </label>
            // }
            // `)

            // productsDiv.insertAdjacentHTML('beforeend', `
            //     </div>

            //     <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-8 rounded-xl">Submit</button>
                

            //     </form>
            // </div>
            // `)
        // }
        
        //THIS CHANGES THE PRODUCT CATEOGORY AS YOU NAVIGATE
        let adjustCategory = function()
        {
            let categoryTitle = category.toUpperCase()
            document.querySelector('.category-title').innerHTML = ''
            document.querySelector('.category-title').insertAdjacentHTML('beforeend',
            `${categoryTitle}`
            )
        }

        //THIS SHOWS USER INFO
        document.querySelector('.userinfo').insertAdjacentHTML('beforeend', `
        <div class="text-storm text-2xl text-bold uppercase"> ${user.displayName}'s Closet</div> <br>
        <button class="sign-out-button bg-tan text-storm px-4 py-2 rounded-xl">Sign-Out</button>`
        )

        //THIS SHOWS FILTERS
        let showFilters = async function()
        {
            let querySnapshot4 = await db.collection('answers')
                                    .where('userId', '==', user.uid)
                                    .where('pant_fit', 'in', ['Slim','Straight','Skinny'])
                                    .get()

            let findAnswer4 = querySnapshot4.docs
            let findAnswer4ID = querySnapshot4.docs[0].id

            for(let t=0;t<findAnswer4.length;t++)
            {
                let item = findAnswer4[t].data()
                
                if(item.pant_fit == 'Slim')
                {
                document.querySelector('.filters').innerHTML = `<form>
                <label for="pant_fit">Your preferred pant fit is: </label>
                <select name="pant_fit" id="pant_fit">
                  <option value="${item.pant_fit}">${item.pant_fit}</option>
                  <option value="Straight">Straight</option>
                  <option value="Skinny">Skinny</option>
                </select>
              </form>
              `
                }
                else if(item.pant_fit == 'Straight')
                {
                    document.querySelector('.filters').innerHTML = `<form>
                    <label for="pant_fit">Your preferred pant fit is: </label>
                    <select name="pant_fit" id="pant_fit">
                      <option value="${item.pant_fit}">${item.pant_fit}</option>
                      <option value="Slim">Slim</option>
                      <option value="Skinny">Skinny</option>
                    </select>
                  </form>
                  `   
                }
                else
                {
                    document.querySelector('.filters').innerHTML = `<form>
                    <label for="pant_fit">Your preferred pant fit is: </label>
                    <select name="pant_fit" id="pant_fit">
                      <option value="${item.pant_fit}">${item.pant_fit}</option>
                      <option value="Straight">Straight</option>
                      <option value="Slim">Slim</option>
                    </select>
                  </form>
                  `   
                }
            }
            
            let userPantFit = document.querySelector('#pant_fit').value
            console.log(userPantFit)
            document.querySelector('.filters').classList.remove('hidden')
            document.querySelector('#pant_fit').addEventListener('change', async function (event)
            {
                event.preventDefault()
                await db.collection('answers').doc(`${findAnswer4ID}`).set({
                                                pant_fit: document.querySelector('#pant_fit').value,
                                                userId: user.uid
                                                
                                            })
                
                if(category == 'denim')
                {
                    printProducts()
                }
                                        
            })
            
        

        }
        
        //THIS IS THE SIGNOUT BUTTON
        document.querySelector('.sign-out-button').addEventListener('click', function(event)
        {
            event.preventDefault()
            firebase.auth().signOut()
            document.location.href = 'login.html'
        })
        //userId
        let userId = user.uid
        // like collection
        const liked = []
        let likedProductCollection = await db.collection('liked')
            .where ('userId','==', user.uid)
            .get()
        let likedProducts = likedProductCollection.docs

        for (let i=0; i < likedProducts.length; i++){
            let likedProduct = likedProducts[i].data()
            let likedProductID = likedProduct.likedProductId
            liked.push(likedProductID)
          } 
          console.log(liked)

        // disliked collection

          const disliked = []
          let dislikedProductCollection = await db.collection('disliked')
              .where ('userId','==', user.uid)
              .get()
          let dislikedProducts = dislikedProductCollection.docs
  
          for (let i=0; i < dislikedProducts.length; i++){
              let dislikedProduct = dislikedProducts[i].data()
              let dislikedProductID = dislikedProduct.dislikedProductId
              disliked.push(dislikedProductID)
            } 
            console.log(disliked)
        
      //THIS PRINTS THE PRODUCTS FOR DENIM CATEGORY
        let printProducts = async function()
        {
            if(category == 'denim')
            {
            productsDiv.innerHTML = ''
            let findAnswers= await db.collection('answers')
                                    .where('userId', '==', user.uid)
                                    .where('category','==', category)
                                    .get()
            let answers = findAnswers.docs
            for (let j = 0;j<answers.length;j++)
            {
                let answer = answers[j].data()
                console.log(answer)
            
            let findPantFitAnswer = await db.collection('answers')
                                            .where('userId', '==', user.uid)
                                            .where('pant_fit', 'in', ['Slim','Straight','Skinny'])
                                            .get()
                    
            let fitAnswers = findPantFitAnswer.docs
            console.log(fitAnswers)
            for(let k = 0;k<fitAnswers.length;k++)
            {
                let fitAnswer = fitAnswers[k].data()
                console.log(fitAnswer)
            
            
            let productList = await db.collection('products').where('brand', '==',answer.answer)
                                                                .where('category', '==', answer.category)
                                                                .where('pant_fit', '==', fitAnswer.pant_fit)                                            
                                                                .get()
            // console.log(productList)
            let products = productList.docs
                for(let i=0; i<products.length;i++)
                {
                    let productData = products[i].data()
                    
                    let productImage = productData.image_url
                    let productName = productData.product_name
                    let productURL = productData.url
                    let productPrice = productData.price
                    let brand = productData.brand
                    let productID = productData.product_number
                    
                    
                    // <div class="product-grid">
                    document.querySelector('.products').insertAdjacentHTML('beforeend', `

                    <div class="product-grid product-${productID} p-4 md:w-1/4">
                        <div class = "productImgContainer">
                            <a href="${productURL}" target="popup" onclick="window.open('${productURL}','name','width=1400, height=1000')">
                                <img src="${productImage}" class="product-image border-2 border-black">
                            </a>
                                    <button class="buynow hidden">BUY NOW</button>
                                    <button class="btn hidden">👍</button>
                                    <button class="btn2 hidden">👎</button>
                        </div>
                        <div class="mt-2 justify-center">
    
                            <p class="text-center text-2xl text-bold text-black">${brand}</p>
                        </div>
                        <div class="text-black text-center text-l text-bold">${productName}</div>
                        <div class="text-black text-center text-xl text-bold">${productPrice}</div>
                    </div>                
                    `)

                    if (liked.includes(productID)) {
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('border-black')
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('opacity-20')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('border-tan')
                    } else if (disliked.includes(productID)) {
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('border-black')
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('border-tan')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('border-gray-100')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('opacity-20')
                    } else {                        
                    }
                    
                    document.querySelector(`.product-${productID}`).addEventListener('mouseover', function (event)
                            {
                                event.preventDefault()
                                document.querySelector(`.product-${productID} .buynow`).classList.remove('hidden')
                                document.querySelector(`.product-${productID} .btn`).classList.remove('hidden')
                                document.querySelector(`.product-${productID} .btn2`).classList.remove('hidden')
                                // document.querySelector(`.product-${productID} .product-image`).classList.add('opacity-80')
                                document.querySelector(`.product-${productID} .product-image`).classList.add('transition', 'duration-500', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110')
                            })
                        
                    document.querySelector(`.product-${productID}`).addEventListener('mouseout', function (event)
                            {
                                event.preventDefault()
                                document.querySelector(`.product-${productID} .buynow`).classList.add('hidden')
                                document.querySelector(`.product-${productID} .btn`).classList.add('hidden')
                                document.querySelector(`.product-${productID} .btn2`).classList.add('hidden')
                                // document.querySelector(`.product-${productID} .product-image`).classList.remove('opacity-80')
                                document.querySelector(`.product-${productID} .product-image`).classList.add('transition', 'duration-900', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110')
                            })
                    
                    document.querySelector(`.product-${productID} .buynow`).addEventListener('click', function ()
                    {
                        window.open(`${productURL}`,'_blank')                        
                    })

                    document.querySelector(`.product-${productID} .btn`).addEventListener('click', async function (event)
                    {
                        event.preventDefault()
                            document.querySelector(`.product-${productID} .product-image`).classList.remove('border-black')
                            document.querySelector(`.product-${productID} .product-image`).classList.remove('opacity-20')
                            document.querySelector(`.product-${productID} .product-image`).classList.add('border-tan')
                            await db.collection('liked').doc(`${userId}-${productID}`).set({
                                userId: user.uid,
                                likedProductId: productID
                            })
                            await db.collection('disliked').doc(`${userId}-${productID}`).delete()
                    })

                    document.querySelector(`.product-${productID} .btn2`).addEventListener('click', async function (event)
                    {
                        event.preventDefault()
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('border-black')
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('border-tan')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('border-gray-100')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('opacity-20')
                        await db.collection('disliked').doc(`${userId}-${productID}`).set({
                            userId: user.uid,
                            dislikedProductId: productID
                        })
                        await db.collection('liked').doc(`${userId}-${productID}`).delete()
                    })
                }
            }
        }
    }
            
            //THIS PRINTS THE PRODUCTS FOR NON DENIM CATEGORIES
            else
            {
            productsDiv.innerHTML = ''
            let findAnswers= await db.collection('answers')
                                    .where('userId', '==', user.uid)
                                    .where('category','==', category)
                                    .get()
            let answers = findAnswers.docs
            


            for (let j = 0;j<answers.length;j++)
            {
                let answer = answers[j].data()
                
                console.log(answer.answer)
                console.log(answer.category)
                
            let productList = await db.collection('products').where('brand', '==', answer.answer)
                                                            .where('category', '==', answer.category)                                            
                                                            .get()


            
            
            let products = productList.docs
            console.log(products)
            
                for(let i=0; i<products.length;i++)
                {
                    let productData = products[i].data()
                    
                    let productImage = productData.image_url
                    let productName = productData.product_name
                    let productURL = productData.url
                    let productPrice = productData.price
                    let brand = productData.brand
                    let productID = productData.product_number
                    // <div class="product-grid">
                    document.querySelector('.products').insertAdjacentHTML('beforeend', `

                    <div class="product-grid product-${productID} p-4 md:w-1/4">
                        <div class = "productImgContainer">
                            <a href="${productURL}" target="popup" onclick="window.open('${productURL}','name','width=1400, height=1000')">
                                <img src="${productImage}" class="product-image border-2 border-black">
                            </a>
                                    <button class="buynow hidden">BUY NOW</button>
                                    <button class="btn hidden">👍</button>
                                    <button class="btn2 hidden">👎</button>
                        </div>
                        <div class="mt-2 justify-center">
    
                            <p class="text-center text-2xl text-bold text-black">${brand}</p>
                        </div>
                        <div class="text-black text-center text-l text-bold">${productName}</div>
                        <div class="text-black text-center text-xl text-bold">${productPrice}</div>
                    </div>                
                    `)

                    if (liked.includes(productID)) {
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('border-black')
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('opacity-20')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('border-tan')
                    } else if (disliked.includes(productID)) {
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('border-black')
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('border-tan')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('border-gray-100')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('opacity-20')
                    } else {                        
                    }
                    
                    document.querySelector(`.product-${productID}`).addEventListener('mouseover', function (event)
                            {
                                event.preventDefault()
                                document.querySelector(`.product-${productID} .buynow`).classList.remove('hidden')
                                document.querySelector(`.product-${productID} .btn`).classList.remove('hidden')
                                document.querySelector(`.product-${productID} .btn2`).classList.remove('hidden')
                                // document.querySelector(`.product-${productID} .product-image`).classList.add('opacity-80')
                                document.querySelector(`.product-${productID} .product-image`).classList.add('transition', 'duration-500', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110')
                            })
                        
                    document.querySelector(`.product-${productID}`).addEventListener('mouseout', function (event)
                            {
                                event.preventDefault()
                                document.querySelector(`.product-${productID} .buynow`).classList.add('hidden')
                                document.querySelector(`.product-${productID} .btn`).classList.add('hidden')
                                document.querySelector(`.product-${productID} .btn2`).classList.add('hidden')
                                // document.querySelector(`.product-${productID} .product-image`).classList.remove('opacity-80')
                                document.querySelector(`.product-${productID} .product-image`).classList.add('transition', 'duration-900', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110')
                            })
                    
                    document.querySelector(`.product-${productID} .buynow`).addEventListener('click', function ()
                    {
                        window.open(`${productURL}`,'_blank')                        
                    })

                    document.querySelector(`.product-${productID} .btn`).addEventListener('click', async function (event)
                    {
                        event.preventDefault()
                            document.querySelector(`.product-${productID} .product-image`).classList.remove('border-black')
                            document.querySelector(`.product-${productID} .product-image`).classList.remove('opacity-20')
                            document.querySelector(`.product-${productID} .product-image`).classList.add('border-tan')
                            await db.collection('liked').doc(`${userId}-${productID}`).set({
                                userId: user.uid,
                                likedProductId: productID
                            })
                            await db.collection('disliked').doc(`${userId}-${productID}`).delete()
                    })

                    document.querySelector(`.product-${productID} .btn2`).addEventListener('click', async function (event)
                    {
                        event.preventDefault()
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('border-black')
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('border-tan')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('border-gray-100')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('opacity-20')
                        await db.collection('disliked').doc(`${userId}-${productID}`).set({
                            userId: user.uid,
                            dislikedProductId: productID
                        })
                        await db.collection('liked').doc(`${userId}-${productID}`).delete()
                    })
                }
            }
            }
         }
        
    
        
        if(findAnswer1.length>0 && findAnswer2.length>0 && findAnswer3.length>0) //this checks to see if they have they answered all the quiz questions
        {
                
                if(findAnswer4.length>0)    //have they answered what fit denim they wear?
                {                
                        printProducts()
                        adjustCategory()
                        showFilters()
                }
                else
                {

                    //CHECK DENIM FIT QUESTION
                    productsDiv.insertAdjacentHTML('beforeend', `
                    <div class="selector border-2 border-gray-100 p-8">
                    <form class="quiz text-center text-black">

                    <p class="text-black text-xl p-4">What is your favorite pant fit?</p>

                    <div class="quizImages flex center">
                        
                        <input type="radio" id="Slim" name="pant_fit" value="Slim">
                        <label class="quizOptionFit" for="Slim">
                        <img src="images/slim.jpg"></img>
                        Slim</label>

                        <input type="radio" id="Skinny" name="pant_fit" value="Skinny">
                        <label class="quizOptionFit" for="Skinny">
                        <img src="images/skinny.jpg"></img>
                        Skinny</label>

                        <input type="radio" id="Straight" name="pant_fit" value="Straight">
                        <label class="quizOptionFit"for="Straight">
                        <img src="images/straight.jpg"></img>
                        Straight</label>

                    </div>

                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-8 rounded-xl">Submit</button>
                
                    </form>
                    

                    </div>
                    `)


                    document.querySelector('.quiz').addEventListener('submit', async function(event){

                        event.preventDefault()
                        let fitAnswer = document.querySelector(`input[name="pant_fit"]:checked`).value
                        
                        db.collection('answers').add({
                            userId: user.uid,
                            pant_fit: fitAnswer,
                        })
                        
                        printProducts()
                        adjustCategory()
                        showFilters()
                    })
                }
        }
        else
        {
            if(category == 'denim')
            {
                productsDiv.insertAdjacentHTML('beforeend', `
                <div class="selector border-2 border-gray-100 p-8">
                    <form class="quiz text-center text-black">

                    <p class="text-black text-xl p-4">What is your favorite ${category} brand?</p>

                    <div class="quizImages flex">
                        
                        <input type="radio" id="Levi's" name="denim" value="Levi's"/>
                        <label class="quizOption" for="Levi's">
                        <img src="images/levis.png"></img>
                        </label>

                        <input type="radio" id="Gap" name="denim" value="Gap">
                        <label class="quizOption" for="Gap">
                        <img src="images/gap.png"></img>
                        </label>

                        <input type="radio" id="American Eagle" name="denim" value="American Eagle">
                        <label class="quizOption" for="American Eagle">
                        <img src="images/american_eagle.png"></img>
                        </label>

                        <input type="radio" id="Banana Republic" name="denim" value="Banana Republic">
                        <label class="quizOption" for="Banana Republic">
                        <img src="images/banana_republic.jpg"></img>
                        </label>

                        <input type="radio" id="Mugsy Jeans" name="denim" value="Mugsy Jeans">
                        <label class="quizOption" for="Mugsy Jeans">
                        <img src="images/mugsy.jpg"></img>
                        </label>

                        <input type="radio" id="Paige" name="denim" value="Paige">
                        <label class="quizOption" for="Paige">
                        <img src="images/paige.png"></img>
                        </label>
                    </div> 

                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-8 rounded-xl">Submit</button>
                
                </form>
                </div>
                `)
            }
            else if(category == 't-shirts')
            {
                
                productsDiv.insertAdjacentHTML('beforeend', `
                <div class="selector border-2 border-gray-100 p-8">
                    <form class="quiz text-center text-black">

                    <p class="text-black text-xl p-4">What is your favorite ${category} brand?</p>

                    <div class="quizImages flex">
                        
                        <input type="radio" id="Buck Mason" name="t-shirts" value="Buck Mason"/>
                        <label class="quizOption" for="Buck Mason">
                        <img src="images/buck_mason.jpg"></img>
                        </label>

                        <input type="radio" id="Everlane" name="t-shirts" value="Everlane"/>
                        <label class="quizOption" for="Everlane">
                        <img src="images/everlane.jpg"></img>
                        </label>
            
                        <input type="radio" id="Gap" name="t-shirts" value="Gap"/>
                        <label class="quizOption" for="Gap">
                        <img src="images/gap.png"></img>
                        </label>
            
                        <input type="radio" id="Bylt Basics" name="t-shirts" value="Bylt Basics"/>
                        <label class="quizOption" for="Bylt Basics">
                        <img src="images/bylt.jpg"></img>
                        </label>
               
                
                    </div>

                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-8 rounded-xl">Submit</button>
                    

                    </form>
                </div>
                `)
            }




            else if(category == 'sneakers')
            {
                productsDiv.insertAdjacentHTML('beforeend', `

                <div class="selector border-2 border-gray-100 p-8">
                    <form class="quiz text-center text-black">                        
                        
                        <p class="text-black text-xl p-4">What is your favorite ${category} brand?</p>
                        
                        <div class="quizImages flex">
                            <input type="radio" id="allbirds" name="sneakers" value="allbirds">
                            <label class="quizOption" for="allbirds">
                            <img src="images/allbirds.jpg"></img>
                            </label>

                            <input type="radio" id="Nike" name="sneakers" value="Nike">
                            <label class="quizOption" for="Nike">
                            <img src="images/nike.jpg"></img>
                            </label>

                            <input type="radio" id="Greats" name="sneakers" value="Greats">
                            <label class="quizOption" for="Greats">
                            <img src="images/greats.jpg"></img>
                            </label>
                        
                        </div>

                        <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-8 rounded-xl">Submit</button>
                        
                    </form>
                </div>
                `)
            }

            else
            {
                productsDiv.insertAdjacentHTML('beforeend', `

                <div class="selector border-2 border-gray-100 p-8">
                    <form class="quiz text-center text-black">

                    <p class="text-black text-xl p-4">What is your favorite pant fit?</p>

                    <div class="quizImages flex">
                        
                    <input type="radio" id="Slim" name="pant_fit" value="Slim">
                    <label for="Slim">Slim</label>

                    <input type="radio" id="Skinny" name="pant_fit" value="Skinny">
                    <label for="Skinny">Skinny</label>

                    <input type="radio" id="Straight" name="pant_fit" value="Straight">
                    <label for="Straight">Straight</label>

                

                <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-8 rounded-xl">Submit</button>
                
                </form>
                </div>
                `)
            }
         
        document.querySelector('.quiz').addEventListener('submit', async function(event){

            event.preventDefault()
            let answer = document.querySelector(`input[name="${category}"]:checked`).value
            
            db.collection('answers').add({
                userId: user.uid,
                category: category,
                answer: answer,
            })

                 let querySnapshot1 = await db.collection('answers')
                             .where('userId', '==', user.uid)
                             .where('category', '==', 't-shirts')
                             .get()
                 let findAnswer1 = querySnapshot1.docs
            

                 let querySnapshot2 = await db.collection('answers')
                             .where('userId', '==', user.uid)
                             .where('category', '==', 'sneakers')
                             .get()

                 let findAnswer2 = querySnapshot2.docs

                 let querySnapshot3 = await db.collection('answers')
                             .where('userId', '==', user.uid)
                             .where('category', '==', 'denim')
                             .get()

                 let findAnswer3 = querySnapshot3.docs

                 if (findAnswer1.length > 0) //they have answered the tshirt question
                 {
                 if(findAnswer2.length>0) //they have answered the sneakers question
                 {
                 category = 'denim'
                 }
                 else
                 {
                 category = 'sneakers'
                 }
                 }
                 else
                 {
                 category = 't-shirts'
                 }
                 document.location.href = 'index.html'
         }) 
        }
        

        document.querySelector('.denim').addEventListener('click', async function(event)
        {
            event.preventDefault()
            category = 'denim'
            printProducts()
            adjustCategory()
        })
        document.querySelector('.t-shirts').addEventListener('click', async function(event)
        {
            event.preventDefault()
            category = 't-shirts'
            printProducts()
            adjustCategory()
        })

        document.querySelector('.sneakers').addEventListener('click', async function(event)
        {
            event.preventDefault()
            category = 'sneakers'
            printProducts()
            adjustCategory()
        })

        document.querySelector(`.sneakers`).addEventListener('click', async function(event)
            {
                console.log('hello')
            })
    }
        

    else
    {
        document.location.href = 'login.html'
    }
})