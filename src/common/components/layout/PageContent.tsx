import styled from "@emotion/styled";
import React, { ReactNode } from "react";

const PageContentWrapper = styled.div`
  max-width: 984px;
  margin: auto;
`;

interface IPageContentProps {
  children: ReactNode;
}

const PageContent: React.FC<IPageContentProps> = ({ children }) => {
  return <PageContentWrapper>{children}</PageContentWrapper>;
};
export default PageContent;
