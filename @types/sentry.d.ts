declare type SentryFallbackRenderProps = {
  error: Error;
  componentStack: string | null;
  eventId: string | null;
  resetError(): void;
}
