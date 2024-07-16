import Image from "next/image";
import TokenGrid from "./components/tokens/token.grid";
import React from "react";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const tokensPage = async (props: any) => {
  const res = await fetch("http://localhost:3333/tokens", {
    method: "GET",
  });
  const data = await res.json();
  return (
    <div>
      <Carousel arrows infinite={false}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <br />
      <TokenGrid tokens={data ? data : []} />
    </div>
  );
};
export default tokensPage;
