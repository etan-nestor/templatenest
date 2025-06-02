// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  )
}