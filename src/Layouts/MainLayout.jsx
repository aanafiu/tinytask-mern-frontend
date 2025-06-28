
import { Outlet } from "react-router";
import Nav from "../Components/Nav/Nav";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";
const MainLayout = () => {
   
  return (
    <div>
      <ScrollToTop />
      <nav className={`bg-Primary/50 backdrop-blur-2xl sticky top-0 z-50 font-semibold font-Main text-Light py-4 px-4`}>
        <Nav />
      </nav>
      <section className="">
        <Outlet></Outlet>
      </section>
      <section className="mx-auto mt-16">
        <Footer></Footer>
      </section>
    </div>
  );
};

export default MainLayout;
