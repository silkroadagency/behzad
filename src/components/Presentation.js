import React, { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import { FaExpand, FaCompress } from "react-icons/fa";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const maxWidth = 1200;

export default function Presentation(props) {
  const [file, setFile] = useState(props.pdfFile);
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
    <div
      className={`flex items-center justify-center min-h-screen ${
        isFullScreen ? "bg-gray-100" : "bg-gray-100"
      }`}
    >
      <div
        className={`relative w-full max-w-6xl overflow-auto p-6 rounded-lg transition-all duration-300 ${
          isFullScreen ? "h-screen" : "h-screen"
        }`}
        ref={setContainerRef}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          className="shadow-lg"
        >
          {Array.from(new Array(numPages), (_el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={
                containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
              }
              className="mx-auto my-6 shadow-md border border-gray-300 rounded-lg"
            />
          ))}
        </Document>
      </div>

      <button
        onClick={toggleFullScreen}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
      >
        {isFullScreen ? <FaCompress size={24} /> : <FaExpand size={24} />}
      </button>
    </div>
  );
}
