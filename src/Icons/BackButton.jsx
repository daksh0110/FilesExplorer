import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Svg = styled.svg`
  height: inherit;
  max-height: 40px;
`;
export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Svg
      onClick={() => navigate(-1)}
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
        d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </Svg>
  );
}
