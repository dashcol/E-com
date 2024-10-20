function initialCart(){
    localStorage.clear();
    const items=[
        {  "id": 1,  "name": "Laptop",  "price": 100000.00, "quantity": 1,  "image": "https://m.media-amazon.com/images/I/817bs-vUENL._SY450_.jpg"   },
        {   "id": 2,   "name": "Smartphone",  "price": 50000.00,  "quantity": 1,   "image": "https://m.media-amazon.com/images/I/41sXFsE+OcL._SY300_SX300_.jpg"   },
        {   "id": 3,  "name": "Tablet",   "price": 30000.00,  "quantity": 1,  "image": "https://m.media-amazon.com/images/I/41k2fGLD8OL._SX300_SY300_QL70_FMwebp_.jpg"   },
        {  "id": 4,   "name": "Headphones",   "price": 8000.00, "quantity": 1,    "image": "https://m.media-amazon.com/images/I/31LuPNjTosL._SX300_SY300_QL70_FMwebp_.jpg"   },
    //       {  "id": 5,  "name": "Smartwatch",   "price": 15000.00,"quantity": 1,     "image": ""  },
    //     {    "id": 6, "name": "Camera","price": 60000.00,"quantity": 1,   "image": ""  },
    //   {     "id": 7,     "name": "Monitor",   "price": 25000.00,  "quantity": 1,     "image": ""     },
    //     {   "id": 8,   "name": "Keyboard",    "price": 3000.00,  "quantity": 1, "image": ""  },
    //     { "id": 9, "name": "Mouse",  "price": 1500.00,  "quantity": 1,   "image": ""  },
    //     {   "id": 10,  "name": "Gaming Console", "price": 40000.00,"quantity": 1, "image": "" }
     ]
    
   if(!localStorage.getItem('cart')){
    localStorage.setItem('cart', JSON.stringify(items));
   }




}


document.addEventListener('DOMContentLoaded',()=>{
    initialCart();
   const cartItemsContainer=document.getElementById('cart-items')
   const cartTotalElement=document.getElementById('cart-total')
   const checkoutButton=document.getElementById('cart-button')
 
    function loadCartItems(){
  const cart=JSON.parse( localStorage.getItem('cart')||[])
  if(cart.length>0){
cartItemsContainer.innerHTML='';
cart.forEach((product,index)=>{
     const cartItem=document.createElement('div');
     cartItem.className='cart-item';

     cartItem.innerHTML=`<img src="${product.image}">
<div class="cart-item-details">
<h3 class="cart-item-title">${product.name}</h3>
<p class="cart-item-price">${product.price}</p>
<div class="cart-item-actions">
<input class="quantity-input" type="number" value="${product.quantity}">
<button class="remove-button">Remove</button>
</div>
</div>`;
     cartItemsContainer.appendChild(cartItem)


     const removeButton=cartItem.querySelector('.remove-button');
     const quantityInput=cartItem.querySelector('.quantity-input');
     removeButton.addEventListener('click',()=>{
        cart.splice(index,1);
        localStorage.setItem('cart',JSON.stringify(cart));
       loadCartItems();
     })

     quantityInput.addEventListener('change',(event)=>{
      product.quantity=parseInt(event.target.value);
      localStorage.setItem('cart',JSON.stringify(cart));
      updateCartTotal();
     })
});
updateCartTotal();

  }else{
    cartItemsContainer.innerHTML='<p>YOUR CART IS EMPTY</p>'
  }
 
    }


    function updateCartTotal(){
        let total=0;
        const cart=JSON.parse(localStorage.getItem('cart')||[]);
        cart.forEach(item=>{
            total+=item.price*item.quantity;
        });
        cartTotalElement.textContent=`Total:${total.toFixed(2)}`
    }
    loadCartItems();
})