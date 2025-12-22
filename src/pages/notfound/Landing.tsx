import Head from "@/backbone/Header";
import Foot from "@/backbone/Footer";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <>
      <Head />
            <div className="flex flex-1 justify-center items-center p-6">
              <div className="text-center space-y-4">

                <h1 className="text-5xl font-bold text-red-600">404</h1>
                <p className="text-lg text-muted-foreground">
                  Halaman yang kamu cari tidak ditemukan.
                </p>

                <Link to="/">
                  <Button variant="default" className="mt-4">
                    Kembali ke Beranda
                  </Button>
                </Link>
              </div>
            </div>
      <Foot />
    </>
  );
}
