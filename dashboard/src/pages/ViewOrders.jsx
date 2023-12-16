import React, { useEffect, useState } from "react";
import "./vieworders.css";
import baseUrl from "../constants/baseUrl";

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const request = await fetch(`${baseUrl}/api/v1/order`);
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

    let request = await fetch(`${baseUrl}/api/v1/order/${order.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: order.selectedState,
      }),
    });
    let response = await request.json();
    console.log(response);
    request = await fetch(`${baseUrl}/api/v1/order`);
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
              Current state:{" "}
              {order.orderStatus === "delivered" ? (
                <strong style={{ color: "green" }}>{order.orderStatus}</strong>
              ) : order.orderStatus === "on the way" ? (
                <strong style={{ color: "grey" }}>{order.orderStatus}</strong>
              ) : (
                <strong style={{ color: "red" }}>{order.orderStatus}</strong>
              )}
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
