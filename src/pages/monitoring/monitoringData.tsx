import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useMonitoringData } from "@/hooks/useMonitoringData"
import { useDataSektoral } from "@/hooks/useDataSektoral";
import {
  HeaderSection,
  StatsCards,
  ChartsSection,
  FilterSection,
  TableSection,
  PaginationSection
} from "@/components/MonitoringDataComponents"

export default function MonitoringData() {
  const {
    data,
    loading,
    perPage,
    setPerPage,
    active,
    setActive,
    opd,
    setOpd,
    listOpd,
    page,
    setPage,
    pageCount,
    totalCount,
    exportToPDF,
    activeCount, 
    inactiveCount,
    chartData,
    pieData,
    refreshData,
    
  } = useMonitoringData()

  const handlePerPageChange = (value: string) => {
    setPerPage(value)
    setPage(1)
  }

  const handleActiveChange = (value: string) => {
    setActive(value)
    setPage(1)
  }

  const handleOpdChange = (value: string) => {
    setOpd(value)
    setPage(1)
  }

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-col flex-1 gap-6 p-6 bg-muted/30">
              <HeaderSection 
                onRefresh={refreshData} 
                onExportPDF={exportToPDF} 
              />

              <StatsCards 
                totalCount={totalCount}
                activeCount={activeCount}
                inactiveCount={inactiveCount}
                opdCount={listOpd.length}
              />

              <ChartsSection 
                chartData={chartData}
                pieData={pieData}
              />

              <FilterSection 
                perPage={perPage}
                setPerPage={handlePerPageChange}
                active={active}
                setActive={handleActiveChange}
                opd={opd}
                setOpd={handleOpdChange}
                listOpd={listOpd}
              />

              <TableSection 
                loading={loading}
                data={data}
                totalCount={totalCount}
              />

              {!loading && data.length > 0 && (
                <PaginationSection 
                  page={page}
                  pageCount={pageCount}
                  setPage={setPage}
                />
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}