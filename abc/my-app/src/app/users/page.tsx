import UserTable from "../components/users/user.table";

const tokensPage = async (props: any) => {
  const res = await fetch("http://localhost:3333/users", {
    method: "GET",
  });
  const data = await res.json();
  return (
    <div>
      <UserTable users={data ? data : []} />
    </div>
  );
};
export default tokensPage;
