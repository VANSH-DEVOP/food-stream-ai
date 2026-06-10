import { useState } from "react";
import { Order, OrderStatus } from "@/types";
import { updateOrderStatus } from "@/services/order-service";

interface OrderManagementProps {
  orders: Order[];
}

export default function OrderManagement({
  orders,
}: OrderManagementProps) {

  const [
    orderSearch,
    setOrderSearch,
  ] = useState("");

  const filteredOrders =
    orders.filter(
      (order) =>
        order.id
          ?.toLowerCase()
          .includes(
            orderSearch.toLowerCase()
          )
    );

  return (
    <div className="mt-6 rounded-2xl bg-zinc-900 p-6">

      <div className="mb-4 flex items-center gap-4">

        <h2 className="text-2xl font-bold">
          Order Management
        </h2>

        <input
          aria-label="Search Orders"
          value={orderSearch}
          onChange={(e) =>
            setOrderSearch(
              e.target.value
            )
          }
          placeholder="Search orders..."
          className="flex-1 rounded-lg bg-zinc-800 px-4 py-2"
        />

      </div>

      <div className="max-h-[450px] space-y-4 overflow-y-auto food-scroll pr-2">

        {filteredOrders.map(
          (order) => (

            <div
              key={order.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
            >

              <div>

                <p className="font-semibold">
                  #{order.id?.slice(-6)}
                </p>

                <p className="text-sm text-zinc-400">
                  ₹{order.total}
                </p>

                <p className="text-xs text-green-400">
                  {order.paymentStatus}
                </p>

              </div>

              <select
                value={order.status}
                onChange={async (e) => {

                  await updateOrderStatus(
                    order.id!,
                    e.target.value as OrderStatus
                  );

                }}
                className="cursor-pointer rounded-lg bg-zinc-800 px-3 py-2 transition hover:bg-zinc-700"
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Preparing">
                  Preparing
                </option>

                <option value="Out For Delivery">
                  Out For Delivery
                </option>

                <option value="Delivered">
                  Delivered
                </option>

              </select>

            </div>

          )
        )}

      </div>

    </div>
  );
}