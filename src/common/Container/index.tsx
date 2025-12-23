import { StyledContainer } from "./styles";
import { ContainerProps } from "../types";

const Container = ({ border, children }: ContainerProps) => (
  // Added a default "className" just in case you use tailwind on specific pages
  <StyledContainer border={border} className="container-wrapper">
    {children}
  </StyledContainer>
);

export default Container;