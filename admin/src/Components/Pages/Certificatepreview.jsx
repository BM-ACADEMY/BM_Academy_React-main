import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import template from "../../assets/certificate_template.png";
import "./certificate-preview.css";

const CertificatePreview = forwardRef(
  ({ name, course, issued_date, certificate_id }, ref) => {
    const [base64Image, setBase64Image] = useState(null);
    const printRef = useRef(null);

    // --- HELPER: Format Date ---
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };

    // 1. Load Background
    useEffect(() => {
      const convertToBase64 = async () => {
        try {
          const response = await fetch(template);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = () => setBase64Image(reader.result);
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error("Failed to load template image:", error);
        }
      };
      convertToBase64();
    }, []);

    // 2. DOWNLOAD LOGIC
    useImperativeHandle(ref, () => ({
      async downloadPdf() {
        const element = printRef.current;
        if (!element) return;

        const originalTransform = element.style.transform;
        const originalShadow = element.style.boxShadow;
        const originalBg = element.style.backgroundColor;

        try {
          // A. PREPARE
          element.style.transform = "none";
          element.style.boxShadow = "none";
          element.style.backgroundColor = "#ffffff";
          element.style.color = "#000000";

          // B. DELAY
          await new Promise((resolve) => setTimeout(resolve, 300));

          // C. CAPTURE
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false,
          });

          // D. PDF GENERATION
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("l", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(`Certificate_${name || "Student"}.pdf`);

        } catch (error) {
          console.error("PDF Error:", error);
          alert("Error: " + error.message);
        } finally {
          // E. RESTORE UI
          element.style.transform = originalTransform;
          element.style.boxShadow = originalShadow;
          element.style.backgroundColor = originalBg;
        }
      },
    }));

    return (
      <div className="flex items-center justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>

        {/* WRAPPER */}
        <div style={{
            width: "730px",
            height: "520px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#222",
            borderRadius: "8px"
        }}>

          {/* CERTIFICATE CONTAINER */}
          <div
            ref={printRef}
            style={{
              width: "1123px",
              height: "794px",
              position: "relative",
              backgroundColor: "white",
              color: "#000",
              flexShrink: 0,
              transform: "scale(0.6)",
              transformOrigin: "center center",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)"
            }}
          >
            <div className="cert-root" style={{ width: "100%", height: "100%", position: "relative" }}>
              {base64Image && (
                <img
                  src={base64Image}
                  alt="Template"
                  className="cert-bg"
                  style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      objectFit: "fill"
                  }}
                />
              )}

              {/* TEXT CONTENT */}
              <div
                className="cert-content"
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "0",
                  width: "100%",
                  textAlign: "center",
                  color: "#000000",
                }}
              >
                {/* 1. Name */}
                <div style={{ fontSize: "22px", marginBottom: "10px" }}>
                  This certificate is awarded to Mr./Ms.
                  <span style={{ fontWeight: "bold", marginLeft: "8px" }}>
                    {name || "Student Name"}
                  </span>
                </div>

                {/* 2. Course */}
                <div style={{ fontSize: "20px", marginBottom: "10px", padding: "0 50px" }}>
                  for the successful completion of the Professional Certificate Course in
                  <span style={{ fontWeight: "bold", marginLeft: "6px" }}>
                    {course || "Digital Marketing"}
                  </span>
                </div>

                {/* 3. Academy */}
                <div style={{ fontSize: "20px" }}>
                  conducted by <strong>BM Academy.</strong>
                </div>

                {/* --- LEFT SIDE: CERTIFICATE NUMBER (ID) --- */}
                {certificate_id && (
                  <div style={{
                      position: "absolute",
                      bottom: "-40%",   // Adjust height to sit on the dotted line
                      left: "80px",    // Adjust left position
                      width: "250px",   // Width of the dotted area
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#333",
                      fontFamily: "Arial, sans-serif"
                  }}>
                    {certificate_id}
                  </div>
                )}

                {/* --- RIGHT SIDE: DATE OF ISSUE --- */}
                {issued_date && (
                  <div style={{
                      position: "absolute",
                      bottom: "-41%",   // Same height as ID
                      right: "40px",   // Adjust right position
                      width: "250px",   // Width of the dotted area
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#333",
                      fontFamily: "Arial, sans-serif"
                  }}>
                    {formatDate(issued_date)}
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
