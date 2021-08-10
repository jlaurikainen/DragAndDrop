import React, { HTMLAttributes, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> {
  heading: React.ReactNode;
  open?: boolean;
  toggle?: () => void;
}

const Accordion: React.FC<Props> = ({
  children,
  heading,
  open,
  toggle,
  ...rest
}) => {
  const [showContent, setShowContent] = useState(open ?? false);
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (open !== undefined) {
      setShowContent(open);
    }
  }, [open]);

  const heightHandler = useCallback(() => {
    if (contentRef) {
      setContentHeight(showContent ? contentRef.offsetHeight : 0);
    }
  }, [contentRef, showContent]);

  useEffect(() => {
    heightHandler();
  }, [showContent, heightHandler]);

  useEffect(() => {
    window.addEventListener("resize", heightHandler);

    return () => window.removeEventListener("resize", heightHandler);
  }, [heightHandler]);

  return (
    <AccordionContainer {...rest}>
      <Heading
        onClick={() => {
          toggle?.();
          !toggle && setShowContent(!showContent);
        }}
      >
        <Title>{heading}</Title>
        <Arrow open={showContent} />
      </Heading>
      <ContentWrapper>
        {showContent && <Content ref={setContentRef}>{children}</Content>}
      </ContentWrapper>
    </AccordionContainer>
  );
};

export default Accordion;

const Heading = styled.button`
  display: grid;
  align-items: center;
  grid-template-columns: auto min-content;
  text-align: left;
  width: 100%;
  border: 0;
  background-color: lightgray;
  height: 48px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const AccordionContainer = styled.div`
  &.sub ${Heading} {
    padding-left: 32px;
  }
`;

const Title = styled.div`
  font: normal 16px sans-serif;
`;

const Arrow = styled.div<{ open: boolean }>`
  position: relative;
  font: normal 16px sans-serif;
  height: 48px;
  width: 48px;
  transform: rotate(${({ open }) => (open ? "-90deg" : "90deg")});
  transform-origin: center center;

  ::before {
    position: absolute;
    top: 50%;
    left: 50%;
    content: "";
    height: 2px;
    width: 14px;
    background-color: gray;
    transform: rotate(-45deg) translate(calc(-50%), calc(-50%));
  }

  ::after {
    position: absolute;
    top: 50%;
    left: 50%;
    content: "";
    height: 2px;
    width: 16px;
    background-color: gray;
    transform: rotate(45deg) translate(calc(-50%), calc(-50%));
  }
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  transition: height 0.15s ease;
`;

const Content = styled.div`
  font: normal 16px sans-serif;
`;
