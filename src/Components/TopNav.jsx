import React from 'react';
import { useState, useEffect } from 'react';
import UAuth from '@uauth/js';

export const TopNav = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();
  const [walletAddress, setWalletAddress] = useState();


  useEffect(() => {
    // uauth();
    return () => {};
  }, [isLogin]);

  const uauth = new UAuth({
    clientID: 'ba816047-d507-4f7d-a8ac-e801f309bc21',
    redirectUri: 'http://localhost:3000',
    scope: 'openid wallet',
  });
  

  const loginHandler = async () => {
    try {
      await uauth.loginWithPopup().then(() => uauth.user().then(setUser));
      setIsLogin(true)
      setWalletAddress(user.wallet_address);
    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = async () => {
    await uauth.logout();
    console.log('Logged out with Unstoppable');
    setIsLogin(false);
  };

  return (
    <>
      <nav
        style={{ background: '#000' }}
        className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full"
      >
        <div className="mb-2 sm:mb-0">
          <a
            href="/home"
            className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
          >
            <img src="logo.png" width={'100'} />
          </a>
        </div>
        <div style={{ margin: 'auto 0' }}>
          {!isLogin ? (
             <button
            type="button"
            className="nft-gradient bg-blue-400 text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white"
            onClick={loginHandler}
          >
            Login with Unstoppable
          </button>
           ) : (
         
          <button
            type="button"
            className="nft-gradient bg-blue-400 text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white"
            onClick={logoutHandler}
          >
            Logout
          </button>
)}
        </div>
      </nav>
    </>
  );
};
