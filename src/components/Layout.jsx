import { Outlet } from "react-router";
import Header from "./Header.jsx";
import ScrollToHash from "./Scroll.jsx";
import RevealOnScroll from "./RevealOnScroll.jsx";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <>
      <ScrollToHash />
      <RevealOnScroll />
      <Header />
      <main>
        <Outlet />       
      </main>
      <Footer />
    </>
  );
}

export default Layout;