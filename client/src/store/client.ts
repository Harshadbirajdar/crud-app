import create from "zustand";

import { devtools } from "zustand/middleware";
import AxiosInstances from "../helper/AxiosInstances";

export type IClientStore = {
  getAllClient: (page: number, limit: number) => void;
  page: number;
  limit: number;
  client: [];
  total: number;
  loading: boolean;
};

const clientStore = (set: any): IClientStore => ({
  getAllClient: async (page, limit) => {
    set(() => ({
      loading: true,
    }));
    try {
      const response = await AxiosInstances.get(
        `/client?page=${page}&limit=${limit}`
      );
      const { data } = response.data;
      set(() => ({
        page: data.page,
        limit: data.limit,
        client: data.client,
        total: data.total,
        loading: false,
      }));
    } catch (e) {
      set(() => ({
        loading: false,
      }));
    }
  },
  page: 1,
  limit: 10,
  client: [],
  total: 0,
  loading: false,
});

const useClientStore = create(devtools(clientStore));

export default useClientStore;
