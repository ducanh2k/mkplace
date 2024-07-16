import TokenGrid from "../components/tokens/token.grid";

const tokensPage = async (props: any) => {
  const res = await fetch("http://localhost:3333/tokens", {
    method: "GET",
  });
  const data = await res.json();
  return (
    <div>
      <TokenGrid tokens={data ? data : []} />
    </div>
  );
};
export default tokensPage;
