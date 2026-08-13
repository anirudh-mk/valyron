import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field.tsx";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment.tsx";
import {
  Empty,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import {
  Upload,
  MoreVertical,
  Trash2,
  FileText,
  FileUp,
  Video,
  Box,
  Image as ImageIcon,
  Check,
  Pencil,
  XIcon,
} from "lucide-react";

interface ProductImage {
  id: string;
  name: string;
  url: string;
  isPrimary: boolean;
}

interface ProductDocument {
  id: string;
  name: string;
  category: string;
  file: string;
  size: string;
  uploadedOn: string;
}

export default function MediaSection() {
  const [images, setImages] = useState<ProductImage[]>([
    { id: "img-1", name: "MacBook Front", url: "from-slate-700 via-purple-700 to-pink-600", isPrimary: true },
    { id: "img-2", name: "MacBook Open", url: "from-slate-800 via-indigo-900 to-slate-900", isPrimary: false },
    { id: "img-3", name: "MacBook Side", url: "from-gray-700 to-gray-900", isPrimary: false },
    { id: "img-4", name: "MacBook Keyboard", url: "from-zinc-700 via-zinc-800 to-zinc-950", isPrimary: false },
    { id: "img-5", name: "MacBook Back", url: "from-slate-600 via-slate-700 to-slate-800", isPrimary: false },
  ]);

  const [documents, setDocuments] = useState<ProductDocument[]>([
    { id: "doc-1", name: "Product Specification", category: "Specification", file: "specification.pdf", size: "1.2 MB", uploadedOn: "May 24, 2024" },
    { id: "doc-2", name: "User Manual", category: "Manual", file: "user-manual.pdf", size: "2.5 MB", uploadedOn: "May 24, 2024" },
    { id: "doc-3", name: "Warranty Policy", category: "Warranty", file: "warranty.pdf", size: "1.1 MB", uploadedOn: "May 24, 2024" },
    { id: "doc-4", name: "Compliance Certificate", category: "Certification", file: "bis-certificate.pdf", size: "0.8 MB", uploadedOn: "May 24, 2024" },
    { id: "doc-5", name: "Marketing Brochure", category: "Brochure", file: "brochure.pdf", size: "3.4 MB", uploadedOn: "May 24, 2024" },
  ]);

  const handleDeleteImage = (id: string) => setImages(images.filter((img) => img.id !== id));
  const handleDeleteDocument = (id: string) => setDocuments(documents.filter((doc) => doc.id !== id));
  const handleSetPrimary = (id: string) => setImages(images.map((img) => ({ ...img, isPrimary: img.id === id })));

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Card 1: Product Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
                <ImageIcon className="size-4" />
              </div>
              Product Media
            </CardTitle>
            <CardDescription>
              Upload images of your product. The first image will be used as the primary image.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* AttachmentGroup — matches reference pattern exactly */}
            <AttachmentGroup className="w-full">
              {/* Upload trigger — first item */}
              <Attachment orientation="vertical" className="w-24">
                <AttachmentMedia className="w-full">
                  <Upload className="text-primary"/>
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>Upload</AttachmentTitle>
                  <AttachmentDescription>PNG, JPG, WEBP</AttachmentDescription>
                </AttachmentContent>
                <AttachmentTrigger asChild>
                  <button aria-label="Upload images"/>
                </AttachmentTrigger>
              </Attachment>

              {images.map((img) => (
                <Attachment
                  key={img.id}
                  orientation="vertical"
                >
                  <AttachmentMedia variant="image" className="relative">
                    <div className={`size-full bg-gradient-to-br ${img.url}`}/>
                    {img.isPrimary && (
                      <span className="absolute bottom-1 right-1 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                        <Check className="size-2.5"/>
                      </span>
                    )}
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>{img.name}</AttachmentTitle>
                    <AttachmentDescription>
                      {img.isPrimary ? "Primary" : "Click to set primary"}
                    </AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    {!img.isPrimary && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AttachmentAction
                            onClick={() => handleSetPrimary(img.id)}
                            aria-label={`Set ${img.name} as primary`}
                          >
                            <Check/>
                          </AttachmentAction>
                        </TooltipTrigger>
                        <TooltipContent>Make Primary</TooltipContent>
                      </Tooltip>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AttachmentAction
                          onClick={() => handleDeleteImage(img.id)}
                          aria-label={`Remove ${img.name}`}
                          className="text-destructive hover:text-destructive"
                        >
                          <XIcon/>
                        </AttachmentAction>
                      </TooltipTrigger>
                      <TooltipContent>Remove</TooltipContent>
                    </Tooltip>
                  </AttachmentActions>
                  <AttachmentTrigger asChild>
                    <button
                      onClick={() => handleSetPrimary(img.id)}
                      aria-label={`Select ${img.name}`}
                    />
                  </AttachmentTrigger>
                </Attachment>
              ))}
            </AttachmentGroup>

            <p className="text-[10px] text-muted-foreground">You can upload up to 10 images</p>
          </CardContent>
        </Card>

        {/* Card 2: Documents */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
                  <FileText className="size-4" />
                </div>
                Documents
              </CardTitle>
              <CardDescription>
                Attach important documents related to this product.
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs shrink-0">
              <FileUp className="size-3.5" />
              Upload Document
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Documents Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="px-4 py-3 text-xs">Document Name</TableHead>
                    <TableHead className="px-4 py-3 text-xs">Category</TableHead>
                    <TableHead className="px-4 py-3 text-xs">File</TableHead>
                    <TableHead className="px-4 py-3 text-xs">Size</TableHead>
                    <TableHead className="px-4 py-3 text-xs">Uploaded On</TableHead>
                    <TableHead className="px-4 py-3 text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="px-4 py-3">
                        <Attachment>
                          <AttachmentMedia>
                            <FileText className="text-red-500" />
                          </AttachmentMedia>
                          <AttachmentContent>
                            <AttachmentTitle>{doc.name}</AttachmentTitle>
                            <AttachmentDescription>{doc.category}</AttachmentDescription>
                          </AttachmentContent>
                        </Attachment>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-xs text-primary font-medium hover:underline cursor-pointer">{doc.file}</TableCell>
                      <TableCell className="px-4 py-3 text-xs text-muted-foreground">{doc.size}</TableCell>
                      <TableCell className="px-4 py-3 text-xs text-muted-foreground">{doc.uploadedOn}</TableCell>
                      <TableCell className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Pencil className="size-3.5" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleDeleteDocument(doc.id)}
                            >
                              <Trash2 className="size-3.5" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <p className="text-[10px] text-muted-foreground">
              You can upload up to 20 documents (PDF, DOC, DOCX, XLS, XLSX up to 10MB each)
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Additional Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
                <Video className="size-4" />
              </div>
              Additional Media{" "}
              <span className="text-muted-foreground font-normal text-sm">(Optional)</span>
            </CardTitle>
            <CardDescription>
              Add videos or 3D models to provide more information about your product.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="product-video">Product Video</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>
                      <Video className="size-3.5 text-muted-foreground" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="product-video"
                    placeholder="https://www.youtube.com/watch?v=xxxxxxxxxxx"
                    defaultValue="https://www.youtube.com/watch?v=xxxxxxxxxxx"
                  />
                </InputGroup>
                <FieldDescription>Paste YouTube or Vimeo video link</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="product-3d">3D Model</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>
                      <Box className="size-3.5 text-muted-foreground" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="product-3d"
                    placeholder="https://your-domain.com/model.glb"
                    defaultValue="https://your-domain.com/model.glb"
                  />
                </InputGroup>
                <FieldDescription>Paste 3D model link (GLB, USDZ)</FieldDescription>
              </Field>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
