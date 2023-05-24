import React, { useState } from "react";
import "./styles.css";
import { usePopper } from "react-popper";
import ReactDOM from "react-dom";

export default function Popper({ clickable, children }) {
  const [open, setOpen] = useState(false);

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
  });

  return (
    <div>
      <div
        type="button"
        ref={setReferenceElement}
        onClick={() => setOpen(!open)}
      >
        {clickable}
      </div>

      {open && (
        <div
          className="bx-sdow popupArea "
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {children}
          <div ref={setArrowElement} style={styles.arrow} />
        </div>
      )}
    </div>
  );
}
