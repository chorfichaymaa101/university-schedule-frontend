import { SessionExam } from './session-exam.model';
export interface SessionExamWithDetails extends SessionExam {
    professorName?: string;
    programName?: string;
    moduleName?: string;
    className?: string;
}
  