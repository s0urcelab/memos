import axios from "axios";
import { Resource } from "@/types/proto/api/v2/resource_service";

// 跨域api
const memosApi = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX,
  withCredentials: true,
})
const githubApi = axios.create()

export function getSystemStatus() {
  return memosApi.get<SystemStatus>("/api/v1/status");
}

export function getSystemSetting() {
  return memosApi.get<SystemSetting[]>("/api/v1/system/setting");
}

export function upsertSystemSetting(systemSetting: SystemSetting) {
  return memosApi.post<SystemSetting>("/api/v1/system/setting", systemSetting);
}

export function vacuumDatabase() {
  return memosApi.post("/api/v1/system/vacuum");
}

export function signin(username: string, password: string) {
  return memosApi.post("/api/v1/auth/signin", {
    username,
    password,
  });
}

export function signinWithSSO(identityProviderId: IdentityProviderId, code: string, redirectUri: string) {
  return memosApi.post("/api/v1/auth/signin/sso", {
    identityProviderId,
    code,
    redirectUri,
  });
}

export function signup(username: string, password: string) {
  return memosApi.post("/api/v1/auth/signup", {
    username,
    password,
  });
}

export function signout() {
  return memosApi.post("/api/v1/auth/signout");
}

export function createUser(userCreate: UserCreate) {
  return memosApi.post<User>("/api/v1/user", userCreate);
}

export function getMyselfUser() {
  return memosApi.get<User>("/api/v1/user/me");
}

export function getUserList() {
  return memosApi.get<User[]>("/api/v1/user");
}

export function upsertUserSetting(upsert: UserSettingUpsert) {
  return memosApi.post<UserSetting>(`/api/v1/user/setting`, upsert);
}

export function patchUser(userPatch: UserPatch) {
  return memosApi.patch<User>(`/api/v1/user/${userPatch.id}`, userPatch);
}

export function deleteUser(userDelete: UserDelete) {
  return memosApi.delete(`/api/v1/user/${userDelete.id}`);
}

export function getAllMemos(memoFind?: MemoFind) {
  const queryList = [];
  if (memoFind?.offset) {
    queryList.push(`offset=${memoFind.offset}`);
  }
  if (memoFind?.limit) {
    queryList.push(`limit=${memoFind.limit}`);
  }

  if (memoFind?.creatorUsername) {
    queryList.push(`creatorUsername=${memoFind.creatorUsername}`);
  }

  return memosApi.get<Memo[]>(`/api/v1/memo/all?${queryList.join("&")}`);
}

export function getMemoList(memoFind?: MemoFind) {
  const queryList = [];
  if (memoFind?.creatorUsername) {
    queryList.push(`creatorUsername=${memoFind.creatorUsername}`);
  }
  if (memoFind?.rowStatus) {
    queryList.push(`rowStatus=${memoFind.rowStatus}`);
  }
  if (memoFind?.pinned) {
    queryList.push(`pinned=${memoFind.pinned}`);
  }
  if (memoFind?.offset) {
    queryList.push(`offset=${memoFind.offset}`);
  }
  if (memoFind?.limit) {
    queryList.push(`limit=${memoFind.limit}`);
  }
  return memosApi.get<Memo[]>(`/api/v1/memo?${queryList.join("&")}`);
}

export function getMemoStats(username: string) {
  return memosApi.get<number[]>(`/api/v1/memo/stats?creatorUsername=${username}`);
}

export function getMemoById(id: MemoId) {
  return memosApi.get<Memo>(`/api/v1/memo/${id}`);
}

export function createMemo(memoCreate: MemoCreate) {
  return memosApi.post<Memo>("/api/v1/memo", memoCreate);
}

export function patchMemo(memoPatch: MemoPatch) {
  return memosApi.patch<Memo>(`/api/v1/memo/${memoPatch.id}`, memoPatch);
}

export function pinMemo(memoId: MemoId) {
  return memosApi.post(`/api/v1/memo/${memoId}/organizer`, {
    pinned: true,
  });
}

export function unpinMemo(memoId: MemoId) {
  return memosApi.post(`/api/v1/memo/${memoId}/organizer`, {
    pinned: false,
  });
}

export function deleteMemo(memoId: MemoId) {
  return memosApi.delete(`/api/v1/memo/${memoId}`);
}

export function getResourceList() {
  return memosApi.get<Resource[]>("/api/v1/resource");
}

export function createResource(resourceCreate: ResourceCreate) {
  return memosApi.post<Resource>("/api/v1/resource", resourceCreate);
}

export function createResourceWithBlob(formData: FormData) {
  return memosApi.post<Resource>("/api/v1/resource/blob", formData);
}

export function patchResource(resourcePatch: ResourcePatch) {
  return axios.patch<Resource>(`/api/v1/resource/${resourcePatch.id}`, resourcePatch);
}

export function deleteResourceById(id: ResourceId) {
  return memosApi.delete(`/api/v1/resource/${id}`);
}

export function getMemoResourceList(memoId: MemoId) {
  return memosApi.get<Resource[]>(`/api/v1/memo/${memoId}/resource`);
}

export function upsertMemoResource(memoId: MemoId, resourceId: ResourceId) {
  return memosApi.post(`/api/v1/memo/${memoId}/resource`, {
    resourceId,
  });
}

export function deleteMemoResource(memoId: MemoId, resourceId: ResourceId) {
  return memosApi.delete(`/api/v1/memo/${memoId}/resource/${resourceId}`);
}

export function getTagList() {
  return memosApi.get<string[]>(`/api/v1/tag`);
}

export function getTagSuggestionList() {
  return memosApi.get<string[]>(`/api/v1/tag/suggestion`);
}

export function upsertTag(tagName: string) {
  return memosApi.post<string>(`/api/v1/tag`, {
    name: tagName,
  });
}

export function deleteTag(tagName: string) {
  return memosApi.post(`/api/v1/tag/delete`, {
    name: tagName,
  });
}

export function getStorageList() {
  return memosApi.get<ObjectStorage[]>(`/api/v1/storage`);
}

export function createStorage(storageCreate: StorageCreate) {
  return memosApi.post<ObjectStorage>(`/api/v1/storage`, storageCreate);
}

export function patchStorage(storagePatch: StoragePatch) {
  return memosApi.patch<ObjectStorage>(`/api/v1/storage/${storagePatch.id}`, storagePatch);
}

export function deleteStorage(storageId: StorageId) {
  return memosApi.delete(`/api/v1/storage/${storageId}`);
}

export function getIdentityProviderList() {
  return memosApi.get<IdentityProvider[]>(`/api/v1/idp`);
}

export function createIdentityProvider(identityProviderCreate: IdentityProviderCreate) {
  return memosApi.post<IdentityProvider>(`/api/v1/idp`, identityProviderCreate);
}

export function patchIdentityProvider(identityProviderPatch: IdentityProviderPatch) {
  return memosApi.patch<IdentityProvider>(`/api/v1/idp/${identityProviderPatch.id}`, identityProviderPatch);
}

export function deleteIdentityProvider(id: IdentityProviderId) {
  return memosApi.delete(`/api/v1/idp/${id}`);
}

export async function getRepoStarCount() {
  const { data } = await githubApi.get(`https://api.github.com/repos/usememos/memos`, {
    headers: {
      Accept: "application/vnd.github.v3.star+json",
      Authorization: "",
    },
  });
  return data.stargazers_count as number;
}

export async function getRepoLatestTag() {
  const { data } = await githubApi.get(`https://api.github.com/repos/usememos/memos/tags`, {
    headers: {
      Accept: "application/vnd.github.v3.star+json",
      Authorization: "",
    },
  });
  return data[0].name as string;
}
