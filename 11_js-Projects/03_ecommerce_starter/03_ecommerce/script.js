document.addEventListener('DOMContentLoaded', ()=>{
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMsg = document.getElementById("empty-cart");
    const cartTotal = document.getElementById("cart-total");
    const totalPrice = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    let cartItemsList = JSON.parse(localStorage.getItem('items')) || []

    cartItemsList.forEach((item) => renderCartItems(item));
    cartItemsTotal();

    let inventoryItems = [
        {   
            name: "Shampoo",
            price: 299,
            id:1
        },
        {
            name: "Charger",
            price: 1299,
            id:2
        },
        {
            name: "Keyboard",
            price: 989,
            id:3
        },
        {
            name: "Earphone",
            price: 359,
            id:4
        },
        {
            name: "Monitor",
            price: 4599,
            id:5
        }
    ]
    inventoryItems.forEach(item => renderInventoryItems(item));

    function renderInventoryItems(item){
        let div = document.createElement('div');
        div.classList.add('product')

        div.innerHTML = `
            <span>${item.name} ${item.price}Rs</span>
            <button>add</button>
        `
        productList.appendChild(div)

        div.addEventListener('click', (event)=>{
            event.stopPropagation();
            if(event.target.tagName !== 'BUTTON') return;

            renderCartItems(item);
            cartItemsList.push(item);
            cartItemsTotal();

            saveItems()
        })
    }

    function renderCartItems(item) {
        let div = document.createElement('div');
        div.classList.add('cart-product');

        if(cartItemsList.length) emptyCartMsg.classList.add('hidden')

        div.innerHTML = `
            <span>${item.name} ${item.price}Rs</span>
            <button>remove</button>
        `
        cartItems.appendChild(div);

        div.addEventListener('click', (event)=>{
            event.stopPropagation();

            if(event.target.tagName !== "BUTTON") return;

            div.remove()

            let index = cartItemsList.findIndex((curr) => curr.id === item.id);

            if (index !== -1) {
              cartItemsList.splice(index, 1);
            }
            cartItemsTotal()
            saveItems();

            if(!cartItemsList.length){
                emptyCartMsg.classList.remove('hidden');
                cartTotal.classList.add('hidden');
            }
        })
    }

    function cartItemsTotal(){
        let total = 0;
        for(const num of cartItemsList){
            total += num.price
        }
        if(cartItemsList.length)  cartTotal.classList.remove("hidden");

        totalPrice.textContent = total

        return total
    }

    function saveItems(){
        localStorage.setItem('items', JSON.stringify(cartItemsList))
    }

    checkoutBtn.addEventListener('click', ()=>{
        let total = cartItemsTotal();

        cartItemsList = []
        cartItems.innerHTML = `<p id="empty-cart">Your cart is empty.</p>`;
        cartTotal.classList.add('hidden')
        emptyCartMsg.classList.remove('hidden')
        saveItems()

        alert(`Your checkout total is ${total}`)
    })
})