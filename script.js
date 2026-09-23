/* =========================================
   CART DATA
========================================= */

let cart = [];


/* =========================================
   FORMAT RUPIAH
========================================= */

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(name, price, image) {

    const existingProduct = cart.find(
        item => item.name === name
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");


    let totalQuantity = 0;

    let totalPrice = 0;


    cart.forEach(item => {

        totalQuantity += item.quantity;

        totalPrice += item.price * item.quantity;

    });


    cartCount.textContent = totalQuantity;

    cartTotal.textContent = formatRupiah(totalPrice);


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Keranjang masih kosong 🍵
            </p>
        `;

        return;

    }


    cartItems.innerHTML = cart.map((item, index) => {

        return `

            <div class="cart-item">

                <img 
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-item-images"
                >

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <div class="cart-item-price">
                        ${formatRupiah(item.price)}
                    </div>

                    <div class="quantity">

                        <button
                            onclick="decreaseQuantity(${index})"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${index})"
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>

        `;

    }).join("");

}


/* =========================================
   INCREASE
========================================= */

function increaseQuantity(index) {

    cart[index].quantity += 1;

    updateCart();

}


/* =========================================
   DECREASE
========================================= */

function decreaseQuantity(index) {

    cart[index].quantity -= 1;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    document
        .getElementById("cart-sidebar")
        .classList.add("active");


    document
        .getElementById("cart-overlay")
        .classList.add("active");

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    document
        .getElementById("cart-sidebar")
        .classList.remove("active");


    document
        .getElementById("cart-overlay")
        .classList.remove("active");

}


/* =========================================
   CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Keranjang kamu masih kosong 🍵"
        );

        return;

    }


    let message = "Halo Matchea! Saya ingin memesan:%0A%0A";


    cart.forEach(item => {

        message +=
            `• ${item.name} x${item.quantity} - ${formatRupiah(item.price * item.quantity)}%0A`;

    });


    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    message +=
        `%0ATotal: ${formatRupiah(total)}`;


    /*
        GANTI NOMOR DI BAWAH
        DENGAN NOMOR WHATSAPP CAFE
    */

    const phoneNumber = "62895424652090";


    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}