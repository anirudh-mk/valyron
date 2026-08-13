import ProductPreviewSection from "@/features/products/sections/ProductPreviewSection.tsx";

/** Shared two-column layout: main content left, sticky preview sidebar right */
export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_320px] gap-4 mt-4">
      <div className="min-w-0 space-y-4">{children}</div>
      <aside className="sticky top-4 self-start">
        <ProductPreviewSection />
      </aside>
    </div>
  );
}
