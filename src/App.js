import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { TopNav } from './Components/TopNav';
import { DonationForm } from './Components/DonationForm';
import { CoffeesData } from './Components/CoffeesData';
import { BasicInfo } from './Components/BasicInfo';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        {/* <RainbowKitProvider chains={chains}> */}
        <TopNav />
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          <div className="row-span-3 sm:row-span-16">
            <DonationForm />
          </div>
          <div className="col-span-1">
            <BasicInfo />
          </div>
          <div className="row-span-2 col-span-1">
            <CoffeesData />
          </div>
        </div>
        {/* </RainbowKitProvider> */}
      </WagmiConfig>
    </>
  );
}

export default App;
