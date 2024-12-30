export interface Session{
  
    id: number; 
    sessionType: string;
    professorId: number;
    moduleId: number;
    day: string;
    time: string;
    groupe: string;
    classId: number;
    timetableId: number;
    capacity: number;
}