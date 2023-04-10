import { useUserStore } from './modules/user';

export const useStore = () => {
  return {
    user: useUserStore(),
  };
};

export default createPinia();
