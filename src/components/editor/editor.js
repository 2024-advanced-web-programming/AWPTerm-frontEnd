import React, { useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import QuillEditor from "./quillEditor";

const Editor = () => {
  const id = useParams();
  return(
    <div>
      <QuillEditor />
    </div>
  );
};

export default Editor;
