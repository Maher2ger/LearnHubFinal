export interface Recording {
	id: string;
	name: string;
	sensors: string[];
	comments: string;
	startTime: Date;
	endTime: Date;
	duration: number;
}

