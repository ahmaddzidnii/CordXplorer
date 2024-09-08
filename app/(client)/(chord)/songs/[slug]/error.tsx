"use client";

export default function ErrorSongsSlugPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h1>Error {error.message}</h1>
      <button onClick={reset}>try again</button>
    </div>
  );
}
