import styled from "styled-components";

export default function Header({children}) {
  return (
    <Head>
      {children}
    </Head>
  );
}

const Head = styled.header`
  max-width: 326px;
  width: 100%;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  margin: 20px 0;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /*margin-bottom: ${({margin}) => margin}px;
  span {
      text-transform: capitalize;
  }*/
`;