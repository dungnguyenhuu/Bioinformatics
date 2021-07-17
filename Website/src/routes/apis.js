const baseAPI = 'http://localhost:5000/api';
const baseAcrAPI = baseAPI + '/predict-acr';
const baseAcrContentAPI = baseAPI + '/predict-acr-content';
export default {
  acr: baseAcrAPI,
  acrContent: baseAcrContentAPI,
};
