export const useUser = () => {
  const token = sessionStorage.getItem("token");
  console.log("token", token);
  return !!token;
  console.log(!!token);
};
