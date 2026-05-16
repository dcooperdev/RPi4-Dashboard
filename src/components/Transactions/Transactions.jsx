import useGenericStore from "../../store/useGenericStore";

const Transactions = () => {
    const transactionsArray = useGenericStore((state) => state.history);

    return (
        <>
            <h2>Transactions</h2>
            <div className="transactionsTable">
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Side</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Timestamp</th>
                            <th>Final PnL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionsArray?.map((order) => (
                            <tr key={`${order.timestamp}-${order.symbol}`}>
                                <td>{order.symbol}</td>
                                <td>{order.side}</td>
                                <td>{order.type}</td>
                                <td>{order.status}</td>
                                <td>{order.price}</td>
                                <td>{order.amount}</td>
                                <td>{order.timestamp}</td>
                                <td>{order.finalPnl}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Transactions;
