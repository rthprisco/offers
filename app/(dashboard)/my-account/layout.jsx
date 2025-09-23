import Sidebar from "./sidebar";
export default function MyAccountLayout({ children }) {
  return (
    <>
      <main className="flex-1 flex justify-center"><Sidebar />{children}</main>
    </>
  );
}
