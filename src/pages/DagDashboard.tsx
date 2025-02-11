
import React from 'react';

const DagDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] aspect-[600/636] relative">
        <iframe 
          title="DAG Workspace Dashboards"
          src="https://app.powerbi.com/view?r=eyJrIjoiYTkyYzAyYmQtYWJjMy00ZDdjLTk1YTAtZWZjMzAxZDVhNmY2IiwidCI6ImU1YzM3OTgxLTY2NjQtNDEzNC04YTBjLTY1NDNkMmFmODBiZSIsImMiOjh9"
          className="w-full h-full absolute inset-0"
          frameBorder="0"
          allowFullScreen={true}
        />
      </div>
    </div>
  );
};

export default DagDashboard;
