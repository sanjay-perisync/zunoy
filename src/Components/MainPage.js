import React from 'react';
import Navbar from './Navbar';
import Allappsgrid from './Allappsgrid';
import Banner from './Banner';
import Mainpagefooter from './Mainpagefooter';


function MainPage() {
 
  return (
    <div className=''>

    <header className='top-0 left-0 sticky z-10 bg-white'>
    <Navbar/>
    </header>
    <section>
    <Allappsgrid/>
    </section>
      <section>
      <Banner/>
      </section>

      <footer>
      <Mainpagefooter/>
      </footer>
     
    </div>
  )
}

export default MainPage;