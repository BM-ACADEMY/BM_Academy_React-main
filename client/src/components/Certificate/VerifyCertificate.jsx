import { useState } from "react";
import API from "../../api";
import { toast } from "react-toastify";

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setResult(res.data);

      if (res.data.valid) {
        // ✅ Auto remove trailing slash safely
        const base = API.defaults.baseURL.replace(/\/$/, "");
        const downloadUrl = `${base}/certificates/download/${certificateId}/`;

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", `BM_CERT_${certificateId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("✅ Certificate verified and downloaded successfully!");
      } else {
        toast.error("❌ Invalid certificate ID");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while verifying.");
      setResult({ valid: false });
    } finally {
      setLoading(false);
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

        <form onSubmit={handleVerify} className="flex flex-col space-y-4">
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter Certificate ID (e.g., BM_CERT_12345)"
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

        {result && (
          <div className="mt-6 p-4 rounded-xl border bg-gray-50 text-left">
            {result.valid ? (
              <div>
                <h2 className="text-green-600 font-bold text-lg">
                  ✅ Certificate Verified
                </h2>
                <p className="mt-2">
                  <span className="font-semibold">Name:</span> {result.name}
                </p>
                <p>
                  <span className="font-semibold">Course:</span> {result.course}
                </p>
                <p>
                  <span className="font-semibold">Issued Date:</span>{" "}
                  {result.issuedDate}
                </p>
                <p className="text-blue-600 underline mt-2">
                  📄 Certificate downloaded automatically
                </p>
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
