import { useEffect, useState } from "react";
import { IoDocumentAttach } from "react-icons/io5";
import { Document, Page } from "react-pdf";


export default function DocumentAttachment({
  selectedDocument,
  removeSelectedDocument,
}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (selectedDocument && selectedDocument.type === "application/pdf") {
      setPreview(true);
    } else {
      setPreview(false);
    }
  }, [selectedDocument]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <>
      {selectedDocument && (
        <div className="document-preview">
          <div className="p-0 border-0">
            <div className="preview d-flex flex-column justify-content-center align-items-center p-2">
              {preview ? (
                <>
                  <Document
                    file={selectedDocument}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} height={300} />
                  </Document>
                  <p className="m-0 text-center text-white small">
                    Page {pageNumber} of {numPages}
                  </p>
                </>
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white">
                  <IoDocumentAttach size={"6rem"} />
                  <p className="m-0 text-center">Preview Unavailable</p>
                </div>
              )}
            </div>
            <p className="m-0 py-2 text-bg-light text-center">
              {selectedDocument.name}
            </p>
            <button className="remove-preview" onClick={removeSelectedDocument}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
