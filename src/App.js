import { useState } from "react";

import CodeEditor from "components/CodeEditor";
import VisualizationViewer from "components/VisualizationViewer";
import CursorControl from "components/CursorControl";

function App() {
  const [chunks, setChunks] = useState([]);
  const [cursor, setCursor] = useState(0);

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <VisualizationViewer
        chunks={chunks}
        cursor={cursor}
      />
      <div style={{margin: "5px"}}>
        <CursorControl
          setCursor={setCursor}
          cursor={cursor}
        />
        <CodeEditor
          setChunks={setChunks}
          setCursor={setCursor}
        />
      </div>
    </div>
  );
}

export default App;
