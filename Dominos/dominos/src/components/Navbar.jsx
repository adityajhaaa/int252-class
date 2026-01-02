import React from 'react'

function Navbar() {
  return (
    <nav >
      <div className="container mx-auto flex justify-between items-center">
        <img src="https://www.dominos.co.in/assets/Logo@2x.png" alt="Logo"/>
        <div>
          <a href="#" className="mx-2 text-blue-300">OUR MENU</a>
          <a href="#" className="mx-2 text-blue-300"> DOMINO'S STORES</a>
          <a href="#" className="mx-2 text-blue-300">GIFT CARD</a>
          <a href="#" className="mx-2 text-blue-300">CORPORATE ENQUIRY</a>
          <a href="#" className="mx-2 text-blue-300">CONTACT</a>
          <button className="bg-red-500 text-white px-4 py-2 rounded ml-4"> Download App</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar