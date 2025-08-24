import styled from "styled-components";
import { PhotoBoxProps } from "../types";

const Image = styled.img`
  height: 10rem;
  justify-content: center;
  display: flex;
  align-content: center;
  margin: auto;
`;
const ImageBox = styled.div`
  border-color: gray;
  border: 1px solid;
  border-radius: 25px;
  background-color: #f5f5f7;
  cursor: pointer;
`;
export default function PhotoBox({ media }: PhotoBoxProps) {
  return (
    <ImageBox>
      <Image src={media.baseUrl} />
    </ImageBox>
  );
}
