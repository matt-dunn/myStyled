import React, {
  ReactNode, useEffect, useRef, useState,
} from "react";

import myStyled from "src/myStyled";

const TestBaseComponent = ({ children, className }: {children?: ReactNode; className?: string}) => (
  <div className={className}>
    <h2>
      TestBaseComponent:
    </h2>

    {children}
  </div>
);

const Container = myStyled<{color: string; toggle: boolean}>(TestBaseComponent)`
    :global(body) {background:${({ color }) => (color === "green" && "red") || "#ececec"}}
    padding: ${({ toggle }) => `${20 + ((toggle ? 1 : 0) * 50)}px`};
    color: ${({ color }) => color};
    border: 3px solid orange;
    overflow: hidden;
    ${({ color, toggle }) => color === "blue" && toggle && `
        background-color: orange;
        font-weight: bold;
    `}
    
    &:hover {
        background-color: ${({ color }) => (color === "blue" && "green") || "yellow"}
    }
    
    address {
        padding: ${({ toggle }) => `${20 + ((toggle ? 1 : 0) * 50)}px`};
    }

    @media only screen and (max-width: 1000px) {
        && {
            border: 10px solid ${({ color }) => color};
        }
    }
    
    margin-top: 20px;
`;

const InnerTest = myStyled("address")`
    @font-face {
      font-family: 'TestWebFont';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: local('Black Ops One Regular'), local('BlackOpsOne-Regular'), url(https://fonts.gstatic.com/s/blackopsone/v11/qWcsB6-ypo7xBdr6Xshe96H3aDvbtxsis4I.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    font-weight: bold;
    animation-duration: 3s;
    animation-name: slidein;
    
    &:hover {
        background-color: blue;
    }
    
    p {
        background-color: #eee;
    }

    @keyframes slidein {
      from {
        margin-left: 100%;
        width: 300%; 
      }
    
      to {
        margin-left: 0%;
        width: 100%;
      }
    }

    @media only screen and (max-width: 1000px) {
        && {
            border: 10px solid purple;
        }
    }
    
    background-color: #fff;
    border: 1px solid #ddd;
    font-family: TestWebFont, cursive;
    font-weight: normal;
    animation-duration: 1s;
    animation-name: slidein;
    margin: 10px 0 0 0;

    & + & {
        color: orange;
    }
`;

const Button = myStyled("button")`
    padding: .375rem .75rem;
    border: 1px solid #ccc;
`;

const SimpleButton = myStyled(Button)`
    border-radius: 40px;
    color: #333;
    margin: 5px;
`;

const PrimaryButton = myStyled(SimpleButton)`
    background-color: red;
`;

const TestMyStyled = () => {
  const [color, setColor] = useState("green");
  const [toggle, setToggle] = useState(false);
  const t1 = useRef<number>();
  const t2 = useRef<number>();

  useEffect(() => {
    t1.current = setTimeout(() => {
      setColor("blue");
    }, 2000) as unknown as number;

    t2.current = setTimeout(() => {
      setColor("violet");
    }, 4000) as unknown as number;

    return () => {
      clearTimeout(t1.current);
      clearTimeout(t2.current);
    };
  }, []);

  const handleToggle = () => setToggle(value => !value);

  return (
    <>
      <Button
        onClick={handleToggle}
      >
        {toggle ? "Use small margins" : "Use large margins"}
      </Button>

      <Container className="bob" color={color} toggle={toggle}>
        Colour:
        {" "}
        {color}

        <InnerTest className="my-lovely-horse">
          INNER:
          {" "}
          {color}
          <p>
            <SimpleButton>Styled SimpleButton, composed from Button</SimpleButton>
          </p>
        </InnerTest>

        <InnerTest className="my-lovely-horse">
          INNER: orange (overridden in styled component)
          <p>
            <PrimaryButton>Styled PrimaryButton, composed from SimpleButton</PrimaryButton>
          </p>
        </InnerTest>
      </Container>

      <Container color="indigo" toggle={toggle}>
        Colour: indigo

        <InnerTest className="my-lovely-horse">
          INNER: indigo
        </InnerTest>

        <InnerTest className="my-lovely-horse">
          INNER: orange (overridden in styled component)
        </InnerTest>
      </Container>
    </>
  );
};

export default TestMyStyled;
