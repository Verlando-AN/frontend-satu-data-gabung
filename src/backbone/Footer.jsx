import Logo from "@/assets/IMG_Logo.png";
import "@/css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          <div className="footer-column">
            <div className="footer-logo">
              <img
                src={Logo}
                alt="Lamtim Open Data Logo"
              />
            </div>
            <h5 className="footer-title">Tentang Kami</h5>
            <p className="footer-text">
              Portal data terbuka Kabupaten Lampung Timur yang menyediakan akses informasi publik
              untuk transparansi dan pembangunan daerah yang lebih baik.
            </p>
          </div>

          <div className="hubungi">
            <div className="footer-column">
              <h5 className="footer-title">Hubungi Kami</h5>
              <div className="footer-contact">
                <div className="footer-contact-header">
                  <p className="contact-name">Dinas Kominfo dan Statistik</p>
                  <p className="contact-location">Kabupaten Lampung Timur</p>
                </div>
                
                <div className="footer-contact-item">
                  <span className="contact-icon">✉</span>
                  <a href="" className="contact-link">
                    email
                  </a>
                </div>
                
                <div className="footer-contact-item">
                  <span className="contact-icon">☎</span>
                  <a href="" className="contact-link">
                    081369774001
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-column">
            <h5 className="footer-title">Lokasi Kami</h5>
            <div className="footer-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1017317.2832691391!2d105.743749!3d-5.120516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40edbc6c11ef3d%3A0x3039d80b220cfe0!2sKabupaten%20Lampung%20Timur%2C%20Lampung!5e0!3m2!1sid!2sid!4v1761677801877!5m2!1sid!2sid"
                width="100%"
                height="100%"
                title="Lokasi Kabupaten Lampung Timur"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-grid">
            <div className="footer-copyright">
              <p>
                © 2025 <span className="copyright-brand">Lamtim Open Data</span>. All rights reserved.
              </p>
            </div>
            <div className="footer-credits">
              <p>
                Dinas Komunikasi, Informatika dan Statistik<br className="mobile-break" />
                <span className="desktop-separator"> - </span>Kabupaten Lampung Timur
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}