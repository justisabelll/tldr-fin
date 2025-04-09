import { observable } from '@legendapp/state';

export interface Company {
  name: string;
}

interface Store {
  company: Company;
  setCompany: (name: string) => void;
}

const randomCompanies = ['NVIDIA', 'Apple', 'Microsoft', 'Amazon', 'Google'];

export const getRandomCompany = () => {
  return randomCompanies[Math.floor(Math.random() * randomCompanies.length)];
};

export const store$ = observable<Store>({
  company: { name: '' },

  setCompany: (name: string) => {
    store$.company.set({ name });
  },
});
