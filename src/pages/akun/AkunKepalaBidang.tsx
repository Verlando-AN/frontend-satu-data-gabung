import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { useAkunKepalaBidang } from "@/hooks/useAkunKepalaBidang"
import {
  HeaderSection,
  StatsCards,
  FilterSection,
  TableSection,
  SummaryInfo
} from "@/components/AkunKepalaBidangComponents"

export default function AkunKepalaBidang() {
  const {
    data,
    filteredData,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    activeCount,
    inactiveCount,
    refreshData,
    resetFilters
  } = useAkunKepalaBidang()

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-1 flex-col gap-6 p-6 bg-muted/30">
              <HeaderSection onRefresh={refreshData} />

              <StatsCards 
                totalCount={data.length}
                activeCount={activeCount}
                inactiveCount={inactiveCount}
                filteredCount={filteredData.length}
              />

              <FilterSection 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onResetFilters={resetFilters}
              />

              <TableSection 
                loading={loading}
                filteredData={filteredData}
                totalCount={data.length}
                searchQuery={searchQuery}
                statusFilter={statusFilter}
              />

              <SummaryInfo 
                filteredData={filteredData}
                totalCount={data.length}
                activeCount={activeCount}
                inactiveCount={inactiveCount}
                searchQuery={searchQuery}
                statusFilter={statusFilter}
              />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}