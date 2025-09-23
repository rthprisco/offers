import AccessibilityGuide from "@/components/AccessibilityGuide/AccessibilityGuide";

export default function AuthLayout({ children }) {
  return (
    <>
      <main id="main-content">{children}</main>
      <AccessibilityGuide />
    </>
  );
}
