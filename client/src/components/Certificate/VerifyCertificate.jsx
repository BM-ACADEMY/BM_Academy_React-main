import { useState, useRef } from "react";
import API from "../../api";
import { toast } from "react-toastify";
import CertificatePreview from "./CertificatePreview";
import { FaCheckCircle, FaTimesCircle, FaDownload, FaSearch, FaCertificate } from "react-icons/fa";
import "./certificate-preview.css";

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // REF for hidden PDF preview
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

  const handleDownload = () => {
    if (previewRef?.current?.downloadPdf) {
      previewRef.current.downloadPdf();
    } else {
      toast.error("Unable to generate PDF");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-20 font-sans">

      {/* --- MAIN CARD --- */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden border border-gray-100">

        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#FFEA00]"></div>

        {/* Header Icon */}
        <div className="w-16 h-16 bg-black text-[#FFEA00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <FaCertificate size={32} />
        </div>

        <h1 className="text-3xl font-extrabold text-[#111111] mb-3">
          Verify Certificate
        </h1>

        <p className="text-gray-500 mb-8">
          Enter your unique certificate ID to check authenticity and download your digital copy.
        </p>

        {/* --- FORM --- */}
        <form onSubmit={handleVerify} className="flex flex-col space-y-4 relative z-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FaSearch />
            </div>
            <input
              type="text"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="Enter ID (e.g., BM-DM-2024)"
              className="w-full border-2 border-gray-200 bg-gray-50 rounded-lg pl-10 pr-4 py-4 focus:ring-0 focus:border-[#FFEA00] focus:bg-white outline-none text-[#111111] font-bold transition-all placeholder-gray-400"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-4 bg-[#111111] text-white font-bold uppercase tracking-wider rounded-lg shadow-lg hover:bg-[#FFEA00] hover:text-black transition-all duration-300 flex items-center justify-center gap-2 ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">Verifying...</span>
            ) : (
              <>Verify Now</>
            )}
          </button>
        </form>

        {/* --- RESULT AREA --- */}
        {result && (
          <div className={`mt-8 p-6 rounded-xl border-l-4 text-left transition-all duration-500 transform translate-y-0 opacity-100 ${
            result.valid
              ? "bg-green-50 border-green-500 shadow-sm"
              : "bg-red-50 border-red-500 shadow-sm"
          }`}>

            {result.valid ? (
              <div>
                <div className="flex items-center gap-3 mb-4 border-b border-green-100 pb-4">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <h2 className="text-green-800 font-bold text-lg">
                    Certificate Verified
                  </h2>
                </div>

                <div className="space-y-2 text-sm text-gray-700 mb-6">
                  <p><span className="font-bold text-gray-900 w-24 inline-block">Name:</span> {result.name}</p>
                  <p><span className="font-bold text-gray-900 w-24 inline-block">Course:</span> {result.course}</p>
                  <p><span className="font-bold text-gray-900 w-24 inline-block">Issued On:</span> {result.issuedDate}</p>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="w-full py-3 bg-white border border-gray-200 text-[#111111] font-bold rounded-lg shadow-sm hover:border-[#FFEA00] hover:bg-yellow-50 transition-all flex items-center justify-center gap-2"
                >
                  <FaDownload className="text-sm" /> Download Copy
                </button>

                {/* HIDDEN PREVIEW (Used for PDF generation) */}
                <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
                  <CertificatePreview
                    ref={previewRef}
                    name={result.name}
                    course={result.course}
                    issued_date={result.issuedDate}
                    certificate_type="Course"
                    certificate_id={result.certificateId}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-2">
                <FaTimesCircle className="text-red-500 text-3xl mb-2" />
                <p className="text-red-800 font-bold">Invalid Certificate ID</p>
                <p className="text-red-600 text-sm mt-1">Please check the ID and try again.</p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Footer Text */}
      <p className="mt-8 text-gray-400 text-sm">
        Protected by BM Academy Verification System
      </p>

    </div>
  );
}
