import React, { Suspense, useMemo } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// کامپوننت‌های lazy-loaded
const About = React.lazy(() => import("./components/About"));
const Presentation = React.lazy(() => import("./components/Presentation"));
const VideoPlayer = React.lazy(() => import("./components/Video"));

function App() {
  const mainPDF = useMemo(() => require("./pdfs/pdf.pdf"), []);
  const calendar = useMemo(() => require("./pdfs/digialpha-calender.pdf"), []);
  const mamar = useMemo(
    () => require("./pdfs/khane memar - logo statement.pdf"),
    []
  );
  const snapp = useMemo(() => require("./videos/snapp.MOV"), []);
  const game = useMemo(() => require("./videos/game.MOV"), []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route
                path="/calendar"
                element={<Presentation pdfFile={calendar} />}
              />
              <Route
                path="/brandbook"
                element={<Presentation pdfFile={mamar} />}
              />
              <Route
                path="/snapp"
                element={<VideoPlayer videoFile={snapp} />}
              />
              <Route path="/baazi" element={<VideoPlayer videoFile={game} />} />
              <Route path="/" element={<Presentation pdfFile={mainPDF} />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
