import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../api";
import CertificatePreview from "../Certificate/CertificatePreview";

export default function CertificatePreviewPage() {
  const [searchParams] = useSearchParams();
  const cid = searchParams.get("cid");

  const [data, setData] = useState(null);
  const previewRef = useRef();

  useEffect(() => {
    if (cid) {
      API.get(`/certificates/verify/${cid}`)
        .then((res) => setData(res.data))
        .catch(() => setData(null));
    }
  }, [cid]);

  if (!data) return <p className="text-center mt-20">Loading certificate...</p>;

  return (
    <div className="flex flex-col items-center p-6">
      <button
        onClick={() => previewRef.current.downloadPdf()}
        className="mb-4 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
      >
        Download PDF
      </button>

      <CertificatePreview
        ref={previewRef}
        name={data.name}
        course={data.course}
        issued_date={data.issuedDate}
        certificate_type="Course"
      />
    </div>
  );
}
