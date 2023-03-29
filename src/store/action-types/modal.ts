export const OPEN_MODAL: 'OPEN_MODAL' = 'OPEN_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';

export interface IOpenModalAction {
  readonly type: typeof OPEN_MODAL;
  readonly title?: string | undefined;
  readonly modalContent?: string | undefined;
  readonly resetContentFunc?: (() => void) | null;
}

export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
}

export type TModalActions = IOpenModalAction | ICloseModalAction;
