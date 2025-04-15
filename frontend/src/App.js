import React, { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import './App.css';  // Import the CSS file

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [shippingDate, setShippingDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newOrder = { status, shippingDate };

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      const data = await response.json();
      console.log("Order Created:", data);
      setOrders([...orders, data]); // Add the newly created order to the list
      setStatus("");
      setShippingDate("");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        📦 Order Tracking System
      </h1>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : orders.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>No orders found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Shipping Date:</strong> {order.shippingDate}
              </p>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Create New Order</h2>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <label style={{ fontSize: "18px", marginRight: "10px" }}>
          Status:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              margin: "10px 0",
            }}
          />
        </label>
        <br />
        <label style={{ fontSize: "18px", marginRight: "10px" }}>
          Shipping Date:
          <input
            type="date"
            value={shippingDate}
            onChange={(e) => setShippingDate(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              margin: "10px 0",
            }}
          />
        </label>
        <br />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4fa94d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Create Order
        </button>
      </form>
    </div>
  );
}

export default App;