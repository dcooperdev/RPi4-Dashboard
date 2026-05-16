import useGenericStore from "../../store/useGenericStore";

const ActiveBots = () => {
    const bots = useGenericStore((state) => state.bots);
    const botsArray = Object.values(bots);

    return (
        <>
            <h2>Active Bots</h2>
            <div className="activeBots">
                {botsArray?.map((bot) => (
                    <div key={bot.id} className="bot-card">
                        <p className='cardTitle'>Name(ID): {bot.id}</p>
                        <p>Fitness Score: {bot.metrics?.fitnessScore ?? 0}</p>
                        <p>Success Rate: {bot.metrics?.successRate ?? 0}%</p>
                        <p>Total Trades: {bot.metrics?.totalTrades ?? 0}</p>
                        <p>Profit Factor: {bot.metrics?.profitFactor ?? 0}</p>
                        <p>Max Drawdown: {bot.metrics?.maxDrawdown ?? 0}%</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ActiveBots;
