import { formatPrice } from "@/utils/formatPrice";
type StatusOrder = 'pending' | 'shipped' | 'delivered' | 'processing'
interface Order {
    _id:string;
    totalPrice:number;
    status: StatusOrder;
    user:{
        fullName:string;
        phone:string;
    }
}
interface Props {
    orders:Order[];
}

export default function LatestOrders({ orders }: Props) {
    const getStatusStyle = (status: StatusOrder) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 ";
            case "processing":
                return "bg-blue-100 text-blue-800";
            case "shipped":
                return "bg-purple-100 text-purple-800";
            case "delivered":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }
    const getStatusText = (status: StatusOrder) => {
        switch (status) {
            case "pending":
                return "در انتظار";
            case "processing":
                return "در حال پردازش";
            case "shipped":
                return "ارسال شده";
            case "delivered":
                return "تحویل داده شده";
            default:
                return status;
        }
    }
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-black text-xl text-blue-950 mb-5"> آخرین سفارش‌ها </h3>
            <div className="space-y-4">
                {
                    (!orders || orders.length === 0) ?
                        <p className="text-slate-400"> سفارشی وجود ندارد </p>
                        :
                        orders.map(order => (
                        <div key={order._id} className="flex items-center justify-between border-b pb-3 last:border-none">
                            <div className="flex flex-col gap-3">
                                <p className="font-bold text-blue-950">
                                    { order.user?.fullName || "کاربر" }
                                </p>
                                <p className="text-xs text-slate-400">
                                    { order.user?.phone }
                                </p>
                            </div>
                            <div className="text-left block">
                                <p className="font-bold text-blue-900 mb-3">{formatPrice(order.totalPrice)}</p>
                                <span className={`text-xs px-3 py-1 rounded-sm font-medium ${getStatusStyle(order.status)}`}>{getStatusText(order.status)}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}