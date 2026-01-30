import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import jsPDF from "jspdf";
import template from "../../assets/certificate_template.png";
import "../Pages/certificate-preview.css";

// A4 Dimensions in mm
const PDF_WIDTH = 297;
const PDF_HEIGHT = 210;

const CertificatePreview = forwardRef(
  ({ name, course, issued_date, certificate_type, certificate_id }, ref) => {
    const [base64Image, setBase64Image] = useState(null);

    // 1. Load the background image as Base64 to ensure it works offline/in-PDF
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

    // 2. The Download Logic (Native PDF Generation)
    useImperativeHandle(ref, () => ({
      async downloadPdf() {
        if (!base64Image) {
          alert("Template not loaded yet. Please wait a moment.");
          return;
        }

        try {
          // Initialize PDF (Landscape, mm, A4)
          const doc = new jsPDF("l", "mm", "a4");

          // A. Add Background Image (Full Page)
          doc.addImage(base64Image, "PNG", 0, 0, PDF_WIDTH, PDF_HEIGHT);

          // B. Add Text
          // We use "times" font to match the certificate style.
          doc.setFont("times", "normal");
          doc.setTextColor(60, 60, 60); // Dark Gray

          // Helper for centering text
          const centerX = PDF_WIDTH / 2;

          // -- Line 1: "This certificate is awarded to..."
          doc.setFontSize(14);
          doc.text("This certificate is awarded to Mr./Ms.", centerX, 95, { align: "center" });

          // -- Name (Bold & Large)
          doc.setFont("times", "bold");
          doc.setFontSize(28); // Bigger font for name
          doc.setTextColor(0, 0, 0); // Black
          doc.text(name || "Student Name", centerX, 110, { align: "center" });

          // -- Line 2: "for the successful completion of"
          doc.setFont("times", "normal");
          doc.setFontSize(14);
          doc.setTextColor(60, 60, 60);
          doc.text("for the successful completion of", centerX, 125, { align: "center" });

          // -- Course Title (Bold)
          doc.setFont("times", "bold");
          doc.setFontSize(22);
          doc.setTextColor(0, 0, 0);
          const courseText = `Professional Certificate in ${course || "Course Name"} ${certificate_type || ""}`;
          doc.text(courseText, centerX, 140, { align: "center" });

          // -- Issued Date
          doc.setFont("times", "normal");
          doc.setFontSize(12);
          doc.setTextColor(80, 80, 80);
          doc.text(`Issued on ${issued_date}`, centerX, 165, { align: "center" });

          // -- Certificate ID (Bottom Center or Corner)
          if (certificate_id) {
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Certificate ID: ${certificate_id}`, centerX, 175, { align: "center" });
          }

          // C. Save
          doc.save(`Certificate_${name.replace(/\s+/g, "_")}.pdf`);

        } catch (error) {
          console.error("PDF Generation Error:", error);
          throw new Error("Could not generate PDF");
        }
      },
    }));

    // 3. The Visual Preview (HTML/CSS)
    // This is what the user SEES on screen. The PDF is generated separately above.
    return (
      <div className="flex items-center justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative flex items-center justify-center" style={{ width: "100%", height: "100%", maxWidth: "90vw", maxHeight: "85vh" }}>

          {/* Scaler to fit screen */}
          <div style={{ width: 1123, height: 794, transform: "scale(min(90vw / 1123, 85vh / 794))", transformOrigin: "center center" }}>

            <div className="cert-root" style={{ width: 1123, height: 794, position: "relative", backgroundColor: "white", overflow: "hidden" }}>
              {/* Background */}
              {base64Image && (
                <img src={base64Image} alt="Certificate" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, zIndex: 0 }} />
              )}

              {/* HTML Overlay Text (Matches PDF coordinates visually) */}
              <div style={{ position: "relative", zIndex: 10, textAlign: "center", paddingTop: "340px" }}> {/* Adjusted padding to match PDF layout */}

                <div style={{ fontSize: "24px", fontFamily: "Times New Roman", color: "#444" }}>
                  This certificate is awarded to Mr./Ms.
                </div>

                <div style={{ fontSize: "48px", fontFamily: "Times New Roman", fontWeight: "bold", margin: "10px 0", color: "#000" }}>
                  {name}
                </div>

                <div style={{ fontSize: "24px", fontFamily: "Times New Roman", color: "#444" }}>
                  for the successful completion of
                </div>

                <div style={{ fontSize: "36px", fontFamily: "Times New Roman", fontWeight: "bold", margin: "20px 0", color: "#000" }}>
                  Professional Certificate in {course} {certificate_type}
                </div>

                <div style={{ fontSize: "20px", fontFamily: "Times New Roman", marginTop: "40px", color: "#555" }}>
                  Issued on {issued_date}
                </div>

                {certificate_id && (
                  <div style={{ fontSize: "16px", fontFamily: "Times New Roman", marginTop: "10px", color: "#777" }}>
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
