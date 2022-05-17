// Development Components
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

// Pages
import PageHome from "../pages/PageHome";
import PageAbout from "../pages/PageAbout";
import PageFavourites from "../pages/PageFavourites";
import PageIndividual from "../pages/PageIndividual";
import PageSearch from "../pages/PageSearch";

function AppRouter() {
  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<PageHome />} />
            <Route path='/about' element={<PageAbout />} />
            <Route path='/favourites' element={<PageFavourites />} />
            <Route path='/movie/:id' element={<PageIndividual />} />
            <Route path='/search/:query' element={<PageSearch />} />
            <Route path='*' element={<PageHome />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
