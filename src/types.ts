export interface StudentSession {
  studentName: string;
  activationCode: string;
  activatedAt: number; // timestamp in ms
  expiresAt: number; // timestamp in ms (180 days = 6 months)
  deviceId: string;
}

export interface GeneratedCodeRecord {
  id: string;
  studentName: string;
  code: string;
  generatedAt: number;
  notes?: string;
}

export interface DialogueLine {
  id: string;
  speaker: string;
  speakerRole: 'parent' | 'student' | 'teacher';
  avatarColor: string;
  textEn: string;
  textAr: string;
  scene?: string;
}

export interface WorksheetItem {
  id: string;
  title: string;
  pageNumber: number;
  descriptionEn: string;
  descriptionAr: string;
  type: 'tick' | 'match' | 'circle' | 'fill' | 'write-about';
}
