import { useState } from "react";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group.tsx";
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

  const handleDeleteImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleSetPrimary = (id: string) => {
    setImages(images.map((img) => ({ ...img, isPrimary: img.id === id })));
  };

  return (
    <div className="space-y-4">
      {/* Card 1: Product Media */}
      <Card className="p-6 gap-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <ImageIcon className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Product Media</h2>
            <p className="text-xs text-muted-foreground">Upload images of your product. The first image will be used as the primary image.</p>
          </div>
        </div>

        {/* Upload Zone & Thumbnails Grid */}
        <div className="grid grid-cols-6 gap-3">
          {/* Upload Box */}
          <div className="border border-dashed border-border rounded-lg p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/10 transition-colors aspect-square">
            <Upload className="size-5 text-primary mb-1.5" />
            <p className="text-[10px] font-semibold text-primary leading-tight">Upload Images</p>
            <p className="text-[8px] text-muted-foreground mt-1 leading-normal">
              Drag & drop or click to browse<br />PNG, JPG, WEBP up to 5MB
            </p>
          </div>

          {/* Image Cards */}
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative rounded-lg overflow-hidden border aspect-square group bg-gradient-to-br ${img.url} flex items-center justify-center ${
                img.isPrimary ? "border-primary ring-1 ring-primary" : "border-border"
              }`}
            >
              {/* Primary Label */}
              {img.isPrimary && (
                <Badge className="absolute top-2 left-2 text-[8px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded shadow-sm">
                  Primary
                </Badge>
              )}

              {/* Action Dropdown / Menu Trigger */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                {!img.isPrimary && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-6 w-6 bg-white/90 hover:bg-white text-foreground shadow-sm rounded-md"
                    onClick={() => handleSetPrimary(img.id)}
                    title="Make Primary"
                  >
                    <Check className="size-3" />
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-6 w-6 bg-white/90 hover:bg-white text-destructive shadow-sm rounded-md"
                  onClick={() => handleDeleteImage(img.id)}
                  title="Delete Image"
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>

              {/* Styled Mock Notebook display */}
              <div className="text-white text-[10px] font-bold tracking-tight text-center leading-tight px-1 drop-shadow-md">
                {img.name}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-muted-foreground mt-1">You can upload up to 10 images</p>
      </Card>

      {/* Card 2: Documents */}
      <Card className="p-6 gap-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
              <FileText className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">Documents</h2>
              <p className="text-xs text-muted-foreground">Attach important documents related to this product.</p>
            </div>
          </div>

          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <FileUp className="size-3.5" />
            Upload Document
          </Button>
        </div>

        {/* Documents Table */}
        <div className="rounded-lg border border-border overflow-hidden bg-background">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-muted-foreground font-medium">
                <th className="px-4 py-3 font-medium">Document Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">File</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Uploaded On</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, idx) => (
                <tr
                  key={doc.id}
                  className={`border-b border-border last:border-b-0 hover:bg-muted/10 ${
                    idx % 2 === 0 ? "" : "bg-muted/5"
                  }`}
                >
                  {/* Name with File Icon */}
                  <td className="px-4 py-3 font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="size-3.5 text-red-500 shrink-0" />
                      <span>{doc.name}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-muted-foreground">{doc.category}</td>

                  {/* File name */}
                  <td className="px-4 py-3 text-primary font-medium hover:underline cursor-pointer">
                    {doc.file}
                  </td>

                  {/* File size */}
                  <td className="px-4 py-3 text-muted-foreground">{doc.size}</td>

                  {/* Upload Date */}
                  <td className="px-4 py-3 text-muted-foreground">{doc.uploadedOn}</td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                        <MoreVertical className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[10px] text-muted-foreground">
          You can upload up to 20 documents (PDF, DOC, DOCX, XLS, XLSX up to 10MB each)
        </p>
      </Card>

      {/* Card 3: Additional Media (Optional) */}
      <Card className="p-6 gap-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <Video className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Additional Media <span className="text-muted-foreground font-normal">(Optional)</span></h2>
            <p className="text-xs text-muted-foreground">Add videos or 3D models to provide more information about your product.</p>
          </div>
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Product Video */}
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

          {/* 3D Model */}
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
      </Card>
    </div>
  );
}
