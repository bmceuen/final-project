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
        document.querySelector('.userinfo').insertAdjacentHTML('beforeend',
        `Hello ${user.displayName}! <br>
        <button class="sign-out-button Montserrat-bold bg-tan text-bold text-storm px-4 py-2 rounded-xl">Sign-Out</button>`
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
                
                document.querySelector('.products').insertAdjacentHTML('beforeend', `
                <div class="product-grid">
                <div class="product-${productID} p-4">
                    <a href="${productURL}" target="popup" onclick="window.open('${productURL}','name','width=1400, height=1000')">
                        <img src="${productImage}" class="product-image border-2 border-black">
                    </a>
                    <button class="buynow hidden">BUY NOW</button>
                    <button class="btn hidden">👍</button>
                    <button class="btn2 hidden">👎</button>
                    <div class="mt-2 justify-center">
                        <p class="text-center text-2xl text-bold text-black">${brand}</p>
                    </div>
                    <div class="text-black text-center text-l text-bold">${productName}</div>
                    <div class="text-black text-center text-xl text-bold">${productPrice}</div>
                </div>
                </div>
                `)
            document.querySelector(`.product-${productID}`).addEventListener('mouseover', function (event)
                    {
                        event.preventDefault()
                        document.querySelector(`.product-${productID} .buynow`).classList.remove('hidden')
                        document.querySelector(`.product-${productID} .btn`).classList.remove('hidden')
                        document.querySelector(`.product-${productID} .btn2`).classList.remove('hidden')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('opacity-80')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('transition', 'duration-500', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110')
                    })
                
            document.querySelector(`.product-${productID}`).addEventListener('mouseout', function (event)
                    {
                        event.preventDefault()
                        document.querySelector(`.product-${productID} .buynow`).classList.add('hidden')
                        document.querySelector(`.product-${productID} .btn`).classList.add('hidden')
                        document.querySelector(`.product-${productID} .btn2`).classList.add('hidden')
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('opacity-80')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('transition', 'duration-900', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110')
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
                
                document.querySelector('.products').insertAdjacentHTML('beforeend', `
                <div class="product-grid">
                <div class="product-${productID} p-4">
                    <a href="${productURL}" target="popup" onclick="window.open('${productURL}','name','width=1400, height=1000')">
                        <img src="${productImage}" class="product-image border-2 border-black">
                    </a>
                    <button class="buynow hidden">BUY NOW</button>
                    <button class="btn hidden">👍</button>
                    <button class="btn2 hidden">👎</button>
                    <div class="mt-2 justify-center">
                        <p class="text-center text-2xl text-bold text-black">${brand}</p>
                    </div>
                    <div class="text-black text-center text-l text-bold">${productName}</div>
                    <div class="text-black text-center text-xl text-bold">${productPrice}</div>
                </div> 
                </div>
                `)
            document.querySelector(`.product-${productID}`).addEventListener('mouseover', function (event)
                    {
                        event.preventDefault()
                        document.querySelector(`.product-${productID} .buynow`).classList.remove('hidden')
                        document.querySelector(`.product-${productID} .btn`).classList.remove('hidden')
                        document.querySelector(`.product-${productID} .btn2`).classList.remove('hidden')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('opacity-80')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('transition', 'duration-500', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110')
                    })
                
            document.querySelector(`.product-${productID}`).addEventListener('mouseout', function (event)
                    {
                        event.preventDefault()
                        document.querySelector(`.product-${productID} .buynow`).classList.add('hidden')
                        document.querySelector(`.product-${productID} .btn`).classList.add('hidden')
                        document.querySelector(`.product-${productID} .btn2`).classList.add('hidden')
                        document.querySelector(`.product-${productID} .product-image`).classList.remove('opacity-80')
                        document.querySelector(`.product-${productID} .product-image`).classList.add('transition', 'duration-900', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110')
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
                    <div class="border-2 border-white m-8">
                    <form class="quiz text-center text-black justify-center">
                    
                        <p class="text-black">What is your preferred pant fit?</p>
    
                        <input type="radio" id="Straight" name="pant_fit" value="Straight">
                        <label for="Straight">Straight</label><br>
    
                        <input type="radio" id="Slim" name="pant_fit" value="Slim">
                        <label for="Slim">Slim</label><br>
    
                        <input type="radio" id="Skinny" name="pant_fit" value="Skinny">
                        <label for="Skinny">Skinny</label><br>
    
                        <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">Submit</button>
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
                <div class="border-2 border-white m-8">
                <form class="quiz text-center text-black">
                
                    <p class="text-black">What is your favorite ${category} brand?</p>

                    <input type="radio" id="levi's" name="denim" value="Levi's">
                    <label for="Levi's">Levi's</label><br>

                    <input type="radio" id="Gap" name="denim" value="Gap">
                    <label for="Gap">Gap</label><br>

                    <input type="radio" id="American Eagle" name="denim" value="American Eagle">
                    <label for="American Eagle">American Eagle</label><br>

                    <input type="radio" id="Banana Republic" name="denim" value="Banana Republic">
                    <label for="Banana Republic">Banana Republic</label><br>

                    <input type="radio" id="Mugsy Jeans" name="denim" value="Mugsy Jeans">
                    <label for="Mugsy Jeans">Mugsy Jeans</label><br>

                    <input type="radio" id="Paige" name="denim" value="Paige">
                    <label for="Paige">Paige</label><br>

                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">Submit</button>
                </form>
                </div>
                `)
            }
            else if(category == 't-shirts')
            {
                productsDiv.insertAdjacentHTML('beforeend', `
                <div class="border-2 border-white m-8">
                <form class="quiz text-center text-black">
                
                    <p class="text-black">What is your favorite ${category} brand?</p>

                    <input type="radio" id="Buck Mason" name="t-shirts" value="Buck Mason">
                    <label for="Buck Mason">Buck Mason</label><br>

                    <input type="radio" id="Everlane" name="t-shirts" value="Everlane">
                    <label for="Everlane">Everlane</label><br>

                    <input type="radio" id="Gap" name="t-shirts" value="Gap">
                    <label for="Gap">Gap</label><br>

                    <input type="radio" id="Bylt Basics" name="t-shirts" value="Bylt Basics">
                    <label for="Bylt Basics">Bylt Basics</label><br>

                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">Submit</button>
                </form>
                </div>
                `)
            }

            else if(category == 'sneakers')
            {
                productsDiv.insertAdjacentHTML('beforeend', `
                <div class="border-2 border-white m-8">
                <form class="quiz text-center text-black">
                
                    <p class="text-black">What is your favorite ${category} brand?</p>

                    <input type="radio" id="allbirds" name="sneakers" value="allbirds">
                    <label for="allbirds">allbirds</label><br>

                    <input type="radio" id="Nike" name="sneakers" value="Nike">
                    <label for="Nike">Nike</label><br>

                    <input type="radio" id="Greats" name="sneakers" value="Greats">
                    <label for="Greats">Greats</label><br>

                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">Submit</button>
                </form>
                </div>
                `)
            }

            else
            {
                productsDiv.insertAdjacentHTML('beforeend', `
                <div class="border-2 border-white m-8">
                <form class="quiz text-center text-black">
                
                    <p class="text-black">What is your preferred pant fit?</p>
                    <input type="radio" id="Slim" name="pant_fit" value="Slim">
                    <label for="Slim">Slim</label><br>

                    <input type="radio" id="Skinny" name="pant_fit" value="Skinny">
                    <label for="Skinny">Skinny</label><br>

                    <input type="radio" id="Straight" name="pant_fit" value="Straight">
                    <label for="Straight">Straight</label><br>

                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">Submit</button>
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
    }



    

    else
    {
        document.location.href = 'login.html'
    }
})