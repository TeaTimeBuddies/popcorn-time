export const useAdmin = () => {
  const isAdminString = sessionStorage.getItem("is_admin");
  
  // Convert the retrieved string to a boolean.
  // Assuming 'true' is stored for admin users, and 'false' or absence thereof for non-admin users.
  const isAdmin = isAdminString === '1';
  
  console.log(isAdmin);
  return isAdmin;
};
