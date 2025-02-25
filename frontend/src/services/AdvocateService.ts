import ApiService from "./ApiService";

export async function apiGetAdvocates<T, U extends Record<string, unknown>>(
  params: U
) {
  return ApiService.fetchData<T>({
    url: "/advocates",
    method: "get",
    params,
  });
}

export async function apiGetAdvocate<T, U extends Record<string, unknown>>(
  params: U
) {
  return ApiService.fetchData<T>({
    url: `/advocates/${params.id}`,
    method: "get",
    params,
  });
}

export async function apiGetAdvocateStatistic<T>() {
  return ApiService.fetchData<T>({
    url: "/advocates/statistic",
    method: "get",
  });
}

export async function apiPutAdvocate<T, U extends Record<string, unknown>>(
  data: U
) {
  return ApiService.fetchData<T>({
    url: "/advocates",
    method: "put",
    data,
  });
}

export async function apiDeleteAdvocates(id: string) {
  return ApiService.fetchData({
    url: `/advocates/${id}`,
    method: "delete",
  });
}
