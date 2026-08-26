import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({
  cart,
  clearCart
}) {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [payment, setPayment] =
    useState("Cash on Delivery");


  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price * item.quantity,
      0
    );


  const delivery =
    subtotal >= 999
      ? 0
      : 49;


  const discount =
    subtotal >= 2999
      ? 300
      : 0;


  const total =
    subtotal +
    delivery -
    discount;


  function placeOrder(e) {

    e.preventDefault();

    if (!cart.length) {

      alert(
        "Your cart is empty."
      );

      return;
    }


    localStorage.setItem(
      "shopkart_order",
      JSON.stringify({
        name,
        address,
        phone,
        payment,
        total
      })
    );


    clearCart();

    navigate("/success");
  }


  return (
    <section className="checkout">

      <h1>
        Checkout
      </h1>


      <div className="checkout-layout">

        <form
          className="checkout-form"
          onSubmit={placeOrder}
        >

          <h2>
            Delivery Information
          </h2>


          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e =>
              setName(e.target.value)
            }
            required
          />


          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={e =>
              setPhone(e.target.value)
            }
            required
          />


          <textarea
            placeholder="Full Address"
            value={address}
            onChange={e =>
              setAddress(e.target.value)
            }
            required
          />


          <h2>
            Payment Method
          </h2>


          <select
            value={payment}
            onChange={e =>
              setPayment(e.target.value)
            }
          >

            <option>
              Cash on Delivery
            </option>

            <option>
              UPI
            </option>

            <option>
              Credit/Debit Card
            </option>

          </select>


          <button className="hero-btn">
            Place Order
          </button>

        </form>


        <div className="summary">

          <h2>
            Order Total
          </h2>

          <p>
            Subtotal
            <strong>
              ₹{subtotal}
            </strong>
          </p>

          <p>
            Delivery
            <strong>
              {delivery === 0
                ? "FREE"
                : `₹${delivery}`}
            </strong>
          </p>

          <p>
            Discount
            <strong>
              -₹{discount}
            </strong>
          </p>

          <hr />

          <h2>
            Total
            <strong>
              ₹{total}
            </strong>
          </h2>

        </div>

      </div>

    </section>
  );
}

export default Checkout;
