import { useState, useRef } from "react";
import API from "../../api";
import { toast } from "react-toastify";
import CertificatePreview from "./CertificatePreview"; // <-- IMPORT
import "./certificate-preview.css";

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 REF for hidden PDF preview
  const previewRef = useRef();

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!certificateId.trim()) {
      toast.warn("Please enter a certificate ID");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await API.get(`/certificates/verify/${certificateId}`);
      setResult({ ...res.data, certificateId });

      if (res.data.valid) {
        toast.success("Certificate verified!");
      } else {
        toast.error("❌ Invalid certificate ID");
      }
    } catch (err) {
      toast.error("Something went wrong while verifying.");
      setResult({ valid: false });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DOWNLOAD HANDLER
  const handleDownload = () => {
    if (previewRef?.current?.downloadPdf) {
      previewRef.current.downloadPdf();
    } else {
      toast.error("Unable to generate PDF");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full text-center border-t-4 border-yellow-400">

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Verify Certificate
        </h1>

        <p className="text-gray-600 mb-6">
          Enter your certificate ID to check its authenticity.
        </p>

        {/* Form */}
        <form onSubmit={handleVerify} className="flex flex-col space-y-4">
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter Certificate ID (e.g., CERT12345)"
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none text-gray-800"
            disabled={loading}
          />

          <button
            type="submit"
            className={`px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-md hover:bg-yellow-500 transition ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Result Box */}
        {result && (
          <div className="mt-6 p-4 rounded-xl border bg-gray-50 text-left">
            {result.valid ? (
              <div>
                <h2 className="text-green-600 font-bold text-lg">
                  ✅ Certificate Verified
                </h2>

                <p className="mt-2"><strong>Name:</strong> {result.name}</p>
                <p><strong>Course:</strong> {result.course}</p>
                <p><strong>Issued Date:</strong> {result.issuedDate}</p>

                {/* 🔥 DOWNLOAD BUTTON */}
                <button
                  onClick={handleDownload}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                  📄 Download Certificate
                </button>

                {/* 🔥 HIDDEN PREVIEW (Used for PDF generation) */}
                <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
                  <CertificatePreview
                    ref={previewRef}
                    name={result.name}
                    course={result.course}
                    issued_date={result.issuedDate}
                    certificate_type="Course"
                  />
                </div>
              </div>
            ) : (
              <p className="text-red-600 font-semibold text-center">
                ❌ Invalid Certificate ID
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
