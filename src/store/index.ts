export const useStore = () => {
  return {
    user: useUserStore(),
  };
};

export default createPinia();
