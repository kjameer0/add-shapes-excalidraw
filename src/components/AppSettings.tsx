import { useState } from "react";
export default function AppSettings() {
  const [canClickToDrop, setCanClickToDrop] = useState(false);
  function handleClickToDrop() {
    setCanClickToDrop(!canClickToDrop)
    //toggle ability to click to drop
  }
  return (
    <div className="w-1/3 h-screen">
      <h2>Settings</h2>
      <label htmlFor="drop-elements">
        Click to Drop elements?
        <input
          type="checkbox"
          name="drop-elements"
          onChange={handleClickToDrop}
        />
      </label>
    </div>
  );
}
