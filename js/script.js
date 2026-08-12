
const foods = {

    1: {
        name: "Vada Pav",
        price: 230,
        image: "images/vada-pav.jpg"
    },

    2: {
        name: "Dahi Bhalle",
        price: 280,
        image: "images/dahi bhalle.avif"
    },

    3: {
        name: "Suji Balls",
        price: 300,
        image: "images/suji balls.jpg"
    }

};

/*
    Cart example:

    [
        {
            id: 1,
            quantity: 2
        }
    ]
*/

let cart = JSON.parse(
    localStorage.getItem("manusKitchenCart")
) || [];


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "manusKitchenCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {

    const existingItem = cart.find(
        item => item.id === id
    );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }


    saveCart();

    updateCart();


    /*
        Automatically open cart
        after adding food.
    */

    openCart();


    alert(
        foods[id].name +
        " has been added to your cart!"
    );

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    if (!cartItems) return;


    /*
        Empty cart
    */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>
                Your cart is empty.
            </p>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "0";

        return;

    }


    let total = 0;

    let totalQuantity = 0;


    cartItems.innerHTML = "";


    /*
        Display every cart item
    */

    cart.forEach(item => {

        const food = foods[item.id];

        const itemTotal =
            food.price * item.quantity;


        total += itemTotal;

        totalQuantity += item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <strong>
                    ${food.name}
                </strong>

                <br>

                ₹${food.price}
                ×
                ${item.quantity}

            </div>


            <div class="quantity">

                <button
                    onclick="decreaseQuantity(${item.id})"
                >
                    −
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    onclick="increaseQuantity(${item.id})"
                >
                    +
                </button>


                <br>


                <button
                    class="remove-button"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    /*
        Update cart number
    */

    cartCount.textContent =
        totalQuantity;


    /*
        Update total price
    */

    cartTotal.textContent =
        total;


    /*
        Update checkout total
    */

    const checkoutTotal =
        document.getElementById(
            "checkout-total"
        );


    if (checkoutTotal) {

        checkoutTotal.textContent =
            total;

    }

}


/* =====================================================
   INCREASE QUANTITY
===================================================== */

function increaseQuantity(id) {

    const item = cart.find(
        item => item.id === id
    );


    if (item) {

        item.quantity++;

    }


    saveCart();

    updateCart();

}


/* =====================================================
   DECREASE QUANTITY
===================================================== */

function decreaseQuantity(id) {

    const item = cart.find(
        item => item.id === id
    );


    if (!item) return;


    item.quantity--;


    /*
        If quantity becomes 0,
        remove the product.
    */

    if (item.quantity <= 0) {

        cart = cart.filter(
            cartItem => cartItem.id !== id
        );

    }


    saveCart();

    updateCart();

}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );


    saveCart();

    updateCart();

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    const cartBox =
        document.getElementById("cart-box");


    if (cartBox) {

        cartBox.classList.add("active");

    }

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    const cartBox =
        document.getElementById("cart-box");


    if (cartBox) {

        cartBox.classList.remove("active");

    }

}


/* =====================================================
   CHECKOUT
===================================================== */

function openCheckout() {

    /*
        Don't allow checkout
        with empty cart.
    */

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add some food first."
        );

        return;

    }


    /*
        Calculate total again
    */

    updateCart();


    const checkoutBox =
        document.getElementById(
            "checkout-box"
        );


    checkoutBox.classList.add(
        "active"
    );


    /*
        Close shopping cart
    */

    closeCart();

}


/* =====================================================
   CLOSE CHECKOUT
===================================================== */

function closeCheckout() {

    const checkoutBox =
        document.getElementById(
            "checkout-box"
        );


    checkoutBox.classList.remove(
        "active"
    );

}


/* =====================================================
   SEARCH FOOD
===================================================== */

function searchFood() {

    const searchInput =
        document.getElementById("search");


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const foodCards =
        document.querySelectorAll(
            ".food-card"
        );


    foodCards.forEach(card => {

        const foodName =
            card.dataset.name
                .toLowerCase();


        if (
            foodName.includes(
                searchText
            )
        ) {

            card.style.display =
                "block";

        } else {

            card.style.display =
                "none";

        }

    });

}


/* =====================================================
   FILTER FOOD BY CATEGORY
===================================================== */

function filterFood(category) {

    const foodCards =
        document.querySelectorAll(
            ".food-card"
        );


    foodCards.forEach(card => {

        const foodCategory =
            card.dataset.category;


        if (
            category === "all" ||
            foodCategory === category
        ) {

            card.style.display =
                "block";

        } else {

            card.style.display =
                "none";

        }

    });


    /*
        Clear search when
        category is selected.
    */

    const search =
        document.getElementById(
            "search"
        );


    if (search) {

        search.value = "";

    }

}


/* =====================================================
   GET USER LOCATION
===================================================== */

function getLocation() {

    const locationText =
        document.getElementById(
            "location-text"
        );


    /*
        Check browser support
    */

    if (
        !navigator.geolocation
    ) {

        locationText.innerHTML = `
            ❌ Geolocation is not supported
            by your browser.
        `;

        return;

    }


    locationText.innerHTML = `
        📍 Getting your location...
    `;


    /*
        Get current location
    */

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            /*
                Display coordinates
            */

            locationText.innerHTML = `

                📍
                <strong>
                    Your Location
                </strong>

                <br><br>

                Latitude:
                ${latitude.toFixed(6)}

                <br>

                Longitude:
                ${longitude.toFixed(6)}

                <br><br>

                <a
                    href="https://www.google.com/maps?q=${latitude},${longitude}"
                    target="_blank"
                >
                    🗺️ Open Location in Google Maps
                </a>

            `;

        },


        function(error) {

            let message =
                "Unable to get your location.";


            switch (error.code) {

                case error.PERMISSION_DENIED:

                    message =
                        "❌ Location permission was denied.";

                    break;


                case error.POSITION_UNAVAILABLE:

                    message =
                        "❌ Location information is unavailable.";

                    break;


                case error.TIMEOUT:

                    message =
                        "❌ Location request timed out.";

                    break;

            }


            locationText.innerHTML =
                message;

        }

    );

}


/* =====================================================
   CALCULATE CART TOTAL
===================================================== */

function calculateTotal() {

    let total = 0;


    cart.forEach(item => {

        const food =
            foods[item.id];


        total +=
            food.price *
            item.quantity;

    });


    return total;

}


/* =====================================================
   PLACE ORDER
===================================================== */

function placeOrder() {

    /*
        Check cart
    */

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    /*
        Get customer information
    */

    const name =
        document.getElementById(
            "customer-name"
        ).value.trim();


    const phone =
        document.getElementById(
            "customer-phone"
        ).value.trim();


    const address =
        document.getElementById(
            "customer-address"
        ).value.trim();


    /*
        Validate customer name
    */

    if (name === "") {

        alert(
            "Please enter your name."
        );

        return;

    }


    /*
        Validate phone
    */

    if (phone === "") {

        alert(
            "Please enter your phone number."
        );

        return;

    }


    /*
        Validate phone length
    */

    if (
        phone.length < 10
    ) {

        alert(
            "Please enter a valid phone number."
        );

        return;

    }


    /*
        Validate address
    */

    if (address === "") {

        alert(
            "Please enter your delivery address."
        );

        return;

    }


    /*
        Get payment method
    */

    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    /*
        Calculate total
    */

    const total =
        calculateTotal();


    /*
        Generate order ID
    */

    const orderId =
        "MK" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    /*
        Save order
    */

    const order = {

        orderId: orderId,

        customerName: name,

        phone: phone,

        address: address,

        payment: payment,

        total: total,

        items: cart,

        status:
            "Order Confirmed",

        date:
            new Date().toLocaleString()

    };


    localStorage.setItem(
        "manusKitchenOrder",
        JSON.stringify(order)
    );


    /*
        If online payment selected
    */

    if (
        payment === "ONLINE"
    ) {

        alert(
            "Online payment gateway is selected.\n\n" +
            "For a real website, you would connect Razorpay, Stripe, PayU, etc."
        );

    }


    /*
        Order confirmation
    */

    alert(

        "🎉 Order Placed Successfully!\n\n" +

        "Order ID: " +
        orderId +

        "\nCustomer: " +
        name +

        "\nTotal: ₹" +
        total +

        "\nPayment: " +
        (
            payment === "COD"
                ? "Cash on Delivery"
                : "Online Payment"
        )

    );


    /*
        Clear cart
    */

    cart = [];


    saveCart();

    updateCart();


    /*
        Close checkout
    */

    closeCheckout();


    /*
        Start order tracking
    */

    startOrderTracking();


    /*
        Scroll to tracking section
    */

    document
        .getElementById("tracking")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   ORDER TRACKING
===================================================== */

function startOrderTracking() {

    /*
        Reset all steps
    */

    document.getElementById(
        "step1"
    ).textContent = "⬜";


    document.getElementById(
        "step2"
    ).textContent = "⬜";


    document.getElementById(
        "step3"
    ).textContent = "⬜";


    document.getElementById(
        "step4"
    ).textContent = "⬜";


    const status =
        document.getElementById(
            "order-status"
        );


    status.textContent =
        "Order Confirmed";


    /*
        Step 1
    */

    document.getElementById(
        "step1"
    ).textContent = "✅";


    /*
        After 5 seconds:
        Preparing
    */

    setTimeout(function() {

        document.getElementById(
            "step2"
        ).textContent = "✅";


        status.textContent =
            "👨‍🍳 Your food is being prepared.";

    }, 5000);


    /*
        After 10 seconds:
        Out for delivery
    */

    setTimeout(function() {

        document.getElementById(
            "step3"
        ).textContent = "✅";


        status.textContent =
            "🛵 Your order is out for delivery.";

    }, 10000);


    /*
        After 15 seconds:
        Delivered
    */

    setTimeout(function() {

        document.getElementById(
            "step4"
        ).textContent = "✅";


        status.textContent =
            "🎉 Your order has been delivered!";

    }, 15000);

}


/* =====================================================
   LOAD PREVIOUS ORDER
===================================================== */

function loadPreviousOrder() {

    const savedOrder =
        localStorage.getItem(
            "manusKitchenOrder"
        );


    if (!savedOrder) {

        return;

    }


    const order =
        JSON.parse(savedOrder);


    /*
        Display previous status
    */

    const status =
        document.getElementById(
            "order-status"
        );


    if (status) {

        status.textContent =
            "Previous Order: " +
            order.orderId +
            " - " +
            order.status;

    }

}


/* =====================================================
   CLOSE CHECKOUT WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const checkout =
            document.getElementById(
                "checkout-box"
            );


        if (
            event.target === checkout
        ) {

            closeCheckout();

        }

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeCart();

            closeCheckout();

        }

    }
);
document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
            Load cart from localStorage
        */

        updateCart();


        /*
            Load previous order
        */

        loadPreviousOrder();

    }
);
