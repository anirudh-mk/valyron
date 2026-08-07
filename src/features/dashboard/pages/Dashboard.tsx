import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  ArrowUpRight,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  Undo2,               // ← Fixed: This is the correct return icon
} from "lucide-react";

export default function ERPClassyDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/*/!* Header *!/*/}
      {/*<div className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">*/}
      {/*  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">*/}
      {/*    <div className="flex items-center gap-4">*/}
      {/*      <div className="bg-blue-600 text-white p-3 rounded-xl">*/}
      {/*        <DollarSign className="h-6 w-6" />*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <h1 className="text-2xl font-bold text-gray-900">Valyron ERP</h1>*/}
      {/*        <p className="text-sm text-gray-500">Welcome back, Alex</p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="flex items-center gap-4">*/}
      {/*      <Badge variant="secondary" className="text-sm">*/}
      {/*        {format(new Date(), "EEEE, MMMM d, yyyy")}*/}
      {/*      </Badge>*/}
      {/*      <Avatar>*/}
      {/*        <AvatarImage src="" />*/}
      {/*        <AvatarFallback>AL</AvatarFallback>*/}
      {/*      </Avatar>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-5 w-5 opacity-80"/>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$248,950</div>
              <div className="flex items-center gap-2 mt-2 text-blue-100">
                <TrendingUp className="h-4 w-4"/>
                <span className="text-sm">+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Purchase Orders</CardTitle>
                <ShoppingCart className="h-5 w-5 opacity-80"/>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
              <div className="flex items-center gap-2 mt-2 text-green-100">
                <ArrowUpRight className="h-4 w-4"/>
                <span className="text-sm">18 pending approval</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Pending Invoices</CardTitle>
                <FileText className="h-5 w-5 opacity-80"/>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28</div>
              <div className="flex items-center gap-2 mt-2 text-purple-100">
                <Clock className="h-4 w-4"/>
                <span className="text-sm">$87,400 due this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-gray-700">Profit Margin</CardTitle>
                <TrendingUp className="h-5 w-5 text-green-600"/>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">38.4%</div>
              <Progress value={38.4} className="mt-3 h-3 bg-gray-200"/>
              <p className="text-sm text-gray-500 mt-2">+4.2% vs last quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Middle Section - Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-gray-100 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="procurement">Procurement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              技術 {/* Recent Transactions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Last 5 activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      type: "invoice",
                      name: "INV-2025-0048",
                      amount: "$5,900",
                      status: "Paid",
                      icon: CheckCircle2,
                      color: "text-green-600"
                    },
                    {
                      type: "po",
                      name: "PO-2025-0892",
                      amount: "$18,500",
                      status: "Sent",
                      icon: ArrowUpRight,
                      color: "text-blue-600"
                    },
                    {
                      type: "return",
                      name: "PR-2025-013",
                      amount: "$8,260",
                      status: "Sent",
                      icon: Undo2,
                      color: "text-red-600"
                    },   // ← Fixed here
                    {
                      type: "invoice",
                      name: "INV-2025-0047",
                      amount: "$12,400",
                      status: "Sent",
                      icon: Clock,
                      color: "text-orange-600"
                    },
                    {
                      type: "payment",
                      name: "Payment Received",
                      amount: "$4,200",
                      status: "Received",
                      icon: DollarSign,
                      color: "text-green-600"
                    },
                  ].map((t, i) => (
                    <div key={i}
                         className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full bg-gray-100 ${t.color}`}>
                          <t.icon className="h-5 w-5"/>
                        </div>
                        <div>
                          <p className="font-medium">{t.name}</p>
                          <p className="text-sm text-gray-500">{t.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{t.amount}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Most used features</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {[
                    {label: "Create Invoice", icon: FileText, color: "bg-blue-600"},
                    {label: "New purchase Order", icon: ShoppingCart, color: "bg-green-600"},
                    {label: "Record Payment", icon: DollarSign, color: "bg-purple-600"},
                    {label: "Add supplier", icon: Users, color: "bg-orange-600"},
                    {label: "View Reports", icon: TrendingUp, color: "bg-indigo-600"},
                    {label: "Stock Check", icon: Package, color: "bg-pink-600"},
                  ].map((action) => (
                    <Button key={action.label} variant="outline"
                            className="h-24 flex flex-col gap-2 hover:shadow-md transition">
                      <div className={`p-3 rounded-lg ${action.color} text-white`}>
                        <action.icon className="h-6 w-6"/>
                      </div>
                      <span className="text-xs font-medium">{action.label}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs remain unchanged */}
          <TabsContent value="sales">
            <Card className="h-96">
              <CardContent className="h-full flex items-center justify-center">
                <p className="text-gray-500">Sales chart will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procurement">
            <Card>
              <CardHeader>
                <CardTitle>Procurement Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-amber-50 rounded-lg text-amber-800">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-6 w-6"/>
                    <div>
                      <p className="font-medium">Low Stock Alert</p>
                      <p className="text-sm">12 items below reorder level</p>
                    </div>
                  </div>
                  <Button className="mt-4" size="sm">View Items</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ... same as before */}
        </div>
      </div>
    </div>
  );
}