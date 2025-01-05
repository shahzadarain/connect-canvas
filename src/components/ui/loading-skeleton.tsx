import { Card } from "@/components/ui/card"

export function ToolCardSkeleton() {
  return (
    <Card className="p-4 space-y-4 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </Card>
  )
}

export function ToolsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6).fill(0).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  )
}