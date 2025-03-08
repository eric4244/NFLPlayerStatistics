import logo from './logo.svg';
import './App.css';
import DataGlossary from "./DataGlossaryTable.json";
import React, { useState } from "react";
//import { PowerBIEmbed } from 'powerbi-client-react';
//import { models } from 'powerbi-client';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const [activeTab, setActiveTab] = useState("Quarterbacks");
  const columnDefs = DataGlossary && DataGlossary.length > 0 
    ? Object.keys(DataGlossary[0]).map(key => {
        let colDef = { headerName: key, field: key };
        if (key.toLowerCase() === "comments") {
          colDef.cellStyle = { whiteSpace: 'nowrap' };
        }
        return colDef;
      })
    : [];
  const rowData = DataGlossary;

  // Map each tab name to its Power BI report URL
  const reportUrls = {
    Quarterbacks: "https://app.powerbi.com/view?r=eyJrIjoiNzI0MTc1ZGMtOWM1ZC00NTY5LWJmNzMtMzgyNzc0OTAwMTI1IiwidCI6ImJlOGU0MzJjLWJjYmUtNGEyOC04ZjRiLWYzYzBlNjVhYTAzNiJ9&pageName=3d92df74da1910893540",
    Rushing:      "https://app.powerbi.com/view?r=eyJrIjoiNzI0MTc1ZGMtOWM1ZC00NTY5LWJmNzMtMzgyNzc0OTAwMTI1IiwidCI6ImJlOGU0MzJjLWJjYmUtNGEyOC04ZjRiLWYzYzBlNjVhYTAzNiJ9&pageName=3811f057ad3d834dbac0",
    Receiving:    "https://app.powerbi.com/view?r=eyJrIjoiNzI0MTc1ZGMtOWM1ZC00NTY5LWJmNzMtMzgyNzc0OTAwMTI1IiwidCI6ImJlOGU0MzJjLWJjYmUtNGEyOC04ZjRiLWYzYzBlNjVhYTAzNiJ9&pageName=03d3291b25dd29cb84d3",
    Defense:      "https://app.powerbi.com/view?r=eyJrIjoiNzI0MTc1ZGMtOWM1ZC00NTY5LWJmNzMtMzgyNzc0OTAwMTI1IiwidCI6ImJlOGU0MzJjLWJjYmUtNGEyOC04ZjRiLWYzYzBlNjVhYTAzNiJ9&pageName=f099b2c9a0897e2100ec",
    Kicking:      "https://app.powerbi.com/view?r=eyJrIjoiNzI0MTc1ZGMtOWM1ZC00NTY5LWJmNzMtMzgyNzc0OTAwMTI1IiwidCI6ImJlOGU0MzJjLWJjYmUtNGEyOC04ZjRiLWYzYzBlNjVhYTAzNiJ9&pageName=d2960237866b1ea722c2",
    Punting:      "https://app.powerbi.com/view?r=eyJrIjoiNzI0MTc1ZGMtOWM1ZC00NTY5LWJmNzMtMzgyNzc0OTAwMTI1IiwidCI6ImJlOGU0MzJjLWJjYmUtNGEyOC04ZjRiLWYzYzBlNjVhYTAzNiJ9&pageName=ee6291dd6d65579abd12",
    Returns:      "https://app.powerbi.com/view?r=eyJrIjoiNzI0MTc1ZGMtOWM1ZC00NTY5LWJmNzMtMzgyNzc0OTAwMTI1IiwidCI6ImJlOGU0MzJjLWJjYmUtNGEyOC04ZjRiLWYzYzBlNjVhYTAzNiJ9&pageName=fa59936eaa5a0dea7203"
  };

  return (
    <div className="App">
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">NFL Player Statistics</h1>
      </header>

      <main className="page-content">
        {/* Description Box with 16:9 aspect ratio */}
        <div className="description-box">
          <p className="description">
            Below is a Microsoft Power BI report showcasing players in the NFL in regards to passing, rushing, defending, receiving, punting, kicking, and returning. <br /><br />
            Beneath the report there will be a data glossary, references to resources used, and more information about it. Feel free to read through that or just play around!
          </p>
        </div>

        {/* Content row: Vertical Tabs + Report */}
        <div className="report-section">
          {/* Vertical Tab Menu */}
          <div className="vertical-tabs">
            <ul>
              <li onClick={() => setActiveTab('Quarterbacks')} className={activeTab === 'Quarterbacks' ? "active" : ""}>
                Quarterbacks
              </li>
              <li onClick={() => setActiveTab('Rushing')} className={activeTab === 'Rushing' ? "active" : ""}>
                Rushing
              </li>
              <li onClick={() => setActiveTab('Receiving')} className={activeTab === 'Receiving' ? "active" : ""}>
                Receiving
              </li>
              <li onClick={() => setActiveTab('Defense')} className={activeTab === 'Defense' ? "active" : ""}>
                Defense
              </li>
              <li onClick={() => setActiveTab('Kicking')} className={activeTab === 'Kicking' ? "active" : ""}>
                Kicking
              </li>
              <li onClick={() => setActiveTab('Punting')} className={activeTab === 'Punting' ? "active" : ""}>
                Punting
              </li>
              <li onClick={() => setActiveTab('Returns')} className={activeTab === 'Returns' ? "active" : ""}>
                Returns
              </li>
            </ul>
          </div>

          {/* Responsive Power BI Report with max-height */}
          <div 
            className="report-container" 
            style={{
              position: 'relative',
              width: '100%',
              // Calculate height from width to maintain 16:9 ratio
              height: 'calc(100vw * 9 / 16)',
              // Ensure it doesn't exceed 90% of the viewport height
              maxHeight: '90vh',
              marginBottom: '20px'
            }}
          >
            <iframe 
              title="PlayerStatsReport" 
              src={reportUrls[activeTab]}
              frameBorder="0"
              allowFullScreen={true}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
            ></iframe>
          </div>
        </div>

        <div className="data-section">
          <div className="glossary-tab">Data Glossary</div>
          {/* Container for data gathering information with horizontal scroll enabled */}
          <div className="data-table-container" style={{
               width: '100%',
               height: 'calc(100vw * 9 / 16)',   // 16:9 aspect ratio based on viewport width
               maxHeight: '90vh',               // cap height at 90% of viewport height
               marginTop: '20px',
               overflowX: 'auto',
               position: 'relative'            // allow absolutely-positioned child
            }}>
              <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              defaultColDef={{ flex: 1, minWidth: 100, filter: true, sortable: true }}
              style={{ width: '100%', height: '100%' }}
            />
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;