import React, { forwardRef, useImperativeHandle, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import template from "../../assets/certificate_template.png";
import "../Certificate/certificate-preview.css";

const CertificatePreview = forwardRef(
  ({ name, course, issued_date, certificate_type }, ref) => {
    const wrapperRef = useRef();

    useImperativeHandle(ref, () => ({
      async downloadPdf() {
        const canvas = await html2canvas(wrapperRef.current, {
          scale: 2,
          useCORS: true,
        });

        const img = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(img, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("BM_Certificate.pdf");
      },
    }));

    return (
      <div
        ref={wrapperRef}
        style={{ width: 1123, height: 794, position: "relative", marginTop: "60px" }}
        className="cert-root"
      >
        <img src={template} className="cert-bg" alt="Certificate Template" />

        <div className="cert-text line1">
          This certificate is awarded to Mr./Ms. <strong>{name}</strong> for the
        </div>

        <div className="cert-text line2a">successful completion of</div>

        <div className="cert-text line2b">
          <strong>Professional certificate in {course}</strong>
        </div>

        <div className="cert-text line3">
          <strong>{certificate_type}</strong>
        </div>

        <div className="cert-text issued">Issued on {issued_date}</div>
      </div>
    );
  }
);

export default CertificatePreview;
