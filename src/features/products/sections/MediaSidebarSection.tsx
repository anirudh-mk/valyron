import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { HelpCircle, ExternalLink, Image, FileText, Video, Box } from "lucide-react";

export default function MediaSidebarSection() {
  return (
    <div className="space-y-4">
      {/* Product Preview */}
      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-semibold">Product Preview</h3>

        {/* Product Card */}
        <div className="flex items-start gap-3 rounded-lg border border-border p-3 bg-muted/30">
          <div className="w-14 h-14 rounded-md overflow-hidden shrink-0 bg-gradient-to-br from-slate-700 via-purple-700 to-pink-600 flex items-center justify-center">
            <div className="text-white text-xs font-bold tracking-tight text-center leading-tight px-1">
              MacBook
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight truncate">MacBook Pro M3 14"</p>
            <p className="text-xs text-primary mt-0.5 font-medium">SKU: MBP-M3-14</p>
            <Badge className="mt-1.5 text-[10px] bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800">
              Active
            </Badge>
          </div>
        </div>

        {/* Product Info Rows */}
        <div className="space-y-2 border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Category</p>
            <p className="text-xs font-medium">Laptops</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Brand</p>
            <p className="text-xs font-medium">Apple</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Type</p>
            <p className="text-xs font-medium">Laptop</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Stock</p>
            <p className="text-xs font-medium">25 (Main Warehouse)</p>
          </div>
        </div>
      </Card>

      {/* Media Summary */}
      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-semibold">Media Summary</h3>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Image className="size-3.5 text-muted-foreground" />
              <span>Images</span>
            </div>
            <p className="font-semibold text-foreground">5 / 10 uploaded</p>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="size-3.5 text-muted-foreground" />
              <span>Documents</span>
            </div>
            <p className="font-semibold text-foreground">5 / 20 uploaded</p>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Video className="size-3.5 text-muted-foreground" />
              <span>Video</span>
            </div>
            <p className="font-semibold text-foreground">1 added</p>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Box className="size-3.5 text-muted-foreground" />
              <span>3D Model</span>
            </div>
            <p className="font-semibold text-foreground">Not added</p>
          </div>
        </div>
      </Card>

      {/* Quick Tips */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          <HelpCircle className="size-4 text-blue-600 dark:text-blue-400" />
          <h3>Quick Tips</h3>
        </div>
        <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4 leading-normal">
          <li>Use high quality images for better visibility.</li>
          <li>Add specification and warranty documents.</li>
          <li>Videos and 3D models improve customer trust.</li>
        </ul>
        <div className="pt-1.5 border-t border-border mt-1">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
            onClick={(e) => e.preventDefault()}
          >
            Learn more about media & documents
            <ExternalLink className="size-3" />
          </a>
        </div>
      </Card>
    </div>
  );
}
