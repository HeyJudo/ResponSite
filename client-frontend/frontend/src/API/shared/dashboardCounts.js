import incidentReportsData from './incidentReportsData';
import { resourceSampleData } from './resourceSampleData';
import infraProj from '../resident/infraProj';

export const getPendingIncidentReportsCount = () => incidentReportsData.length;
export const getItemsLowOnStockCount = () => resourceSampleData.length;
export const getActiveInfraProjectsCount = () => infraProj.length;