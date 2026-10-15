const WAVELENGTH = 216;
const AMPLITUDE = 22;
const STEP = 4;
const START = -WAVELENGTH;
const END = 4 * WAVELENGTH;

// A true sine curve, sampled finely enough that the polyline reads as smooth.
const WAVE_PATH = (() => {
  let d = "";
  for (let x = START; x <= END; x += STEP) {
    const y = AMPLITUDE * Math.sin((2 * Math.PI * x) / WAVELENGTH);
    d += `${x === START ? "M" : "L"}${x} ${y.toFixed(2)}`;
  }
  return d;
})();

// Every line drifts at the same speed, so the fixed phase offset between
// neighbours holds and they never cross.
const lines = [
  { y: 24, x: 0, opacity: 0.2 },
  { y: 56, x: -20, opacity: 0.28 },
  { y: 88, x: -40, opacity: 0.36 },
  { y: 120, x: -60, opacity: 0.46 },
  { y: 152, x: -80, opacity: 1, accent: true },
  { y: 184, x: -100, opacity: 0.46 },
  { y: 216, x: -120, opacity: 0.36 },
  { y: 248, x: -140, opacity: 0.28 },
  { y: 280, x: -160, opacity: 0.2 },
];

export default function WaveDecoration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 432 306"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-auto w-full max-w-[432px] [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
    >
      <defs>
        <path id="wave-sine" d={WAVE_PATH} />
      </defs>
      {lines.map((line) => (
        <use
          key={line.y}
          href="#wave-sine"
          className="wave-line"
          stroke={line.accent ? "#ff7a6e" : "#f3f1ea"}
          strokeOpacity={line.opacity}
          strokeWidth={line.accent ? 3 : 1.5}
          style={
            {
              "--wave-x": `${line.x}px`,
              "--wave-y": `${line.y}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}
