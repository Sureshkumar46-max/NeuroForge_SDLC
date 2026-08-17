import React from 'react';
import Topbar from '../components/layout/Topbar.jsx';

/**
 * PlaceholderPage — stands in for Modules 1–5 so this package runs standalone.
 * Delete this file once merged into the real project, which already has these pages.
 */
export default function PlaceholderPage({ title }) {
  return (
    <>
      <Topbar crumbs={['HexaCorp Global', title]} />
      <div className="content">
        <div className="page-head">
          <div>
            <h1>{title}</h1>
            <p>This module already exists in the real NeuroForge app — placeholder for standalone preview only.</p>
          </div>
        </div>
      </div>
    </>
  );
}
