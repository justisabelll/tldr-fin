import { observable } from '@legendapp/state';

export interface CompanyOverview {
  foundingYear: string;
  location: string;
  overview: string[];
  story: string;
  stockTicker: string;
}

export interface Company {
  companyName: string;
  overview: CompanyOverview | null;
}

interface Store {
  company: Company;
  setCompany: (companyName: string) => void;
  setCompanyOverview: (overview: CompanyOverview | null) => void;
}

export const store$ = observable<Store>({
  company: { companyName: '', overview: null },

  setCompany: (companyName: string) => {
    store$.company.set({ companyName, overview: null });
  },

  setCompanyOverview: (overview: CompanyOverview | null) => {
    store$.company.set({ ...store$.company.get(), overview });
  },
});

const randomCompanies = ['NVIDIA', 'Apple', 'Microsoft', 'Amazon', 'Google'];

export const getRandomCompany = () => {
  return randomCompanies[Math.floor(Math.random() * randomCompanies.length)];
};
