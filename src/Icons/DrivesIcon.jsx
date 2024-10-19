import styled from "styled-components";

const Svg = styled.svg`
  height: inherit;
  width: inherit;
`;
export default function DrivesIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="64px"
      height="64px"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 12 L10 52 L54 52 L54 12 Z" fill="#e0e0e0" />
      <path d="M6 10 H58 C60 10 62 12 62 14 V54 C62 56 60 58 58 58 H6 C4 58 2 56 2 54 V14 C2 12 4 10 6 10 Z" />
      <rect x="14" y="16" width="36" height="28" rx="2" fill="white" />
      <circle cx="32" cy="26" r="3" fill="#555" />
      <path d="M14 16 H50 V20 H14 Z" fill="#888" />
      <path d="M14 26 H50 V30 H14 Z" fill="#888" />
      <path d="M14 36 H50 V40 H14 Z" fill="#888" />
    </Svg>
  );
}
