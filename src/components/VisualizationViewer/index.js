import React from "react";

import * as LayoutClasses from 'core/layouts';
import * as TracerClasses from 'core/tracers';

export default function VisualizationViewer(props) {
  let root = null;
  let objects = {};

  const applyCommand = command => {
    const { key, method, args } = command;
    try {
      if (key === null && method === 'setRoot') {
        const [_root] = args;
        root = objects[_root];
      } else if (method === 'destroy') {
        delete objects[key];
      } else if (method in LayoutClasses) {
        const [children] = args;
        const LayoutClass = LayoutClasses[method];
        objects[key] = new LayoutClass(key, key => objects[key], children);
      } else if (method in TracerClasses) {
        const className = method;
        const [title = className] = args;
        const TracerClass = TracerClasses[className];
        objects[key] = new TracerClass(key, key => objects[key], title);
      } else {
        objects[key][method](...args);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const applyChunk = chunk => {
    chunk.commands.forEach(command => applyCommand(command));
  };

  const update = (chunks, cursor) => {
    let chunksToApply = chunks.slice(0, cursor);
    chunksToApply.forEach(chunk => applyChunk(chunk));
  };

  const {chunks, cursor} = props;
  update(chunks, cursor);
  return (
    <div style={{margin: "5px"}}>
      {root?.render()}
    </div>
  );
};

