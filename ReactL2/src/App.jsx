import React from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card'
import Cards from './components/Cards'
function App() {

  const cards = [
    {
      id: 1,
      title: 'Card One',
      desc: 'This is the first card.',
      img: 'https://www.lpu.in/lpu-assets/images/home-page/highlights/modi.webp',
    },
    {
      id: 2,
      title: 'Card Two',
      desc: 'This is the second card.',
      img: 'https://www.lpu.in/lpu-assets/images/admissions/joinus3.jpg',
    },
    {
      id: 3,
      title: 'Card Three',
      desc: 'This is the third card.',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpysrCd0yPb25BW6FtZ2YgULfWqnJM6fUb7A&s',
    },
    {
      id: 4,
      title: 'Card Four',
      desc: 'This is the fourth card.',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb32q-v2EaXOJ4k92gyMCl2g1m-9__lIhY5Q&s',
    }
  ];
  return (
    <>

      <Navbar />

      <Cards props={cards} />
      <div>
      </div>
    </>
  )
}

export default App