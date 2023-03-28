export function useLocalCache() {
  const cache = useLocalStorage('sy-cache', {
    token: '',
    userInfo: { username: 'sy', desc: 'wu wu wu wu wu...' },
  });
  const getToken = () => {
    return cache.value.token;
  };
  const setToken = (val: string) => {
    cache.value.token = val;
  };
  const clearToken = () => {
    cache.value.token = '';
  };
  const clearCache = () => {
    cache.value = null;
  };
  return { cache, getToken, setToken, clearToken, clearCache };
}
