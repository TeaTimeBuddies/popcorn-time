export const useAdmin = () => {
  const isAdminString = sessionStorage.getItem("is_admin");
  const isAdmin = isAdminString === "1";
  console.log(isAdmin);
  return isAdmin;
};
