import { RootState } from "@/store/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export type OrderType = {
  items: [
    {
      id: number;
      customerId: number;
      totalPrice: number;
      status: string;
      createdAt: string;
      items: [
        {
          id: number;
          orderId: number;
          productId: number;
          quantity: number;
          price: number;
          product: {
            id: number;
            name: string;
            description: string;
            price: number;
            stock: number;
            categoryId: number;
            createdAt: string;
            imageUrl: string;
          };
        }
      ];
    }
  ];
};
function MyOrders() {
  const [orders, setOrders] = useState<OrderType>();

  const token = useSelector((state: RootState) => state.auth.accessToken);
  useEffect(() => {
    axios
      .get(
        "https://nt.softly.uz/api/front/orders?limit=10&page=1&order=ASC&status=pending&customerId=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [token]);

  if (!orders) {
    return (
      <div className="cssload-container">
        <ul className="cssload-flex-container">
          <li>
            <span className="cssload-loading cssload-one"></span>
            <span className="cssload-loading cssload-two"></span>
            <span className="cssload-loading-center"></span>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {orders?.items.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 w-72 rounded-2xl shadow-md p-5 bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold">Order ID: {order.id}</h3>
              <p className="text-green-600 font-semibold text-md">
                {order.items
                  .reduce((total, i) => total + i.price * i.quantity, 0)
                  .toLocaleString("ru")}{" "}
                So`m
              </p>
            </div>
            <p className="mb-1">
              Status:{" "}
              <span
                className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                  order.status === "pending" ? "bg-yellow-500" : "bg-green-600"
                }`}
              >
                {order.status}
              </span>
            </p>
            <div className="space-y-2 mt-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border border-gray-200 rounded-xl p-3 bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    {item.product.price.toLocaleString("ru")} So`m
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
