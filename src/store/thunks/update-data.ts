import { apiFlagDown } from '../actions';
import { AppDispatch, AppThunk } from '../types-store';

export const updateDataThunk = (): AppThunk => (dispatch: AppDispatch) => {

  const fakeAPI = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  fakeAPI(0).then(res => dispatch(apiFlagDown()));

}
