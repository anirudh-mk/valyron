import * as React from "react"

import {Input} from "@/components/base/input"

function UnitConfiguration() {
  return (
    <div className="flex h-9 items-center gap-2 rounded-sm border border-input bg-blue-50 px-2">
      <Input
        id="purchase-conversion"
        type="number"
        defaultValue={1}
        className="h-7 w-20 bg-background"
      />

      <span className="whitespace-nowrap text-sm text-muted-foreground">
          Purchase Unit =
        </span>

      <Input
        id="sales-conversion"
        type="number"
        defaultValue={1}
        className="h-7 w-20 bg-background"
      />

      <span className="whitespace-nowrap text-sm text-muted-foreground">
          Sales Unit
        </span>
    </div>
  )
}

export {UnitConfiguration}