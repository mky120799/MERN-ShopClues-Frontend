import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

const AdminCredentialBox = () => {
  const [copied, setCopied] = useState(false);

  const adminCreds = {
    email: "admin@gmail.com",
    password: "Mithilesh@123",
  };

  const handleCopy = () => {
    const credentials = `email: ${adminCreds.email}\npassword: ${adminCreds.password}`;
    navigator.clipboard.writeText(credentials);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mt-6 relative max-w-md mx-auto">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">
        Try Admin Login👨🏻‍💼👇
      </h3>
      <div className="text-sm text-gray-600 font-mono whitespace-pre-line">
        email: {adminCreds.email}
        <br />
        password: {adminCreds.password}
      </div>

      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800"
      >
        {copied ? (
          <>
            <CheckIcon className="w-4 h-4"/>
            Copied
          </>
        ) : (
          <>
            <ClipboardDocumentIcon className="w-4 h-4" />
            Copy
          </>
        )}
      </button>
    </div>
  );
};

export default AdminCredentialBox;
