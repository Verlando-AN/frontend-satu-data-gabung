import { useState } from 'react';
import "../../css/kontak.css";
import Logo from "../../../assets/IMG_Logo.png"
import lokasi from "../../../assets/lokasi.png";
// import { Button } from "@/components/ui/button"

export default function Kontak() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container-kontak">

      {/* <div className="p-6">
        <Button>Click Me</Button>
      </div> */}
      
        <div className="text-center mb-5">
          <h2 className="judul">
            Kontak
          </h2>
          <p className="text-kontak">
            Informasi lebih lanjut dapat menghubungi melalui informasi kontak di bawah ini.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="bg-white rounded shadow-sm p-4 h-100">
              <h4 className="informasi">
                Informasi Kontak
              </h4>

              <div className="mb-4">
                <div className="d-flex align-items-center">
                   <img 
                        src={Logo}
                        className='logo'
                        alt="logo"
                        />
                </div>
              </div>

              <p className="deskripsi-kontak">
                Satu Data adalah sebuah inisiatif pemerintah Indonesia untuk mendorong 
                penggunaan kebijakan berdasarkan data. Untuk mewujudkan hal tersebut, 
                diperlukan pemahaman atas satu pemerintah yang akurat, terbuka, dan 
                interoperable.
              </p>

              <div classNamestyle="detail-kontak">
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
          </div>

          <div className="peasan-kontak">
            <div className="bg-white rounded shadow-sm p-4 h-100">
              <h4 className="mb-4">
                Kirim Pesan Kepada Kami
              </h4>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama"
                    className="form-control"
                    placeholder="Masukkan nama Anda"
                    value={formData.nama}
                    onChange={handleChange}/>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Masukkan email Anda"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Pesan
                  </label>
                  <textarea
                    name="pesan"
                    className="form-control"
                    rows="5"
                    placeholder="Tuliskan pesan Anda"
                    value={formData.pesan}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn w-100">
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>

        <section className='Lokasi-kontak'>
          <div className='ikon-lokasi'>
            <img 
              src={lokasi}
              alt="Lokasi Kami"
              className="location"
            />
            <h4>
                  Lokasi Kami
            </h4>
          </div>
              
            <div className="bg-white rounded shadow-sm p-4">
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1017317.2832691391!2d105.743749!3d-5.120516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40edbc6c11ef3d%3A0x3039d80b220cfe0!2sKabupaten%20Lampung%20Timur%2C%20Lampung!5e0!3m2!1sid!2sid!4v1761677801877!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
        </section>
    </div>
  );
}