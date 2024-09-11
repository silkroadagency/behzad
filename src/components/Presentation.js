import React, { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import { FaExpand, FaCompress } from "react-icons/fa"; // برای آیکون ها
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import pdfFile from "../pdf.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const maxWidth = 800;

export default function Presentation() {
  const [file, setFile] = useState(pdfFile);
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onResize = useCallback((entries) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, {}, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.requestFullscreen().catch((err) => {
        console.error(err);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <div
        className={`relative w-full max-w-4xl overflow-y-auto p-4 bg-white shadow-2xl rounded-lg transition-all duration-300 ${
          isFullScreen ? "h-full" : "h-[80vh]"
        }`}
        ref={setContainerRef}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {Array.from(new Array(numPages), (_el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={
                containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
              }
              className="mx-auto my-4 shadow-lg border rounded-md"
            />
          ))}
        </Document>
      </div>

      <div className="absolute top-4 right-4">
        <button
          onClick={toggleFullScreen}
          className="p-3 m-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
        >
          {isFullScreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
        </button>
      </div>
    </div>
  );
}
