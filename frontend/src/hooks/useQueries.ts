import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { SyllabusProgress } from '../backend';

export function useGetSyllabusProgress() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['syllabusProgress'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSyllabusProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSyllabusProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ subject, chapter, page, completed }: { subject: string; chapter: string; page: bigint; completed: boolean }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.updateSyllabusProgress(subject, chapter, page, completed);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['syllabusProgress'] });
    },
  });
}

export function useGetPomodoroSessions() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['pomodoroSessions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPomodoroSessions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStartPomodoro() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not ready');
      return actor.startPomodoro();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pomodoroSessions'] });
    },
  });
}

export function useGetStudyStreaks() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['studyStreaks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudyStreaks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordStudyStreak() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (streakLength: bigint) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.recordStudyStreak(streakLength);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyStreaks'] });
    },
  });
}
