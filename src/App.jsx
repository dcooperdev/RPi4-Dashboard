import StatusBar from './components/StatusBar/StatusBar'
import MarketSummary from './components/MarketSummary/MarketSummary'
import ActiveBots from './components/ActiveBots/ActiveBots'
import Transactions from './components/Transactions/Transactions'
import './App.css'

function App() {

  return (
    <>
      <StatusBar />
      <MarketSummary />
      <ActiveBots />
      <Transactions />
    </>
  )
}

export default App
