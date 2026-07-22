import React, { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Pencil, X, Trash2, Plus, Search } from "lucide-react";

// ---- Types ----
export type InputValue = string | number;

export interface GridRow {
  id: number;
  slNo: number;
  productCode: string;
  product: string;
  qty: InputValue;
  unit: string;
  rate: InputValue;
  inclu: InputValue;
  grossAmt: number;
  discAmt: InputValue;
  tax: string;
  taxAmt: number;
  amount: number;
}

export interface Column {
  key: keyof GridRow;
  label: string;
  width: string;
  editable: boolean;
  numeric?: boolean;
}

interface Product {
  code: string;
  name: string;
  price: number;
  unit: string;
}

// ---- Mock product catalogue (swap for your API) ----
const PRODUCT_CATALOGUE: Product[] = [
  { code: "P001", name: "Apple", price: 120.0, unit: "Kg" },
  { code: "P002", name: "Salsa", price: 86.96, unit: "Pcs" },
  { code: "P003", name: "Almond Milk", price: 210.0, unit: "Ltr" },
  { code: "P004", name: "Avocado", price: 65.5, unit: "Pcs" },
  { code: "P005", name: "Banana", price: 40.0, unit: "Kg" },
  { code: "P006", name: "Basmati Rice", price: 95.0, unit: "Kg" },
];

export const emptyRow = (id: number): GridRow => ({
  id,
  slNo: id,
  productCode: "",
  product: "",
  qty: 0,
  unit: "",
  rate: 0,
  inclu: 0,
  grossAmt: 0,
  discAmt: 0,
  tax: "",
  taxAmt: 0,
  amount: 0,
});

const columns: Column[] = [
  { key: "slNo", label: "SlNo", width: "w-12", editable: false },
  { key: "productCode", label: "ProductCode", width: "w-32", editable: true },
  { key: "product", label: "Product", width: "flex-1 min-w-[220px]", editable: true },
  { key: "qty", label: "Qty", width: "w-24", editable: true, numeric: true },
  { key: "unit", label: "Unit", width: "w-20", editable: false },
  { key: "rate", label: "Rate", width: "w-24", editable: true, numeric: true },
  { key: "inclu", label: "Inclu", width: "w-24", editable: true, numeric: true },
  { key: "grossAmt", label: "GrossAmt", width: "w-28", editable: false, numeric: true },
  { key: "discAmt", label: "DiscAmt", width: "w-24", editable: true, numeric: true },
  { key: "tax", label: "Tax", width: "w-24", editable: true },
  { key: "taxAmt", label: "TaxAmt", width: "w-24", editable: false, numeric: true },
  { key: "amount", label: "Amount", width: "w-28", editable: false, numeric: true },
];

const fmt = (n: InputValue): string => Number(n || 0).toFixed(2);

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const nodes: React.ReactNode[] = [];
  let qi = 0;
  for (let i = 0; i < text.length; i++) {
    if (qi < q.length && lower[i] === q[qi]) {
      nodes.push(
        <span key={i} className="font-semibold text-slate-900">
          {text[i]}
        </span>
      );
      qi++;
    } else {
      nodes.push(<span key={i}>{text[i]}</span>);
    }
  }
  return <>{nodes}</>;
}

interface ProductSearchCellProps {
  row: GridRow;
  onChange: (val: string) => void;
  onPickProduct: (product: Product) => void;
  onClear: () => void;
}

function ProductSearchCell({ row, onChange, onPickProduct, onClear }: ProductSearchCellProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(row.product);
  const [visibleCount, setVisibleCount] = useState<number>(2);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => setQuery(row.product), [row.product]);

  // Handle positioning and scrolling
  useEffect(() => {
    const updatePos = () => {
      if (!inputWrapRef.current) return;
      const rect = inputWrapRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 4, left: rect.left });
    };

    if (open) {
      updatePos();
      // Use capture: true to catch scrolls inside scrollable parents
      window.addEventListener("scroll", updatePos, true);
      window.addEventListener("resize", updatePos);
    }

    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [open]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const portalEl = document.getElementById(`product-portal-${row.id}`);
      if (
        wrapRef.current && !wrapRef.current.contains(e.target as Node) &&
        portalEl && !portalEl.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [row.id]);

  const results = useMemo(() => {
    if (!query) return PRODUCT_CATALOGUE;
    return PRODUCT_CATALOGUE.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const visible = results.slice(0, visibleCount);

  return (
    <div ref={wrapRef} className="relative w-full">
      <div 
        ref={inputWrapRef} 
        className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-colors"
      >
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setVisibleCount(2);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search product..."
          className="w-full bg-transparent text-[13px] text-slate-800 placeholder:text-slate-400 outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onClear();
              setOpen(false);
            }}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && dropdownPos && createPortal(
        <div
          id={`product-portal-${row.id}`}
          style={{ position: "fixed", top: `${dropdownPos.top}px`, left: `${dropdownPos.left}px`, zIndex: 9999 }}
          className="w-[420px] max-w-[80vw] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2 text-[13px] font-medium text-slate-500">
            <span>Product Name</span>
            <span>Sales Price</span>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {visible.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-slate-400">
                No products found
              </div>
            )}
            {visible.map((p, idx) => (
              <button
                type="button"
                key={p.code}
                onClick={() => {
                  onPickProduct(p);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-indigo-50 ${
                  idx === 0 ? "bg-slate-50" : ""
                }`}
              >
                <span className="text-slate-700">
                  <HighlightMatch text={p.name} query={query} />
                </span>
                <span className="tabular-nums text-slate-600">
                  {fmt(p.price)}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 divide-x divide-slate-100 border-t border-slate-100">
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 py-2.5 text-[13px] font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <Plus className="h-3.5 w-3.5" /> New Product
            </button>
            <button
              type="button"
              disabled={visibleCount >= results.length}
              onClick={() => setVisibleCount((c) => c + 2)}
              className="flex items-center justify-center gap-1.5 py-2.5 text-[13px] font-medium text-indigo-600 hover:bg-indigo-50 disabled:text-slate-300 disabled:hover:bg-transparent transition-colors"
            >
              <Plus className="h-3.5 w-3.5" /> Load More
            </button>
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 px-3 py-2">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <input
              placeholder="Search by Barcode"
              className="w-full bg-transparent text-[13px] text-slate-500 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

interface GridTableProps {
  items?: GridRow[];
  onItemsChange: (items: GridRow[]) => void;
}

export default function GridTable({ items = [], onItemsChange }: GridTableProps) {
  const [pageSize, setPageSize] = useState<number>(5);
  const nextId = useRef<number>(items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 2);

  const recompute = (row: GridRow): GridRow => {
    const qty = Number(row.qty) || 0;
    const rate = Number(row.rate) || 0;
    const inclu = Number(row.inclu) || 0;
    const discAmt = Number(row.discAmt) || 0;
    const grossAmt = qty * rate;
    const taxAmt = Number(row.taxAmt) || 0;
    const amount = grossAmt - discAmt + inclu + taxAmt;
    return { ...row, grossAmt, amount };
  };

  const updateRow = (id: number, patch: Partial<GridRow>) => {
    const newItems = items.map((r) => (r.id === id ? recompute({ ...r, ...patch }) : r));
    onItemsChange(newItems);
  };

  const addLine = () => {
    const newRow = emptyRow(nextId.current);
    newRow.slNo = items.length + 1;
    nextId.current += 1;
    onItemsChange([...items, newRow]);
  };

  const deleteRow = (id: number) => {
    const newItems = items
      .filter((r) => r.id !== id)
      .map((r, idx) => ({ ...r, slNo: idx + 1 }));
    onItemsChange(newItems);
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${col.width} whitespace-nowrap px-3 py-3 text-left text-[13px] font-semibold text-slate-600`}
                >
                  {col.label}
                </th>
              ))}
              <th className="w-12 px-3 py-3 text-right">
                <Pencil className="ml-auto h-4 w-4 text-indigo-500" />
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
              >
                <td className="px-3 py-2 align-middle font-medium text-indigo-600">
                  {row.slNo}
                </td>
                <td className="px-3 py-2 align-middle">
                  <input
                    value={row.productCode}
                    onChange={(e) =>
                      updateRow(row.id, { productCode: e.target.value })
                    }
                    className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-1 text-[13px] text-slate-700 outline-none focus:border-indigo-300 focus:bg-white"
                  />
                </td>
                <td className="px-3 py-2 align-middle">
                  <ProductSearchCell
                    row={row}
                    onChange={(val) => updateRow(row.id, { product: val })}
                    onClear={() =>
                      updateRow(row.id, {
                        product: "",
                        productCode: "",
                        rate: 0,
                        unit: "",
                      })
                    }
                    onPickProduct={(p) =>
                      updateRow(row.id, {
                        product: p.name,
                        productCode: p.code,
                        rate: p.price,
                        unit: p.unit,
                        qty: row.qty || 1,
                      })
                    }
                  />
                </td>
                <td className="px-3 py-2 align-middle">
                  <input
                    type="number"
                    value={row.qty}
                    onChange={(e) => updateRow(row.id, { qty: e.target.value })}
                    className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-1 text-right text-[13px] text-slate-700 outline-none tabular-nums focus:border-indigo-300 focus:bg-white"
                  />
                </td>
                <td className="px-3 py-2 align-middle text-[13px] text-slate-500">
                  {row.unit}
                </td>
                <td className="px-3 py-2 align-middle">
                  <input
                    type="number"
                    value={row.rate}
                    onChange={(e) => updateRow(row.id, { rate: e.target.value })}
                    className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-1 text-right text-[13px] text-slate-700 outline-none tabular-nums focus:border-indigo-300 focus:bg-white"
                  />
                </td>
                <td className="px-3 py-2 align-middle">
                  <input
                    type="number"
                    value={row.inclu}
                    onChange={(e) => updateRow(row.id, { inclu: e.target.value })}
                    className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-1 text-right text-[13px] text-slate-700 outline-none tabular-nums focus:border-indigo-300 focus:bg-white"
                  />
                </td>
                <td className="px-3 py-2 align-middle text-right text-[13px] tabular-nums text-slate-700">
                  {fmt(row.grossAmt)}
                </td>
                <td className="px-3 py-2 align-middle">
                  <input
                    type="number"
                    value={row.discAmt}
                    onChange={(e) => updateRow(row.id, { discAmt: e.target.value })}
                    className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-1 text-right text-[13px] text-slate-700 outline-none tabular-nums focus:border-indigo-300 focus:bg-white"
                  />
                </td>
                <td className="px-3 py-2 align-middle">
                  <input
                    value={row.tax}
                    onChange={(e) => updateRow(row.id, { tax: e.target.value })}
                    className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-1 text-[13px] text-slate-700 outline-none focus:border-indigo-300 focus:bg-white"
                  />
                </td>
                <td className="px-3 py-2 align-middle text-right text-[13px] tabular-nums text-slate-700">
                  {fmt(row.taxAmt)}
                </td>
                <td className="px-3 py-2 align-middle text-right text-[13px] font-medium tabular-nums text-slate-900">
                  {fmt(row.amount)}
                </td>
                <td className="px-3 py-2 align-middle text-right">
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={addLine}
          className="flex items-center gap-1.5 text-[13px] font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Line
        </button>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="rounded-md border border-slate-200 px-2 py-1 text-[13px] text-slate-600 outline-none"
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}