import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Svg1 = styled.svg`
  height: inherit;
  max-height: 40px;
  cursor: pointer;
`;
export default function ForwardButton() {
  const navigate = useNavigate();

  return (
    <Svg1
      onClick={() => navigate(1)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </Svg1>
  );
}
