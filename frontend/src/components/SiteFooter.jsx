import React from 'react';
import './SiteFooter.css';

const SiteFooter = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">

        <div className="footer-left">
          <div className="footer-logo-row">
            <img src="/logos/sethu_logo.png" alt="Sethu Institute of Technology Logo" className="footer-inst-logo" />
            <div className="footer-left-info">
              <span className="footer-name">DR. K. GILBERT ROSS REX</span>
              <span className="footer-role">Associate Professor · Department of Biotechnology</span>
              <span className="footer-institution">Sethu Institute of Technology (Autonomous)</span>
            </div>
          </div>
        </div>

        <div className="footer-center">
          <div className="footer-rule" aria-hidden="true" />
        </div>

        <div className="footer-right">
          <p className="footer-copy">© 2026 Dr. K. Gilbert Ross Rex.</p>
          <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            BACK TO TOP ↑
          </button>
        </div>

      </div>
    </footer>
  );
};

export default SiteFooter;
