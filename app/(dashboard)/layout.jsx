import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
