import Header from '@/components/layout/header';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Header />
      <main>{children}</main>
    </div>
  );
}
