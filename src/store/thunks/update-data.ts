import { AppDispatch, AppThunk } from '../types-store';

export const updateDataThunk = (): AppThunk => (dispatch: AppDispatch) => {

  const fakeAPI = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  fakeAPI(0).then(res => res);

}
