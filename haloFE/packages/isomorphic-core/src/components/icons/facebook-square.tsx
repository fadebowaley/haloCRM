export default function FacebookSquareIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <g clipPath="url(#fSquare)">
        <path
          fill="#475993"
          d="M27.688 0H4.312A4.312 4.312 0 000 4.312v23.376A4.312 4.312 0 004.312 32h11.529l.02-11.435H12.89a.7.7 0 01-.701-.698l-.015-3.686a.701.701 0 01.701-.704h2.966v-3.562c0-4.133 2.524-6.383 6.211-6.383h3.026a.7.7 0 01.7.7v3.109a.7.7 0 01-.7.7l-1.857.002c-2.005 0-2.393.952-2.393 2.35v3.084h4.406c.42 0 .745.367.696.784l-.437 3.686a.701.701 0 01-.696.618h-3.95L20.829 32h6.86A4.312 4.312 0 0032 27.688V4.312A4.312 4.312 0 0027.688 0z"
        />
      </g>
      <defs>
        <clipPath id="fSquare">
          <path
            fill="#fff"
            d="M0 0h32v32H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
