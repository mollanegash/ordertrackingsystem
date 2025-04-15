import React, { useState } from 'react';

function OrderForm() {
  const [status, setStatus] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To manage error state
  const [success, setSuccess] = useState(false); // To manage success message

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple validation: ensure both fields are filled out
    if (!status || !shippingDate) {
      alert('Please fill in both status and shipping date!');
      return;
    }

    const newOrder = { status, shippingDate };

    setLoading(true); // Set loading state to true while making the request
    setError(null); // Reset error state

    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order Created:', data);
        setSuccess(true); // Set success message
        setStatus(''); // Clear status input after successful creation
        setShippingDate(''); // Clear shipping date input after successful creation
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      setError('Error creating order: ' + error.message); // Set error message
      console.error('Error creating order:', error);
    } finally {
      setLoading(false); // Set loading state back to false once request completes
    }
  };

  return (
    <div>
      <h2>Create New Order</h2>
      {success && <p style={{ color: 'green' }}>Order created successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Status:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </label>
        <br />
        <label>
          Shipping Date:
          <input
            type="date"
            value={shippingDate}
            onChange={(e) => setShippingDate(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Order...' : 'Create Order'}
        </button>
      </form>
    </div>
  );
}

export default OrderForm;