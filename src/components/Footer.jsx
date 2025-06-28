export default function Footer() {
  return (
    <div className="d-flex justify-content-between align-items-center footer-container">
      <div className="footer-left">
        <h5>Boolshop spa</h5>
        <p>Sede legale: Milano, Via Montenapoleone, 432</p>
      </div>
      <div className="footer-center">
        <img src="../../logo.png" className="img-fluid" alt="" />
      </div>
      <div className="footer-right">
        <h6>Contatti:</h6>
        <p>Email: boolshop@gmail.com</p>
        <p>Telefono: +39 0123 456 87</p>
        <div className="d-flex gap-3">
          <a
            href="/"
            target="_blank"
            className="text-decoration-none text-dark"
          >
            <i className="bi bi-facebook" style={{ fontSize: "1.5rem" }}></i>
          </a>
          <a
            href="/"
            target="_blank"
            className="text-decoration-none text-dark"
          >
            <i className="bi bi-instagram" style={{ fontSize: "1.5rem" }}></i>
          </a>
          <a
            href="/"
            target="_blank"
            className="text-decoration-none text-dark"
          >
            <i className="bi bi-twitter-x" style={{ fontSize: "1.5rem" }}></i>
          </a>
        </div>
      </div>
    </div>
  );
}
