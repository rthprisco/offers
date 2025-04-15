import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import MenuMobile from "@/components/navbar/menu-mobile";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <MenuMobile />
      <Footer />
    </>
  );
}
