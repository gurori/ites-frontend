export default function SmallStar({
  color,
  className,
}: {
  color: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="111"
      height="93"
      viewBox="0 0 111 93"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_445_261)">
        <path
          d="M55.9109 8.17872C64.6675 -4.46247 84.421 0.499655 85.2625 15.5519L85.9204 27.3214C86.298 34.0755 91.0012 39.7284 97.628 41.3931L107.845 43.9596C123.087 47.7883 123.619 68.8297 108.611 74.2306L100.551 77.1312C93.6881 79.6012 89.2133 86.2266 89.6104 93.3307L90.1232 102.502C90.9753 117.747 71.5351 125.781 61.6071 114.287L53.4357 104.827C49.1724 99.891 42.185 98.1357 35.8606 100.412L23.7385 104.774C9.01056 110.074 -3.54044 94.0041 5.32796 81.2015L10.6635 73.499C14.7962 67.5329 14.4545 59.6975 9.82799 54.3413L4.39477 48.0511C-5.72194 36.3389 5.96161 18.3662 21.2032 22.195L31.4201 24.7615C38.047 26.4261 45.1349 23.7352 49.0641 18.063L55.9109 8.17872Z"
          fill={color}
          fillOpacity="0.4"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_445_261"
          x="0.604187"
          y="0.975098"
          width="120.973"
          height="119.754"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="1" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_445_261"
          />
        </filter>
      </defs>
    </svg>
  );
}
