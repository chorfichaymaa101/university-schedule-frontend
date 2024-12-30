import { Session } from './session.model';
export interface SessionWithDetails extends Session {
    professorName?: string;
    moduleName?: string;
    className?: string;
}
  