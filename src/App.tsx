import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "@/lib/ProtectedRoute" 
import GuestRoute from "@/lib/GuestRoute" 

// Lazy load pages
const DashboardPage = lazy(() => import("@/pages/DashboardPage"))
const LoginPage = lazy(() => import("@/pages/LoginPage"))
const Sektoral = lazy(() => import("@/pages/sektoral/data/DataSektoral"))
const RelokasiSektoral = lazy(() => import("@/pages/sektoral/relokasi/RelokasiSektoral"))
const CreateSektoral = lazy(() => import("@/pages/sektoral/data/CreateSektoral"))
const MonitoringData = lazy(() => import("@/pages/monitoring/monitoringData"))
const DataOpd = lazy(() => import("@/pages/references/opd/DataOpd"))
const DataUrusan = lazy(() => import("@/pages/references/urusan/DataUrusan"))
const DataBuku = lazy(() => import("@/pages/references/buku/DataBuku"))
const CreateBuku = lazy(() => import("@/pages/references/buku/CreateBuku"))
const AkunKepalaBidang = lazy(() => import("@/pages/akun/AkunKepalaBidang"))
const CreateKepala = lazy(() => import("@/pages/akun/CreateKepala"))
const CreateKepalaDinas = lazy(() => import("@/pages/akun/CreateKepalaDinas"))
const AkunKepalaDinas = lazy(() => import("@/pages/akun/AkunKepalaDinas"))
const Profile = lazy(() => import("@/pages/profile/profile"))
const BerandaLanding = lazy(() => import("@/pages/landing/beranda/Index"))
const DatasetLanding = lazy(() => import("@/pages/landing/dataset/Dataset"))
const DatasetDetailLanding = lazy(() => import("@/pages/landing/dataset/Detail"))
const SektoralLanding = lazy(() => import("@/pages/landing/sektoral/Sektoral"))
const UrusanLanding = lazy(() => import("@/pages/landing/urusan/Urusan"))
const OrganisasiLanding = lazy(() => import("@/pages/landing/organisasi/Organisasi"))
const PublikasiLanding = lazy(() => import("@/pages/landing/publikasi/Publikasi"))
const PublikasiBukuLanding = lazy(() => import("@/pages/landing/publikasi/Buku"))
const KontakLanding = lazy(() => import("@/pages/landing/kontak/Kontak"))
const NotfoundLanding = lazy(() => import("@/pages/notfound/Landing"))
const NotfoundAdmin = lazy(() => import("@/pages/notfound/Admin"))


function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-600">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-500"></div>
          <p className="mt-4 text-sm font-medium">Please wait...</p>
        </div>
      }
    >
      <Routes>
        {/* Guest route */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        <Route
          path="/"
          element={
            <GuestRoute>
              <BerandaLanding />
            </GuestRoute>
          }
        />

        <Route
          path="/dataset-landing"
          element={
            <GuestRoute>
              <DatasetLanding />
            </GuestRoute>
          }
        />

        <Route
          path="/dataset-detail-landing/:id"
          element={
            <GuestRoute>
              <DatasetDetailLanding />
            </GuestRoute>
          }
        />

        <Route
          path="/sektoral-landing"
          element={
            <GuestRoute>
              <SektoralLanding />
            </GuestRoute>
          }
        />

        <Route
          path="/urusan-landing"
          element={
            <GuestRoute>
              <UrusanLanding />
            </GuestRoute>
          }
        />

        <Route
          path="/organisasi-landing"
          element={
            <GuestRoute>
              <OrganisasiLanding />
            </GuestRoute>
          }
        />

        <Route
          path="/publikasi-landing"
          element={
            <GuestRoute>
              <PublikasiLanding />
            </GuestRoute>
          }
        />


        <Route
          path="/publikasi-buku-landing/:slug"
          element={
            <GuestRoute>
              <PublikasiBukuLanding />
            </GuestRoute>
          }
        />

        <Route
          path="/kontak-landing"
          element={
            <GuestRoute>
              <KontakLanding />
            </GuestRoute>
          }
        />

        <Route
          path="/Notfound-landing"
          element={
            <GuestRoute>
              <NotfoundLanding />
            </GuestRoute>
          }
        />

      {/* Protected routes */}
        <Route
          path="/notfound-admin"
          element={
            <ProtectedRoute>
              <NotfoundAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-sektoral"
          element={
            <ProtectedRoute>
              <Sektoral />
            </ProtectedRoute>
          }
        />
        <Route
          path="/relokasi-sektoral"
          element={
            <ProtectedRoute>
              <RelokasiSektoral />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-sektoral"
          element={
            <ProtectedRoute>
              <CreateSektoral />
            </ProtectedRoute>
          }
        />
        <Route
          path="/monitoring-data"
          element={
            <ProtectedRoute>
              <MonitoringData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-opd"
          element={
            <ProtectedRoute>
              <DataOpd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-urusan"
          element={
            <ProtectedRoute>
              <DataUrusan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-buku"
          element={
            <ProtectedRoute>
              <DataBuku />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-buku"
          element={
            <ProtectedRoute>
              <CreateBuku />
            </ProtectedRoute>
          }
        />
        <Route
          path="/akun-kepala-bidang"
          element={
            <ProtectedRoute>
              <AkunKepalaBidang />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-kepala"
          element={
            <ProtectedRoute>
              <CreateKepala />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-kepala-dinas"
          element={
            <ProtectedRoute>
              <CreateKepalaDinas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/akun-kepala-dinas"
          element={
            <ProtectedRoute>
              <AkunKepalaDinas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Suspense>
  )
}

export default App
