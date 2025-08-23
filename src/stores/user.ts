import { defineStore } from "pinia";
import type { Account } from "@/types/Account";

function loadAccount(): Account {
  return {
    id: 1,
    login: "Worker",
  };
}

export const useUserStore = defineStore("user", {
  state: () => ({
    account: loadAccount() as Account,
  }),

  actions: {
    getAccount(): Account {
      return this.account;
    },

    //так как у нас нет реальной загрузки пользователя не создаем методы по управлению аккаунтом и загрузки 
    // его в инфы в localstore
  },
});
