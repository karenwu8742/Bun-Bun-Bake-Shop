// Product Javascript

// Creating rolls that are in the cart
function roll(name, glaze, img, qty, price, cartNum){
    item = {
        name,
        glaze,
        img,
        qty,
        price,
        cartNum,
    }
    let inCart = JSON.parse(localStorage.getItem('inCart'));
    if (inCart != null) {  
        if (inCart[item.glaze] === undefined) {
            inCart = {
                ...inCart,
                [item.glaze]: item
            }
        }
    } 
    else {
        inCart = {
            [item.glaze]: item
        }   	
    }
    localStorage.setItem("inCart", JSON.stringify(inCart));
    updatePrice()
}

// Update the Page ordering to user selection
function vanillaGlaze(){
    localStorage.setItem('currGlaze', JSON.stringify('vanilla'))
    let currPic = document.getElementById('originalImg');
    currPic.src = "images/original.jpg";
}

function chocoGlaze(){
    localStorage.setItem('currGlaze', JSON.stringify('chocolate'))
    let currPic = document.getElementById('originalImg');
    currPic.src = "images/chocolate glaze.png";
}

function sugarMilkGlaze(){
    localStorage.setItem('currGlaze', JSON.stringify('sugar'))
    let currPic = document.getElementById('originalImg');
    currPic.src = "images/gluten.png";
}

function noGlaze(){
    localStorage.setItem('currGlaze', JSON.stringify('none'))
    let currPic = document.getElementById('originalImg');
    currPic.src = "images/no glaze.png";
}


// Update the price on product page
function updatePrice(){
    let currPrice = document.getElementById('currPrice');
    let qty = document.getElementById('qtyNum').value;
    let price = (5) * parseInt(qty);
    currPrice.innerText = 'Total: $' + parseFloat(price);
    localStorage.setItem('currPrice', JSON.stringify(parseFloat(price)))
    updateTotal()
}

// Update total price on cart page
function updateTotal(){
    let price = JSON.parse(localStorage.getItem('currPrice')) //STORE THE CURRENT ITEM'S PRICE
    let cartPrice = JSON.parse(localStorage.getItem('priceSum')) //IF THERE IS A TOTAL PRICE STORED
    if (cartPrice){
        localStorage.setItem('priceSum', JSON.stringify(parseFloat(price) + parseFloat(cartPrice)))
    }
    else{
        localStorage.setItem('priceSum', JSON.stringify(parseFloat(price)))
    }
    displayCart()
}

// Update the cart on the navigaation abr
function updateCart(){
    let cartNumStored = JSON.parse(localStorage.getItem('cartNum'));
    console.log("Hello")
    let selectedQty = parseInt(document.getElementById('qtyNum').value);
    let cartNum = document.getElementById('cart').text;
    cartNum = cartNum.replace('CART (', '');
    cartNum = cartNum.replace(')',''); 
    if (cartNumStored) {
        localStorage.setItem('cartNum',JSON.stringify('CART ('+ (selectedQty + parseInt(cartNum)) + ')'));
        document.getElementById('cart').text = 'CART ('+ (selectedQty + parseInt(cartNum)) +')';
    }
    else { 
        localStorage.setItem('cartNum',JSON.stringify('CART (' + selectedQty + ')'));
        document.getElementById('cart').text = 'CART (' + selectedQty + ')'; 
    }
    displayCart()
}

// Display the number of rolls in the cart
function cart(){
    let cartNumStored = JSON.parse(localStorage.getItem('cartNum'));
    if (cartNumStored) {
        let currCart = document.getElementById('cart');
        currCart.textContent = (cartNumStored);
    }
    let priceSum = JSON.parse(localStorage.getItem('priceSum'))
    if (priceSum == null) {
        localStorage.setItem('priceSum', JSON.stringify(0))
    }
}

// Remove item from cart
function removeItem(){ 
    let removeButton = document.getElementsByClassName("changesR"); //getting the remove buttons from cart page
    for (let t = 0; t < removeButton.length; t++){ 
        let b = removeButton[t];
        b.addEventListener('click', function(event) {
        removeFromTotal();
        event.target.parentElement.remove();
        })
    }   
}

// After removing item, the total price will also change
function removeFromTotal(){
    let cartItems = document.getElementsByClassName("items")[0]; //getting items in cart 
    let itemRows = cartItems.getElementsByClassName("item"); //each item's specific row 
    let total = document.getElementById("total").innerText;
    total = total.replace("Total: $", '');
    total = parseFloat(total);
    let priceSum = JSON.parse(localStorage.getItem('priceSum'))
    if (priceSum ===null){
        localStorage.setItem('priceSum', JSON.stringify(0))
    }
    localStorage.setItem('priceSum', JSON.stringify(total));
    //console.log(itemRows);
    for (let i = 0; i < itemRows; i++){
        //console.log('entered');
        let item = itemRows[i];
        let itemPrice = item.getElementsByClassName("price").text;
        total = total - itemPrice;
    }
    document.getElementById("total").text = total;
    localStorage.setItem('priceSum', JSON.stringify(total));
}

// Add the number of rolls to the cart
function addToCart(){
    let name = "Roll with ";
    let glaze = JSON.parse(localStorage.getItem('currGlaze'))
    let img = document.getElementById('originalImg').src;
    let qty = parseInt((document.getElementById('qtyNum').value));
    let cartNum = document.getElementById('cart').innerText
    cartNum = cartNum.replace('CART (', '')
    cartNum = cartNum.replace(')', '')
    localStorage.setItem("cartNum", JSON.stringify(parseInt(cartNum) + qty));
    let price = (document.getElementById('currPrice').innerText)
    price = price.replace('Total: $', '')
    price = parseFloat(price)
    roll(name, glaze, img, qty, price, cartNum)
    updateCart()
    displayCart()
}


// Item will show up in cart after you have added it
function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('inCart')) || [];
    let items = document.getElementById('items')
    if (cartItems && items){
        console.log("entered")
        items.innerHTML  = '';
        Object.values(cartItems).map(item => {
                let newItem = 
                `<div class = "item"> 
                    <img class = "item-img" src = "${item.img}"> 
                    <h5 class="item-roll"> ${item.name } ${item.glaze}</h5>
                    <h5 class="item-price"> $${item.price }.00 </h5>
                    <h5 class="item-quantity">${item.qty } </h5>
                    <button class="changesM"> MODIFY </button>
                    <button class="changesR" ${onclick=removeItem()}> REMOVE </button>
                </div>
                `
               items.innerHTML += newItem
               console.log(items.innerHTML)
        })
        let total = '<div class = "totalPrice">  ${item.price }.00 </div> '        
    }
}

displayCart();