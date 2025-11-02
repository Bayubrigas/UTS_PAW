import React from 'react'
import './home.css'

const home = () => {
  return (
    <div className='home'>
      <div className='hero'>
        <h1>Welcome to <br/> CryptoTracker</h1>
        <p>welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form>
          <input type="text" placeholder='Searc Crypto..' />
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className='crypto-table'>
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign: "center"}}>24h%</p>
          <p className='market-cap'>Market Cap</p>
        </div>
      </div>
    </div>
  )
}

export default home