import { CardDetails } from './card-detail.model';

export interface AppState {
  readonly payment: Array<CardDetails>;
}