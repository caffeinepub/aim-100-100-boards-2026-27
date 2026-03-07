import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StudyStreakRecord {
    date: Time;
    streakLength: bigint;
}
export type Time = bigint;
export interface User {
    id: Principal;
    username: string;
}
export interface PomodoroSession {
    startTime: Time;
    duration: bigint;
    endTime?: Time;
    completed: boolean;
}
export interface SyllabusProgress {
    subject: string;
    page: bigint;
    completed: boolean;
    chapter: string;
}
export interface backendInterface {
    completePomodoro(sessionId: bigint): Promise<bigint>;
    getPomodoroSessions(): Promise<Array<PomodoroSession>>;
    getStudyStreaks(): Promise<Array<StudyStreakRecord>>;
    getSyllabusProgress(): Promise<Array<SyllabusProgress>>;
    getUser(): Promise<User>;
    recordStudyStreak(streakLength: bigint): Promise<void>;
    registerUser(username: string): Promise<void>;
    startPomodoro(): Promise<bigint>;
    updateSyllabusProgress(subject: string, chapter: string, page: bigint, completed: boolean): Promise<void>;
}
