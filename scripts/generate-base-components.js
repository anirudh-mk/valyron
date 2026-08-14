import fs from 'fs';
import path from 'path';

const uiDir = 'c:/Users/lenovo/Desktop/ANIRUDH/erp-frontned/valyron/src/components/ui';
const baseDir = 'c:/Users/lenovo/Desktop/ANIRUDH/erp-frontned/valyron/src/components/base';

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(uiDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Find all named exports like `export { Foo, Bar }`
  const exportRegex = /export\s+\{\s*([^}]+)\}/g;
  let match;
  const exportsList = new Set();
  while ((match = exportRegex.exec(content)) !== null) {
    const items = match[1].split(',').map(s => s.trim()).filter(Boolean);
    items.forEach(item => exportsList.add(item));
  }

  // Find inline exports like `export const foo = ...` or `export function foo(...)`
  const inlineExportRegex = /export\s+(const|function|interface|type)\s+([a-zA-Z0-9_]+)/g;
  let inlineMatch;
  while ((inlineMatch = inlineExportRegex.exec(content)) !== null) {
    exportsList.add(inlineMatch[2]);
  }

  // Filter exports to keep only components (starting with uppercase) vs helpers/hooks/variants (lowercase)
  const allExports = Array.from(exportsList);
  const components = allExports.filter(name => /^[A-Z]/.test(name));
  const lowercaseExports = allExports.filter(name => /^[a-z]/.test(name));

  // Determine which components destructure className
  const componentConfigs = components.map(comp => {
    const funcRegex = new RegExp(`function\\s+${comp}\\s*\\(([^)]*)\\)`, 's');
    const constRegex = new RegExp(`const\\s+${comp}\\s*=\\s*React\\.forwardRef\\s*<[^>]*>\\s*\\(\\s*\\(([^)]*)\\)`, 's');
    const arrowRegex = new RegExp(`const\\s+${comp}\\s*=\\s*\\(([^)]*)\\)\\s*=>`, 's');

    let funcMatch = content.match(funcRegex);
    let constMatch = content.match(constRegex);
    let arrowMatch = content.match(arrowRegex);

    let params = '';
    let found = false;
    if (funcMatch) {
      params = funcMatch[1];
      found = true;
    } else if (constMatch) {
      params = constMatch[1];
      found = true;
    } else if (arrowMatch) {
      params = arrowMatch[1];
      found = true;
    }

    // Default to true if not found in parameter list (safe fallback)
    const hasClassName = found ? params.includes('className') : true;
    return { name: comp, hasClassName };
  });

  // Generate wrapper content
  let wrapperContent = `import * as React from "react"
import * as UI from "@/components/ui/${file.slice(0, -4)}"
import { cn } from "@/lib/utils"

`;

  // Write component wrappers
  for (const comp of componentConfigs) {
    if (comp.hasClassName) {
      wrapperContent += `const ${comp.name} = React.forwardRef<
  React.ComponentRef<typeof UI.${comp.name}>,
  React.ComponentPropsWithoutRef<typeof UI.${comp.name}>
>(({ className, ...props }, ref) => {
  return (
    <UI.${comp.name}
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
${comp.name}.displayName = "${comp.name}"

`;
    } else {
      wrapperContent += `const ${comp.name} = React.forwardRef<
  React.ComponentRef<typeof UI.${comp.name}>,
  React.ComponentPropsWithoutRef<typeof UI.${comp.name}>
>((props, ref) => {
  return (
    <UI.${comp.name}
      ref={ref}
      {...props}
    />
  )
})
${comp.name}.displayName = "${comp.name}"

`;
    }
  }

  // Write lowercase re-exports
  for (const lc of lowercaseExports) {
    wrapperContent += `const ${lc} = UI.${lc}\n`;
  }
  if (lowercaseExports.length > 0) {
    wrapperContent += '\n';
  }

  // Export everything
  const allToExport = [...components, ...lowercaseExports];
  wrapperContent += `export { ${allToExport.join(', ')} }\n`;

  const destPath = path.join(baseDir, file);
  fs.writeFileSync(destPath, wrapperContent, 'utf-8');
  console.log(`Generated wrapper for: ${file}`);
}

console.log('All base components generated successfully!');
