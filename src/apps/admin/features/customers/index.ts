import type { PageMap } from '../../navigation';
import { CustomersPage } from './pages/CustomersPage';
import { CustomerDetailPage } from './pages/CustomerDetailPage';

/**
 * Customers feature — public API of this folder. Other features import only from here.
 * Pages: customers, customerDetail
 */
export const pages: PageMap = {
  customers: { section: 'customers', title: 'Customers', component: CustomersPage },
  customerDetail: { section: 'customers', title: 'Customers', component: CustomerDetailPage },
};

export { CustomersPage, CustomerDetailPage };
/** Sample customers, for pages that link to a customer by name (ratings). */
export { customers, customerIdByName, type Customer } from './data';
