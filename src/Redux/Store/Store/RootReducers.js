import { combineReducers } from '@reduxjs/toolkit';
import { IncidentsReducer } from 'src/slices/Incidents';
import { IntegrationsReducer } from 'src/slices/Integrations';
import { MaintainanceReducer } from 'src/slices/Maintainance';
import { MonitorReducer } from 'src/slices/Monitors';
import { StatusPagesReducer } from 'src/slices/StatusPages';
import { TeamMatesReducer } from 'src/slices/TeamMembers';
import { authReducer } from 'src/slices/auth';
import { ProfileReducer } from 'src/slices/profile';


export const rootReducer = combineReducers({
  authReducer,
  ProfileReducer,
  MonitorReducer,
  StatusPagesReducer,
  TeamMatesReducer,
  IncidentsReducer,
  MaintainanceReducer,
  IntegrationsReducer

});