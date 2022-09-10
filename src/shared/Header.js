import styled from "styled-components";

export default function Header() {
  return (
    <Head>
      <h1>Header</h1>
    </Head>
  );
}

const Head = styled.header`
  max-width: 375px;
  width: 100%;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  /*margin-bottom: ${({margin}) => margin}px;
  span {
      text-transform: capitalize;
  }*/
`;