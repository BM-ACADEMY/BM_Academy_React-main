import React, { forwardRef, useImperativeHandle, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import template from "../../assets/certificate_template.png";
import "../Pages/certificate-preview.css";

const CertificatePreview = forwardRef(
  ({ name, course, issued_date, certificate_type, certificate_id }, ref) => {
    const wrapperRef = useRef();

    useImperativeHandle(ref, () => ({
      async downloadPdf() {
        const canvas = await html2canvas(wrapperRef.current, {
          scale: 2,
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [
            wrapperRef.current.offsetWidth,
            wrapperRef.current.offsetHeight,
          ],
        });

        pdf.addImage(
          imgData,
          "PNG",
          0,
          0,
          wrapperRef.current.offsetWidth,
          wrapperRef.current.offsetHeight
        );

        pdf.save("certificate.pdf");
      },
    }));

    return (
      <div style={{ marginTop: "60px" }}>
        <div
          ref={wrapperRef}
          style={{ width: 1123, height: 794, position: "relative" }}
          className="cert-root"
        >
          {/* Certificate Background */}
          <img src={template} className="cert-bg" alt="Certificate Template" />

          {/* Certificate Text */}
          <div className="cert-text line1">
            This certificate is awarded to Mr./Ms. <strong>{name}</strong> for
            the
          </div>

          <div className="cert-text line2a">successful completion of</div>

          <div className="cert-text line2b">
            <strong>Professional certificate in {course}</strong>
          </div>

          <div className="cert-text line3">
            <strong>{certificate_type}</strong>
          </div>

          <div className="cert-text issued">Issued on {issued_date}</div>
          {certificate_id && (
  <div className="cert-text cert-id">
    Certificate ID: <strong>{certificate_id}</strong>
  </div>
)}

        </div>
      </div>
    );
  }
);

export default CertificatePreview;
