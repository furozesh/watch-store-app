interface Order {
    _id:string;
    totalPrice:number;
    status:string;
    user:{
        fullName:string;
        phone:string;
    }
}
interface Props {
    orders:Order[];
}
export default function LatestOrders({ orders }: Props) {
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
                            <div>
                                <p className="font-bold text-blue-950">
                                    { order.user?.fullName || "کاربر" }
                                </p>
                                <p className="text-xs text-slate-400">
                                    { order.user?.phone }
                                </p>
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-blue-900"> {order.totalPrice.toLocaleString()} تومان </p>
                                <span className="text-xs bg-blue-50 text-blue-900 px-3 py-1 rounded-full"> {order.status} </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}