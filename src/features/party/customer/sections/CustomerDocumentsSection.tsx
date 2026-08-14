import { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Separator } from "@/components/base/separator.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table.tsx";
import {
  FileText,
  FileSpreadsheet,
  Upload,
  Download,
  MoreVertical,
  Plus,
  Info,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

export interface CustomerDocument {
  id: string;
  name: string;
  category: string;
  uploadedOn: string;
  expiryDate: string;
  status: string;
  uploadedBy: string;
  size: string;
  type: string;
}

interface CustomerDocumentsSectionProps {
  documents: CustomerDocument[];
  onUploadDocument: () => void;
}

export default function CustomerDocumentsSection({
  documents: initialDocuments,
  onUploadDocument,
}: CustomerDocumentsSectionProps) {
  const [documents, setDocuments] = useState<CustomerDocument[]>(initialDocuments);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Calculate statistics
  const totalCount = documents.length;
  const verifiedCount = documents.filter((d) => d.status === "Verified").length;
  const expiringSoonCount = documents.filter((d) => d.status === "Expiring Soon").length;
  const expiredCount = documents.filter((d) => d.status === "Expired").length;

  const categories = [
    { name: "All", count: totalCount },
    { name: "KYC & Identity", count: documents.filter((d) => d.category === "KYC & Identity").length },
    { name: "Tax & Compliance", count: documents.filter((d) => d.category === "Tax & Compliance" || d.category === "Compliance").length },
    { name: "Agreements", count: documents.filter((d) => d.category === "Agreements").length },
    { name: "Financial", count: documents.filter((d) => d.category === "Financial").length },
  ];

  // Filter documents based on active tab
  const filteredDocuments = documents.filter((doc) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Tax & Compliance") {
      return doc.category === "Tax & Compliance" || doc.category === "Compliance";
    }
    return doc.category === activeCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4.5 w-4.5 text-red-500 shrink-0" />;
      case "xlsx":
      case "xls":
        return <FileSpreadsheet className="h-4.5 w-4.5 text-green-600 shrink-0" />;
      default:
        return <FileText className="h-4.5 w-4.5 text-blue-500 shrink-0" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-none font-semibold flex items-center gap-1 w-fit">
            <CheckCircle className="h-3 w-3" /> Verified
          </Badge>
        );
      case "Expiring Soon":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-none font-semibold flex items-center gap-1 w-fit">
            <Clock className="h-3 w-3" /> Expiring Soon
          </Badge>
        );
      case "Expired":
        return (
          <Badge className="bg-destructive/10 text-destructive border-none font-semibold flex items-center gap-1 w-fit">
            <AlertTriangle className="h-3 w-3" /> Expired
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-muted-foreground w-fit">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-lg border border-border/50 shadow-xs">
        <div>
          <h3 className="text-base font-semibold text-foreground">Documents</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Upload and manage all documents related to this customer.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onUploadDocument}
          className="text-xs font-semibold gap-1.5 self-end sm:self-auto h-9"
          type="button"
        >
          <Plus className="h-4 w-4" /> Upload Document
        </Button>
      </div>

      {/* Stats Summary Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border border-border/50 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Total Documents</span>
              <p className="text-xl font-extrabold text-foreground">{totalCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <FileText className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Verified</span>
              <p className="text-xl font-extrabold text-green-600 dark:text-green-400">{verifiedCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <CheckCircle className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Expiring Soon</span>
              <p className="text-xl font-extrabold text-orange-500">{expiringSoonCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Expired</span>
              <p className="text-xl font-extrabold text-destructive">{expiredCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center text-destructive">
              <AlertTriangle className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Management Card */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-0">
          {/* Navigation Category Filter Tabs & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-border/50">
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  type="button"
                  className={`text-xs font-semibold px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                    activeCategory === cat.name
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-semibold gap-1 text-primary hover:text-primary/95 shrink-0 self-end sm:self-auto"
            >
              <Plus className="h-3.5 w-3.5" /> New Category
            </Button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10">
                  <TableHead className="text-xs font-bold text-muted-foreground w-[32%] h-10">Document Name</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground w-[18%] h-10">Category</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground w-[13%] h-10">Uploaded On</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground w-[13%] h-10">Expiry Date</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground w-[12%] h-10">Status</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground w-[12%] h-10">Uploaded By</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground w-[60px] h-10 text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-28 text-center text-xs text-muted-foreground">
                      No documents found for category "{activeCategory}".
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-accent/10 border-b border-border/30 h-11">
                      <TableCell className="py-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {getFileIcon(doc.type)}
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate max-w-[200px]" title={doc.name}>
                              {doc.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground uppercase font-medium mt-0.5">
                              {doc.type} • {doc.size}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-2.5">
                        <span className="text-[11px] font-semibold text-foreground bg-muted/65 py-0.5 px-2 rounded-sm border border-border/30">
                          {doc.category}
                        </span>
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-muted-foreground font-medium">
                        {doc.uploadedOn}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-muted-foreground font-medium">
                        {doc.expiryDate}
                      </TableCell>
                      <TableCell className="py-2.5">
                        {getStatusBadge(doc.status)}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-foreground font-medium">
                        {doc.uploadedBy}
                      </TableCell>
                      <TableCell className="py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            className="hover:bg-accent p-1.5 rounded-sm hover:text-foreground text-muted-foreground transition-colors"
                            title="Download document"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            className="hover:bg-accent p-1.5 rounded-sm hover:text-foreground text-muted-foreground transition-colors"
                            title="More options"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer Pagination bar */}
          <div className="flex items-center justify-between p-4 border-t border-border/40 text-xs text-muted-foreground font-medium">
            <span>
              Showing 1 to {filteredDocuments.length} of {filteredDocuments.length} documents
            </span>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-1.5">
                <span>Show</span>
                <span className="bg-muted py-1 px-2.5 rounded-md border border-border/30 font-semibold text-foreground">
                  10 / page
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled
                  className="bg-primary text-primary-foreground font-bold h-7 w-7 rounded-md flex items-center justify-center"
                >
                  1
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accepted formats alert footer */}
      <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3.5 rounded-lg border border-blue-500/20 text-xs">
        <Info className="h-4.5 w-4.5 shrink-0" />
        <p>Accepted file types: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX (Max size: 10MB per file)</p>
      </div>
    </div>
  );
}
