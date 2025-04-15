import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("http://localhost:8080/api/orders")
    .then((res) => {
      console.log("Raw response:", res); // 🟢 Log the response
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Fetched orders:", data); // 🟢 Log data
      setOrders(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching orders:", error); // 🟠 Catch and show error
      setLoading(false);
    });
}, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📦 Order Tracking System</h1>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Order ID:</strong> {order.id} <br />
              <strong>Status:</strong> {order.status} <br />
              <strong>Shipping Date:</strong> {order.shippingDate}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;