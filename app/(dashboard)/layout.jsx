import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import MenuMobile from "@/components/navbar/mobile/menu-mobile";
import AccessibilityGuide from "@/components/AccessibilityGuide/AccessibilityGuide";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <MenuMobile />
      <Footer />
      <AccessibilityGuide />
    </>
  );
}
