export const useAdmin = () => {
  const isAdmin = sessionStorage.getItem("is_admin");
  console.log(isAdmin)
  return isAdmin;
  }
