import './App.css';
import DataGlossary from "./DataGlossaryTable.json";
import React, { useState } from "react";
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
        <p className="description">
          Below you will see a Microsoft Power BI report followed by a data glossary<br /><br />
          The tabs to the left of the report can be used to navigate between different statistics and see player highlights in the 2020-2024 seasons<br /><br />
          The 3 cards you will find below the title of the report are the top 3 highlights of the player over the 5 seasons<br /><br />
          Feel free to select players you wish to look into and you can change the statistics displayed in the bottom 2 graphs as well<br /><br />
          Not all of the statistics available in the slicer are included within our top 3 highlights. (For example, displaying a players top rank isn't necessarily telling of their performance)<br /><br />
          You can search for players by team within the player slicer. For example you could type "MIN" and you would be given options to select from the players currently playing for the Vikings
        </p>

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