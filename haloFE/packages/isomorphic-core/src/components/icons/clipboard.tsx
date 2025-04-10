export default function ClipboardIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 16h5m-5 4h5m-5 4h5m4 1h3a3 3 0 0 0 3-3V8.144c0-1.513-1.127-2.797-2.635-2.923a64.559 64.559 0 0 0-1.497-.106m0 0C22.956 5.4 23 5.7 23 6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1c0-.308.047-.605.133-.885m7.735 0A3.002 3.002 0 0 0 20 3h-2a3.002 3.002 0 0 0-2.867 2.115m0 0c-.501.03-1 .066-1.498.106C12.127 5.347 11 6.631 11 8.144V11m0 0H6.5A1.5 1.5 0 0 0 5 12.5v15A1.5 1.5 0 0 0 6.5 29h13a1.5 1.5 0 0 0 1.5-1.5v-15a1.5 1.5 0 0 0-1.5-1.5H11Zm-2 5h.01v.01H9V16Zm0 4h.01v.01H9V20Zm0 4h.01v.01H9V24Z"
      />
    </svg>
  );
}
