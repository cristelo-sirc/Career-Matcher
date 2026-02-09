import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center justify-center px-4 text-center"
    >
      <h1 className="text-4xl font-bold text-text dark:text-text-dark">404</h1>
      <p className="mt-4 text-lg text-text-muted dark:text-text-muted-dark">
        Page not found.
      </p>
      <div className="mt-6">
        <Button href="/">Go Home</Button>
      </div>
    </main>
  );
}
