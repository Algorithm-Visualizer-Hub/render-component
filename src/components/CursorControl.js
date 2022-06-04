

export default function CursorControl(props) {

  return (
    <div>
      <button onClick={() => props.setCursor(props.cursor-1)}>prev</button>
      <span>{props.cursor}</span>
      <button onClick={() => props.setCursor(props.cursor+1)}>next</button>
    </div>
  );
};