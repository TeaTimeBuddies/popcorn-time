export const useUser = () => {
  const token = sessionStorage.getItem("token");
  console.log("token", token);
  if (token) {
    return true;
  }
};
