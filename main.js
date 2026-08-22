let category = "All";


function getCart() {

    return JSON.parse(
        localStorage.getItem("shopkart_cart") || "[]"
    );

}


function getWish() {

    return JSON.parse(
        localStorage.getItem("shopkart_wish") || "[]"
    );

}


function saveCart(cart) {

    localStorage.setItem(
        "shopkart_cart",
        JSON.stringify(cart)
    );

}


function saveWish(wish) {

    localStorage.setItem(
        "shopkart_wish",
        JSON.stringify(wish)
    );

}


function updateCounts() {

    let cart = getCart();

    let wish = getWish();


    document
        .querySelectorAll("#cartCount")
        .forEach(element => {

            element.textContent =
                cart.reduce(
                    (total, item) =>
                        total + item.qty,
                    0
                );

        });


    document
        .querySelectorAll("#wishCount")
        .forEach(element => {

            element.textContent =
                wish.length;

        });

}


function card(product) {

    let wishlist =
        getWish().includes(product.id);


    return `

    <div class="product-card">

        <button
            class="heart"
            onclick="toggleWish(${product.id})">

            ${wishlist ? "❤️" : "🤍"}

        </button>


        <div class="product-img">

            ${product.icon}

        </div>


        <div class="card-body">

            <span class="cat">
                ${product.cat}
            </span>


            <h3>
                ${product.name}
            </h3>


            <p class="rating">
                ⭐ ${product.rating}
            </p>


            <div>

                <b class="price">
                    ₹${product.price}
                </b>

                <del>
                    ₹${product.old}
                </del>

            </div>


            <div class="card-actions">

                <button
                    onclick="
                    location.href=
                    'product-details.html?id=${product.id}'
                    ">

                    View

                </button>


                <button
                    class="add"
                    onclick="
                    addCart(${product.id})
                    ">

                    Add to Cart

                </button>

            </div>

        </div>

    </div>

    `;

}


function renderProducts() {

    let input =
        document.getElementById(
            "searchInput"
        );


    let search =
        input ?
        input.value.toLowerCase() :
        "";


    let result =
        products.filter(product => {

            return (

                (
                    category === "All" ||
                    product.cat === category
                )

                &&

                product.name
                    .toLowerCase()
                    .includes(search)

            );

        });


    let sort =
        document.getElementById(
            "sortSelect"
        )?.value;


    if (sort === "low") {

        result.sort(
            (a,b) =>
                a.price - b.price
        );

    }


    if (sort === "high") {

        result.sort(
            (a,b) =>
                b.price - a.price
        );

    }


    if (sort === "rating") {

        result.sort(
            (a,b) =>
                b.rating - a.rating
        );

    }


    let grid =
        document.getElementById(
            "productGrid"
        );


    if (!grid) return;


    grid.innerHTML =
        result.length

        ?

        result.map(card).join("")

        :

        `
        <div class="empty">
            <h2>No products found.</h2>
        </div>
        `;


    updateCounts();

}


function filterProducts() {

    renderProducts();

}


function setCategory(
    selectedCategory,
    button
) {

    category =
        selectedCategory;


    document
        .querySelectorAll(
            ".filters button"
        )
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    button.classList.add(
        "active"
    );


    renderProducts();

}


function goCategory(categoryName) {

    location.href =
        "products.html?category=" +
        encodeURIComponent(
            categoryName
        );

}


function addCart(id) {

    let cart =
        getCart();


    let product =
        cart.find(
            item =>
                item.id === id
        );


    if (product) {

        product.qty++;

    }

    else {

        cart.push({

            id: id,

            qty: 1

        });

    }


    saveCart(cart);

    updateCounts();


    alert(
        "Product added to cart!"
    );

}


function toggleWish(id) {

    let wish =
        getWish();


    let index =
        wish.indexOf(id);


    if (index >= 0) {

        wish.splice(
            index,
            1
        );

    }

    else {

        wish.push(id);

    }


    saveWish(wish);

    updateCounts();


    if (
        document.getElementById(
            "productGrid"
        )
    ) {

        renderProducts();

    }


    if (
        document.getElementById(
            "wishlistContent"
        )
    ) {

        renderWishlist();

    }

}


function renderFeatured() {

    let element =
        document.getElementById(
            "featuredProducts"
        );


    if (!element) return;


    element.innerHTML =
        products
            .slice(0,4)
            .map(card)
            .join("");

}


function renderDetails() {

    let id =
        Number(
            new URLSearchParams(
                location.search
            ).get("id")
        );


    let product =
        products.find(
            item =>
                item.id === id
        );


    let element =
        document.getElementById(
            "details"
        );


    if (!product) {

        element.innerHTML =
            "<h2>Product not found</h2>";

        return;

    }


    element.innerHTML = `

    <div class="detail">

        <div class="detail-img">

            ${product.icon}

        </div>


        <div>

            <span class="cat">
                ${product.cat}
            </span>


            <h1>
                ${product.name}
            </h1>


            <p class="rating">
                ⭐ ${product.rating} / 5
            </p>


            <p>
                ${product.desc}
            </p>


            <h2 class="price">
                ₹${product.price}
            </h2>


            <del>
                ₹${product.old}
            </del>


            <p class="stock">
                ✓ In Stock
            </p>


            <button
                class="btn"
                onclick="
                addCart(${product.id})
                ">

                Add to Cart

            </button>


            <button
                class="btn secondary"
                onclick="
                toggleWish(${product.id})
                ">

                ❤️ Wishlist

            </button>

        </div>

    </div>

    `;


    updateCounts();

}


function renderCart() {

    let element =
        document.getElementById(
            "cartContent"
        );


    let cart =
        getCart();


    if (!cart.length) {

        element.innerHTML = `

        <div class="empty">

            <h2>
                Your cart is empty 🛒
            </h2>

            <a
                class="btn"
                href="products.html">

                Shop Products

            </a>

        </div>

        `;

        updateCounts();

        return;

    }


    let total = 0;


    let items =
        cart.map(item => {

            let product =
                products.find(
                    p =>
                        p.id === item.id
                );


            let subtotal =
                product.price *
                item.qty;


            total += subtotal;


            return `

            <div class="cart-item">

                <div class="cart-icon">
                    ${product.icon}
                </div>


                <div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ₹${product.price}
                    </p>

                </div>


                <div class="qty">

                    <button
                        onclick="
                        changeQty(
                            ${product.id},
                            -1
                        )
                        ">

                        −

                    </button>


                    ${item.qty}


                    <button
                        onclick="
                        changeQty(
                            ${product.id},
                            1
                        )
                        ">

                        +

                    </button>

                </div>


                <b>
                    ₹${subtotal}
                </b>


                <button
                    onclick="
                    removeCart(
                        ${product.id}
                    )
                    ">

                    🗑️

                </button>

            </div>

            `;

        });


    let delivery =
        total >= 999 ?
        0 :
        49;


    let discount =
        total >= 2999 ?
        300 :
        0;


    let finalTotal =
        total +
        delivery -
        discount;


    element.innerHTML = `

    <div class="cart-list">

        ${items.join("")}

    </div>


    <div class="summary">

        <h2>
            Order Summary
        </h2>


        <p>
            Subtotal:
            <b>₹${total}</b>
        </p>


        <p>
            Delivery:
            <b>
                ${delivery === 0 ?
                "FREE" :
                "₹49"}
            </b>
        </p>


        <p>
            Discount:
            <b>
                -₹${discount}
            </b>
        </p>


        <hr>


        <h2>
            Total:
            ₹${finalTotal}
        </h2>


        <a
            class="btn"
            href="checkout.html">

            Proceed to Checkout

        </a>

    </div>

    `;


    updateCounts();

}


function changeQty(id, amount) {

    let cart =
        getCart();


    let product =
        cart.find(
            item =>
                item.id === id
        );


    if (!product) return;


    product.qty += amount;


    if (product.qty <= 0) {

        cart =
            cart.filter(
                item =>
                    item.id !== id
            );

    }


    saveCart(cart);

    renderCart();

}


function removeCart(id) {

    let cart =
        getCart();


    cart =
        cart.filter(
            item =>
                item.id !== id
        );


    saveCart(cart);

    renderCart();

}


function renderWishlist() {

    let element =
        document.getElementById(
            "wishlistContent"
        );


    let wish =
        getWish();


    let items =
        products.filter(
            product =>
                wish.includes(
                    product.id
                )
        );


    if (!items.length) {

        element.innerHTML = `

        <div class="empty">

            <h2>
                No wishlist items ❤️
            </h2>

            <a
                class="btn"
                href="products.html">

                Browse Products

            </a>

        </div>

        `;

    }

    else {

        element.innerHTML =
            items.map(card).join("");

    }


    updateCounts();

}


function renderCheckout() {

    let cart =
        getCart();


    let summary =
        document.getElementById(
            "checkoutSummary"
        );


    let total = 0;


    summary.innerHTML =
        "<h2>Order Summary</h2>";


    cart.forEach(item => {

        let product =
            products.find(
                p =>
                    p.id === item.id
            );


        let subtotal =
            product.price *
            item.qty;


        total += subtotal;


        summary.innerHTML += `

        <p>

            ${product.name}
            × ${item.qty}

            <b>
                ₹${subtotal}
            </b>

        </p>

        `;

    });


    let delivery =
        total < 999 ?
        49 :
        0;


    let discount =
        total >= 2999 ?
        300 :
        0;


    let final =
        total +
        delivery -
        discount;


    summary.innerHTML += `

    <hr>

    <h2>
        Total: ₹${final}
    </h2>

    `;


    document
        .getElementById(
            "checkoutForm"
        )
        .onsubmit =
        function(event) {

            event.preventDefault();


            localStorage.removeItem(
                "shopkart_cart"
            );


            location.href =
                "order-success.html";

        };

}


function searchProducts() {

    let input =
        document.getElementById(
            "searchInput"
        );


    let value =
        input.value.trim();


    location.href =
        "products.html" +
        (
            value
            ?
            "?search=" +
            encodeURIComponent(value)
            :
            ""
        );

}


function loginUser(event) {

    event.preventDefault();


    alert(
        "Login successful!"
    );


    location.href =
        "index.html";

}


function registerUser(event) {

    event.preventDefault();


    alert(
        "Account created successfully!"
    );


    location.href =
        "login.html";

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderFeatured();

        updateCounts();


        let params =
            new URLSearchParams(
                location.search
            );


        if (
            params.get("category")
        ) {

            category =
                params.get(
                    "category"
                );

        }


        let search =
            params.get(
                "search"
            );


        let input =
            document.getElementById(
                "searchInput"
            );


        if (
            input &&
            search
        ) {

            input.value =
                search;

        }


        if (
            document.getElementById(
                "productGrid"
            )
        ) {

            renderProducts();

        }

    }
);