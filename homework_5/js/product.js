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
}

// Display the number of rolls in the cart
function cart(){
    let cartNumStored = JSON.parse(localStorage.getItem('cartNum'));
    if(cartNumStored){
        let currCart = document.getElementById('cart');
        currCart.textContent = (cartNumStored);
    }
    let priceSum = JSON.parse(localStorage.getItem('priceSum'))
    if (priceSum == null){
        localStorage.setItem('priceSum', JSON.stringify(0))
    }
    updateCart();
}

// Update the cart on the navigaation abr
function updateCart(){
    let cartNumStored = JSON.parse(localStorage.getItem('cartNum'));
    let selectedQty = parseInt(document.getElementById('qtyNum').value);
    let cartNum = document.getElementById('cart').text;
    cartNum = cartNum.replace('CART (', '');
    cartNum = cartNum.replace(')',''); 
    if(cartNumStored){
        localStorage.setItem('cartNum',JSON.stringify('CART ('+ (selectedQty + parseInt(cartNum)) + ')'));
        document.getElementById('cart').text = 'CART ('+ (selectedQty + parseInt(cartNum)) +')';
    }
    else{ 
        localStorage.setItem('cartNum',JSON.stringify('CART (' + selectedQty + ')'));
        document.getElementById('cart').text = 'CART (' + selectedQty + ')'; 
    }
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
}