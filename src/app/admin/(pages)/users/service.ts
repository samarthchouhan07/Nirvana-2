import AXIOS_API from "@/utils/axiosApi";

export async function deleteUser(id: string) {
  console.log(id)
  const { data } = await AXIOS_API.delete(`/admin/user/${id}`);
  return data;
}
