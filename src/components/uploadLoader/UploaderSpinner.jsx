import { useEffect, useRef, useState } from "react";
import "./upload.scss";

export default function UploadSpinner() {
  const [loader, setLoader] = useState(false);
  const scrollRef = useRef();
  function loading() {
    var percents = [0.25, 0.5, 0.75, 1],
      step = 0,
      truckLoopDur = 10,
      fill = function () {
        let fillEl = document.querySelector(".progress-fill");
        fillEl.style.transform = "scaleY(" + percents[step] + ")";
        ++step;

        if (step < percents.length) {
          setTimeout(fill, (truckLoopDur * 1e3) / 2);
        }
      };
    setTimeout(fill, (truckLoopDur * 1e3) / 4);
  }

  useEffect(() => {
    loading();
  }, []);

  return (
    <div className="App">
      <div class="progress-container">
        <div class="progress-box">
          <div ref={scrollRef} class="progress-fill" id="progress-bar"></div>
        </div>
        <div class="progress-state state-load">Loading…</div>
        <div class="progress-state state-finish">Complete!</div>
      </div>
      <div class="dump-truck">
        <div class="front"></div>
        <div class="bucket"></div>
        <div class="dirt">
          <div class="dirt-spill"></div>
        </div>
        <div class="base"></div>
        <div class="wheel wheel-front"></div>
        <div class="wheel wheel-middle"></div>
        <div class="wheel wheel-back"></div>
      </div>
      <div class="dump-truck">
        <div class="front"></div>
        <div class="bucket"></div>
        <div class="dirt">
          <div class="dirt-spill"></div>
        </div>
        <div class="base"></div>
        <div class="wheel wheel-front"></div>
        <div class="wheel wheel-middle"></div>
        <div class="wheel wheel-back"></div>
      </div>
    </div>
  );
}
