export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: { username: 'sy', avatar: '' },
    };
  },
});
