import { getLocalStorage } from './getLocalStorage.helpers';
import { setLocalStorage } from './setLocalStorage.helpers';

const addLocalStorageData = (key, data) => {
  const all = getLocalStorage(key);
  all.push(data);
  setLocalStorage(key, all);
};

export { addLocalStorageData };
