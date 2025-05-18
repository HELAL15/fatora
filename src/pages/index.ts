// Error Pages
export { default as NotFound } from './NotFound';
// home page 
export { default as Home } from './Home';
// ** systemSetting pages ==> {
export { default as SystemSettings } from './systemSetting/SystemSettings';
// structure pages 
export { default as CompanyProfile } from './systemSetting/structure/CompanyProfile';
export { default as Employees } from './systemSetting/structure/Employees';
// == branches crud 
export { default as Branches } from './systemSetting/structure/branchesStructure/Branches';
export { default as Branch } from './systemSetting/structure/branchesStructure/Branch';
export { default as AddBranch } from './systemSetting/structure/branchesStructure/AddBranch';
export { default as UpdateBranch } from './systemSetting/structure/branchesStructure/UpdateBranch';


export {default as LoginDashboard} from './LoginDashboard'
//  banks pages 
export { default as Banks } from './systemSetting/banks/Banks';
export { default as BankAccounts } from './systemSetting/banks/BankAccounts';
export { default as BankCardTypes } from './systemSetting/banks/BankCardTypes';
export { default as BankCards } from './systemSetting/banks/BankCards';
//  sales pages 
export { default as TaxPolicy } from './systemSetting/sales/TaxPolicy';
export { default as ZakatInvoice } from './systemSetting/sales/zakat/ZakatInvoice';
export { default as AddZakat } from './systemSetting/sales/zakat/AddZakat';
//  invoice pages 
export { default as Invoice } from './systemSetting/branches/Invoice';
export { default as Decimal } from './systemSetting/branches/Decimal';
export { default as Congratulatory } from './systemSetting/branches/Congratulatory';
// ** end systemSetting pages ==> }


// ** branches pages ==> {

export { default as BranchHome } from './branch/BranchHome';
export { default as SellingInvoices } from './branch/selling/SellingInvoices';
export { default as AddSellingInvoice } from './branch/selling/AddSellingInvoice';
export { default as ReturningInvoice } from './branch/returning/ReturningInvoices';
export { default as AddReturningInvoice } from './branch/returning/AddReturningInvoice';


// ** end branches pages ==> }