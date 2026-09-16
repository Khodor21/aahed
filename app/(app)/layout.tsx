import BottomNav from "@/components/BottomNav";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}
