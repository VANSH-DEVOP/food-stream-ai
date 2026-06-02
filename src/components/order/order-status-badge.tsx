
interface OrderStatusBadgeProps {
  status:
    | "Pending"
    | "Preparing"
    | "Out For Delivery"
    | "Delivered";
}

export default function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const styles = {
    Pending:
      "bg-yellow-500/20 text-yellow-400",

    Preparing:
      "bg-blue-500/20 text-blue-400",

    "Out For Delivery":
      "bg-purple-500/20 text-purple-400",

    Delivered:
      "bg-green-500/20 text-green-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}