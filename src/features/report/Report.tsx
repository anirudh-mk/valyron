import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  ArrowRight,
  Download,
  Calendar,
  Filter
} from "lucide-react";
import { format } from "date-fns";

export default function ReportsDashboard() {
  const reports = [
    {
      category: "Sales & Revenue",
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-50",
      items: [
        { name: "Sales Summary", desc: "Monthly, quarterly & yearly sales performance", popular: true },
        { name: "Invoice Register", desc: "All issued invoices with payment status" },
        { name: "customer-wise Sales", desc: "Revenue breakdown by customer" },
        { name: "Product-wise Sales", desc: "Top selling items and categories" },
        { name: "Sales Return report", desc: "Credit notes issued to customers" },
      ]
    },
    {
      category: "Purchases & Expenses",
      icon: ShoppingCart,
      color: "text-green-600 bg-green-50",
      items: [
        { name: "purchase Register", desc: "All purchase invoices from suppliers" },
        { name: "supplier-wise Purchases", desc: "Spending breakdown by vendor" },
        { name: "purchase Return report", desc: "Debit notes issued to suppliers" },
        { name: "Expense Summary", desc: "Non-inventory expense tracking" },
      ]
    },
    {
      category: "Financial Reports",
      icon: DollarSign,
      color: "text-purple-600 bg-purple-50",
      items: [
        { name: "Profit & Loss Statement", desc: "Income vs expenses over time", popular: true },
        { name: "Balance Sheet", desc: "Assets, liabilities & equity snapshot" },
        { name: "Cash Flow Statement", desc: "Cash inflows and outflows" },
        { name: "Aged Receivables", desc: "Outstanding customer payments by age" },
        { name: "Aged Payables", desc: "Pending supplier payments by age", popular: true },
        { name: "Tax Liability report", desc: "GST/VAT input vs output tax" },
      ]
    },
    {
      category: "Inventory & Stock",
      icon: Package,
      color: "text-orange-600 bg-orange-50",
      items: [
        { name: "Stock Summary", desc: "Current stock levels across warehouses" },
        { name: "Stock Movement report", desc: "Item-wise inward/outward history" },
        { name: "Low Stock Alert", desc: "Items below reorder level" },
        { name: "Stock Valuation", desc: "FIFO / Weighted Average valuation" },
      ]
    },
    {
      category: "customer & supplier",
      icon: Users,
      color: "text-indigo-600 bg-indigo-50",
      items: [
        { name: "customer Ledger", desc: "Complete transaction history per customer" },
        { name: "supplier Ledger", desc: "Complete transaction history per supplier" },
        { name: "Top Customers", desc: "Ranked by revenue contribution" },
        { name: "Top Suppliers", desc: "Ranked by purchase volume" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="h-9 w-9 text-blue-600" />
            Reports Center
          </h1>
          <p className="text-gray-600 mt-2">
            Access all financial, operational, and analytical reports in one place
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-gray-500 mt-1">23 standard + 25 custom</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Last Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">P&L Mar 2025</div>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500 mt-1">Monthly auto-reports</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Favorites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-500 mt-1">Quick access reports</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Grid */}
        <div className="space-y-10">
          {reports.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.category}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${category.color}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                      <p className="text-gray-600">{category.items.length} reports available</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {category.items.map((report) => (
                    <Card 
                      key={report.name} 
                      className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200 group"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition">
                            {report.name}
                            {report.popular && (
                              <Badge className="ml-3" variant="secondary">Popular</Badge>
                            )}
                          </CardTitle>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
                        </div>
                        <CardDescription className="mt-2">
                          {report.desc}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Separator className="mb-4" />
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4 text-gray-500">
                            <Button size="sm" variant="ghost" className="h-8">
                              <Calendar className="h-4 w-4 mr-1" />
                              Run Report
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          <span className="text-xs text-gray-400">
                            Updated {format(new Date(), "dd MMM")}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 flex justify-center gap-4">
          <Button size="lg" className="gap-3">
            <FileText className="h-5 w-5" />
            Generate Custom Report
          </Button>
          <Button size="lg" variant="outline">
            View Scheduled Reports
          </Button>
        </div>
      </div>
    </div>
  );
}