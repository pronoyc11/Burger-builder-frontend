const Order = ({ order }) => {
  const ingredientDetail = order.ingredients.map((item) => {
    return (
      <span
        style={{
          border: "1px solid grey",
          borderRadius: "5px",
          padding: "5px",
          marginRight: "5px",
        }}
        key={item.type}
      >
        {item.amount}×
        <span style={{ textTransform: "capitalize" }}>{item.type}</span>
      </span>
    );
  });

  return (
    <div
      style={{
        border: "1px solid grey",
        borderRadius: "5px",
        padding: "20px",
        marginBottom: "10px",
      }}
    >
      <p>Order id:{order._id}</p>
      <p>Delivery adress:{order.customer.deliveryAdress}</p>
      <hr />
      {ingredientDetail}
      <hr />
      <div style={{display:"flex",gap:"1rem"}}>
        {" "}
        <p>Price:{order.price}</p>
        <p>orderStatus :{order.orderStatus}</p>
        <p>payment :{order.payment}</p>
      </div>
    </div>
  );
};

export default Order;
