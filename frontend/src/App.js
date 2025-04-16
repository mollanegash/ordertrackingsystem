import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';  // Import the updated CSS

function OrderForm() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [editOrderId, setEditOrderId] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch {
      toast.error('Failed to fetch orders');
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return fetchAllOrders();
    try {
      const res = await fetch(`http://localhost:8080/api/orders/search?status=${searchTerm}`);
      const data = await res.json();
      setOrders(data);
    } catch {
      toast.error('Search failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!status || !shippingDate) return toast.warn('All fields are required');

    const payload = { status, shippingDate };
    const url = editOrderId ? `http://localhost:8080/api/orders/${editOrderId}` : 'http://localhost:8080/api/orders';
    const method = editOrderId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      fetchAllOrders();
      setStatus('');
      setShippingDate('');
      setEditOrderId(null);
      toast.success(`Order ${editOrderId ? 'updated' : 'created'} successfully`);
    } catch {
      toast.error(`Failed to ${editOrderId ? 'update' : 'create'} order`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/orders/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setOrders(orders.filter(order => order.id !== id));
      toast.success('Order deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (order) => {
    setEditOrderId(order.id);
    setStatus(order.status);
    setShippingDate(order.shippingDate);
    window.scrollTo(0, 0);
  };

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
    const sorted = [...orders].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setOrders(sorted);
  };

  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="container">
      <ToastContainer />
      <h1>📦 Order Tracking System</h1>

      <div className="search-section">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by status..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <h2>{editOrderId ? 'Edit Order' : 'Create Order'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          type="date"
          value={shippingDate}
          onChange={(e) => setShippingDate(e.target.value)}
        />
        <button type="submit">{editOrderId ? 'Update' : 'Create'}</button>
      </form>

      <div className="sort-section">
        <label>Sort By:</label>
        <select onChange={(e) => handleSort(e.target.value)} value={sortField}>
          <option value="id">ID</option>
          <option value="status">Status</option>
          <option value="shippingDate">Shipping Date</option>
        </select>
        <button onClick={() => handleSort(sortField)}>{sortDirection === 'asc' ? 'Asc' : 'Desc'}</button>
      </div>

      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th onClick={() => handleSort('shippingDate')}>Shipping Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>{order.shippingDate}</td>
              <td>
                <button onClick={() => handleEdit(order)}>Edit</button>
                <button onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default OrderForm;