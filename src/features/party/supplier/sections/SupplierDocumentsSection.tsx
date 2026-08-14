import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
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
  ShieldCheck,
  Clock,
  AlertTriangle,
  Upload,
  Eye,
  Download,
  Trash2,
  MoreHorizontal,
  Info,
} from "lucide-react";

export interface SupplierDocument {
  id: string;
  name: string;
  category: string;
  uploadedOn: string;
  expiryDate: string;
  status: string;
  uploadedBy: string;
  size: string;
  type: string;
  documentNumber?: string;
  expiryAlertText?: string;
}

interface SupplierDocumentsSectionProps {
  documents: SupplierDocument[];
  onUploadDocument: () => void;
}

const DOCUMENT_REQUIREMENTS = [
  { name: "GST Registration Certificate", required: true, status: "Uploaded" },
  { name: "PAN Card", required: true, status: "Uploaded" },
  { name: "Bank Details / Cancelled Cheque", required: true, status: "Uploaded" },
  { name: "Trade License", required: true, status: "Uploaded" },
  { name: "MSME Certificate", required: false, status: "Uploaded" },
  { name: "ISO Certificate", required: false, status: "Pending" },
  { name: "Supplier Agreement", required: false, status: "Uploaded" },
  { name: "Insurance Certificate", required: false, status: "Pending" },
];

export default function SupplierDocumentsSection({
  documents,
  onUploadDocument,
}: SupplierDocumentsSectionProps) {
  // Stats calculations
  const totalCount = 8;
  const verifiedCount = 5;
  const expiringSoonCount = 1;
  const expiredCount = 2;

  const getDocTypeBadgeColor = (category: string) => {
    switch (category) {
      case "GST Certificate":
      case "Quality Certificate":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none";
      case "Tax Document":
      case "Financial":
      case "Bank Document":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none";
      default:
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-none";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-none font-semibold text-[10px] py-0.5 px-2">
            Verified
          </Badge>
        );
      case "Expiring Soon":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-none font-semibold text-[10px] py-0.5 px-2">
            Expiring Soon
          </Badge>
        );
      case "Expired":
        return (
          <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-none font-semibold text-[10px] py-0.5 px-2">
            Expired
          </Badge>
        );
      default:
        return (
          <Badge className="bg-muted text-muted-foreground border-none font-semibold text-[10px] py-0.5 px-2">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-lg border border-border/50 shadow-xs">
        <div>
          <h3 className="text-base font-semibold text-foreground">Documents</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Upload and manage documents related to this supplier.</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onUploadDocument}
            className="text-xs font-semibold gap-1.5 h-9"
            type="button"
          >
            <Upload className="h-4 w-4" /> Upload Document
          </Button>
          <Button variant="ghost" size="icon-sm" type="button" className="h-9 w-9">
            <MoreHorizontal className="h-4.5 w-4.5" />
          </Button>
        </div>
      </div>

      {/* Stats Counters Row */}
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
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Verified Documents</span>
              <p className="text-xl font-extrabold text-green-600 dark:text-green-400">{verifiedCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <ShieldCheck className="h-4.5 w-4.5" />
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
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Expired Documents</span>
              <p className="text-xl font-extrabold text-destructive">{expiredCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
              <AlertTriangle className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Grid Table */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-b border-border/30 h-10">
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[24%]">Document Name</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[16%]">Document Type</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[18%]">Document Number</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[12%]">Issue Date</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[16%]">Expiry Date</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[10%]">Status</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[100px] text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-accent/10 border-b border-border/30 h-12">
                    <TableCell className="py-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-red-500 shrink-0" />
                        <span className="text-xs font-bold text-foreground truncate max-w-[180px]" title={doc.name}>
                          {doc.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <Badge className={`font-semibold text-[10px] border-none py-0.5 px-2 ${getDocTypeBadgeColor(doc.category)}`}>
                        {doc.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2 text-xs font-semibold text-foreground font-mono">
                      {doc.documentNumber || "—"}
                    </TableCell>
                    <TableCell className="py-2 text-xs font-semibold text-muted-foreground font-mono">
                      {doc.uploadedOn}
                    </TableCell>
                    <TableCell className="py-2">
                      {doc.expiryDate === "—" ? (
                        <span className="text-xs font-semibold text-muted-foreground font-mono">—</span>
                      ) : (
                        <div className="flex flex-col">
                          <span className={`text-xs font-semibold font-mono ${
                            doc.status === "Expired" ? "text-destructive" : doc.status === "Expiring Soon" ? "text-orange-500" : "text-muted-foreground"
                          }`}>
                            {doc.expiryDate}
                          </span>
                          {doc.expiryAlertText && (
                            <span className={`text-[9px] font-bold ${
                              doc.status === "Expired" ? "text-destructive" : "text-orange-500"
                            }`}>
                              {doc.expiryAlertText}
                            </span>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-2">
                      {getStatusBadge(doc.status)}
                    </TableCell>
                    <TableCell className="py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          className="hover:bg-accent p-1.5 rounded-sm hover:text-foreground text-muted-foreground transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          className="hover:bg-accent p-1.5 rounded-sm hover:text-foreground text-muted-foreground transition-colors cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          className="hover:bg-accent p-1.5 rounded-sm hover:text-destructive text-muted-foreground transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-border/40 text-xs text-muted-foreground font-medium">
            <span>
              Showing 1 to {documents.length} of {documents.length} documents
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

      {/* Document Requirements bottom Checklist */}
      <Card className="border border-border/50 shadow-sm text-left">
        <CardContent className="p-5 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Document Requirements</h4>
            <p className="text-xs text-muted-foreground mt-0.5">List of important documents required from suppliers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {DOCUMENT_REQUIREMENTS.map((req, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-muted/20">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] text-muted-foreground font-bold block uppercase tracking-wide">
                    {req.required ? "Required" : "Optional"}
                  </span>
                  <p className="text-xs font-semibold text-foreground truncate mt-0.5" title={req.name}>
                    {req.name}
                  </p>
                </div>
                {req.status === "Uploaded" ? (
                  <span className="text-[9px] font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-sm shrink-0">
                    Uploaded
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onUploadDocument}
                    className="text-[9px] font-bold text-primary bg-primary/10 hover:bg-primary/20 px-1.5 py-1 rounded-sm shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Upload className="h-2.5 w-2.5" /> Upload
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info notification */}
      <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg border border-blue-500/20 text-xs">
        <Info className="h-4.5 w-4.5 shrink-0" />
        <p>Keep your documents up to date. Expired documents may affect purchase orders and payments.</p>
      </div>
    </div>
  );
}
