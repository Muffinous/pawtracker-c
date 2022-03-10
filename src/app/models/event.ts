export interface Event {
    id: number,
    title: string,
    description: string,
    day: Number,
    month: string,
    year: Number,
    startTime: Date,
    endTime: Date,
    allDay: boolean
}
