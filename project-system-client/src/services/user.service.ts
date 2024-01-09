import axiosBuilder from "./axiosBuilder";
const baseUrl = `http://localhost:4000/`;

export const MOD_ROLE = "MOD_ROLE";
export const PLANNER_ROLE = "PLANNER_ROLE";

export type IUser = {
  username: string;
  employeeId: string;
  displayName: string;
};

async function checkPermission(): Promise<boolean> {
  try {
    const res = await axiosBuilder
      .getInstance(baseUrl)
      .get("api/v1/ps/user-roles/users/check-permission");
    return res.data;
  } catch {
    return false;
  }
}

async function checkModRolePermission(): Promise<boolean> {
  try {
    const res = await axiosBuilder
      .getInstance(baseUrl)
      .get(`api/v1/ps/user-roles/users/check-role-permission?role=${MOD_ROLE}`);
    return res.data;
  } catch {
    return false;
  }
}

async function checkPlannerRolePermission(): Promise<boolean> {
  try {
    const res = await axiosBuilder
      .getInstance(baseUrl)
      .get(
        `api/v1/ps/user-roles/users/check-role-permission?role=${PLANNER_ROLE}`
      );
    return res.data;
  } catch {
    return false;
  }
}

async function getAll(): Promise<IUser[]> {
  const res = await axiosBuilder.getInstance(baseUrl).get("api/v1/u/users");
  return res.data;
}

const userService = {
  getAll,
  checkPermission,
  checkModRolePermission,
  checkPlannerRolePermission,
};

export default userService;
