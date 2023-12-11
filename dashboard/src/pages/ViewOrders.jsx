import React, { useEffect, useState } from "react";

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const request = await fetch("http://localhost:3006/api/v1/order");
      const response = await request.json();
      setOrders(response.data);
      console.log(response.data);
    };
    getOrders();
  }, []);

  async function handleSubmit(event, order) {
    event.preventDefault();
    console.log("order.selectedState:", order.selectedState);

    if (!order.selectedState) {
      console.error("Selected state is not set");
      return;
    }

    let request = await fetch(
      `http://localhost:3006/api/v1/order/${order.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: order.selectedState,
        }),
      }
    );
    let response = await request.json();
    console.log(response);
    request = await fetch("http://localhost:3006/api/v1/order");
    response = await request.json();
    setOrders(response.data);
  }

  function handleChange(orderId, event) {
    const newState = { ...orders.find((order) => order.id === orderId) };
    newState.selectedState = event.target.value;
    setOrders((prevState) =>
      prevState.map((order) => (order.id === orderId ? newState : order))
    );
  }

  return (
    <div className="view-orders container">
      <h1>Orders</h1>
      {orders.map((order, index) => {
        return (
          <div key={index} className="order">
            <p>#{index + 1}</p>
            <p>Total cost: {order.totalPrice} AED</p>
            <p>ID: {order.id}</p>
            <p>Created at: {order.createdAt} AED</p>
            <p>
              Current state: <strong>{order.orderStatus}</strong>
            </p>
            <form onSubmit={(event) => handleSubmit(event, order)}>
              <select
                name="status"
                value={order.selectedState}
                onChange={(event) => handleChange(order.id, event)}
              >
                <option value={null}>--select a state--</option>
                <option value="processing">Processing</option>
                <option value="on the way">On the way</option>
                <option value="delivered">Delivered</option>
              </select>
              <button type="submit">Save</button>
            </form>
          </div>
        );
      })}
    </div>
  );
}
