import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {tabs} from "@/features/products/utils/ProductTabs.tsx";

export default function TabSection() {
  return (
    <Tabs defaultValue="basic-information" className="mt-4">
      <TabsList
        variant="line"
        className="w-full justify-start border-b border-border"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-none text-sm"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-4"
        >
          <div className="grid grid-cols-[1fr_320px] gap-6">
            <div className="min-w-0">
              {tab.content}
            </div>

            <aside className="sticky top-4 self-start">
              {tab.sidebar}
            </aside>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}