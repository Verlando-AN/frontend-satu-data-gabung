import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import "@/css/kontak.css";
import Logo from "@/assets/IMG_Logo.png";
import Head from "@/backbone/Header";
import Foot from "@/backbone/Footer";

interface FormData {
  nama: string;
  email: string;
  pesan: string;
}

export default function Kontak(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    email: '',
    pesan: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Head />
      <div className="container-kontak">
        <div className="judul-kontak">
          <h2 className="judul">Contact Us</h2>
          <p className="text-kontak">
            Informasi lebih lanjut dapat menghubungi melalui informasi kontak di bawah ini.
          </p>
        </div>

        <div className="informasi-kontak">
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <img 
                src={Logo}
                className="logo"
                alt="Satu Data Logo"
              />
            </div>
          </div>

          <p className="deskripsi-kontak">
            Satu Data adalah sebuah inisiatif pemerintah Indonesia untuk mendorong 
            penggunaan kebijakan berdasarkan data. Untuk mewujudkan hal tersebut, 
            diperlukan pemahaman atas satu pemerintah yang akurat, terbuka, dan 
            interoperable.
          </p>

          <div className="detail-kontak">
            <p className="mb-2">
              <strong>Alamat:</strong> Jl. Budi Anak Tuha No. 1 Sukadana, Lampung Timur
            </p>
            <p className="mb-2">
              <strong>No Telepon:</strong> +1 234 567 890
            </p>
            <p className="mb-0">
              <strong>Email:</strong> info@example.com
            </p>
          </div>
        </div>

        <section className="lokasi-kontak">
          <div className="peta">
            <div style={{ 
              width: '100%', 
              height: '500px', 
              backgroundColor: '#e9ecef',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1017317.2832691391!2d105.743749!3d-5.120516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40edbc6c11ef3d%3A0x3039d80b220cfe0!2sKabupaten%20Lampung%20Timur%2C%20Lampung!5e0!3m2!1sid!2sid!4v1761677801877!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Lampung Timur"
              />
            </div>
          </div>
        </section>

        <div className="pesan-kontak">
          <h4>Kirim Pesan Kepada Kami</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="nama">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                className="form-control"
                placeholder="Masukkan nama Anda"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="pesan">
                Pesan
              </label>
              <textarea
                id="pesan"
                name="pesan"
                className="form-control"
                rows={5}
                placeholder="Tuliskan pesan Anda"
                value={formData.pesan}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-kontak">
              Kirim Pesan Sekarang
            </button>
          </form>
        </div>
      </div>
      <Foot />
    </>
  );
}
