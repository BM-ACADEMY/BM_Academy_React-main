import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import template from "../../assets/certificate_template.png";
import "../Pages/certificate-preview.css";

const CERT_WIDTH = 1123;
const CERT_HEIGHT = 794;

const CertificatePreview = forwardRef(
  ({ name, course, issued_date, certificate_type, certificate_id }, ref) => {
    const wrapperRef = useRef(null);

    // -------------------- PDF DOWNLOAD --------------------
    useImperativeHandle(ref, () => ({
      async downloadPdf() {
        console.log("Attempting to download PDF...");

        if (!wrapperRef.current) {
          console.error("Ref is null - cannot find certificate element");
          return;
        }

        try {
          const canvas = await html2canvas(wrapperRef.current, {
            scale: 3, // High resolution for clear text
            useCORS: true, // Required for images
            // allowTaint: true,  <-- REMOVED: This was causing the crash
            logging: true,
            backgroundColor: "#ffffff",
            width: CERT_WIDTH,
            height: CERT_HEIGHT,
            windowWidth: CERT_WIDTH,
            windowHeight: CERT_HEIGHT,
            scrollY: -window.scrollY, // Fixes white space if page is scrolled
            x: 0,
            y: 0,
          });

          console.log("Canvas created, generating PDF...");

          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
          });

          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();

          pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
          pdf.save(`certificate-${certificate_id || "download"}.pdf`);

          console.log("PDF Download triggered.");
        } catch (error) {
          console.error("PDF Generation Failed:", error);
          alert("Could not generate PDF. Please check the browser console for specific error details.");
        }
      },
    }));

    return (
      <div
        className="flex items-center justify-center w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Responsive scaler */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "90vw",
            maxHeight: "85vh",
          }}
        >
          <div
            style={{
              width: CERT_WIDTH,
              height: CERT_HEIGHT,
              transform: "scale(min(90vw / 1123, 85vh / 794))",
              transformOrigin: "center center",
            }}
          >
            {/* Actual certificate (native size) */}
            <div
              ref={wrapperRef}
              className="cert-root"
              style={{
                width: CERT_WIDTH,
                height: CERT_HEIGHT,
                position: "relative",
                backgroundColor: "white",
                overflow: "hidden"
              }}
            >
              {/* Background Image */}
              <img
                src={template}
                className="cert-bg"
                alt="Certificate Template"
                crossOrigin="anonymous"
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
              />

              {/* Text Layer */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div className="cert-text line1">
                  This certificate is awarded to Mr./Ms.{" "}
                  <strong>{name}</strong> for the
                </div>

                <div className="cert-text line2a">
                  successful completion of
                </div>

                <div className="cert-text line2b">
                  <strong>Professional certificate in {course}</strong>
                </div>

                <div className="cert-text line3">
                  <strong>{certificate_type}</strong>
                </div>

                <div className="cert-text issued">
                  Issued on {issued_date}
                </div>

                {certificate_id && (
                  <div className="cert-text cert-id">
                    Certificate ID: <strong>{certificate_id}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default CertificatePreview;
