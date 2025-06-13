import React, { useState } from "react";
import "./Assesor.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Assesor = () => {
  const [url, setUrl] = useState("");
  const [criteria, setCriteria] = useState({
    performance: true,
    accessibility: true,
    seo: true,
  });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const handleCriteriaChange = (e) => {
    const { name, checked } = e.target;
    setCriteria({ ...criteria, [name]: checked });
  };

  const analyzeWebsite = async () => {
    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }
    setError("");
    setLoading(true);
    setReport(null);

    try {
      const apiKey = "AIzaSyBd3jVqEwi_MxRSM-Q8ZO33eKS6WIW89ww"; // Add your key
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&strategy=mobile&key=${apiKey}`;

      const res = await fetch(apiUrl);
      const data = await res.json();

      const scores = {
        performance: data.lighthouseResult.categories.performance.score * 100,
        accessibility:
          data.lighthouseResult.categories.accessibility?.score * 100,
        seo: data.lighthouseResult.categories.seo?.score * 100,
      };

      setReport(scores);
    } catch (err) {
      setError("Failed to fetch report. Check URL or API quota.");
    }
    setLoading(false);
  };

  const exportPDF = async () => {
    const element = document.getElementById("reportSection");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("website-assessment-report.pdf");
  };

  return (
    <div className="assesor-container">
      <h2>Website Assessment & Report Generator</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter website URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="criteria">
          <label>
            <input
              type="checkbox"
              name="performance"
              checked={criteria.performance}
              onChange={handleCriteriaChange}
            />
            Performance
          </label>
          <label>
            <input
              type="checkbox"
              name="accessibility"
              checked={criteria.accessibility}
              onChange={handleCriteriaChange}
            />
            Accessibility
          </label>
          <label>
            <input
              type="checkbox"
              name="seo"
              checked={criteria.seo}
              onChange={handleCriteriaChange}
            />
            SEO
          </label>
        </div>
        <button onClick={analyzeWebsite} disabled={loading}>
          {loading ? "Analyzing..." : "Generate Report"}
        </button>
        {error && <p className="error">{error}</p>}
      </div>

      {report && (
        <div className="report-section" id="reportSection">
          <h3>Assessment Report for {url}</h3>
          <ul>
            {criteria.performance && (
              <li>
                <strong>Performance:</strong>{" "}
                <span className="score">{report.performance}%</span>
              </li>
            )}
            {criteria.accessibility && (
              <li>
                <strong>Accessibility:</strong>{" "}
                <span className="score">{report.accessibility}%</span>
              </li>
            )}
            {criteria.seo && (
              <li>
                <strong>SEO:</strong>{" "}
                <span className="score">{report.seo}%</span>
              </li>
            )}
          </ul>
          <button className="download-btn" onClick={exportPDF}>
            Export PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default Assesor;
