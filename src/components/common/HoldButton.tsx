import { useEffect, useRef, useState } from "react";

export interface HoldButtonParams {
  children: JSX.Element[] | JSX.Element | string;
  className?: string;
  onClick?: (d?: unknown) => unknown;
  holdTime?: number; // Tempo em milissegundos
  type?: "button" | "submit" | "reset";
  completedText: string;
}

const baseClassNames =
  "transiton flex w-full items-center justify-center rounded-lg px-4 py-2 text-center font-semibold shadow-xl relative";

const HoldButton = ({
  children,
  className,
  onClick,
  holdTime = 1000, // Tempo padrão de 1 segundo
  type,
  completedText,
}: HoldButtonParams) => {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const holdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (holding) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 100));
      }, holdTime / 20);

      holdRef.current = setTimeout(() => {
        clearInterval(interval);
        onClick?.();
        setHolding(false);
        setCompleted(true);
        setProgress(0);

        setTimeout(() => setCompleted(false), 1500); // Retorna ao estado original após 1.5 segundos
      }, holdTime);

      return () => {
        clearTimeout(holdRef.current!);
        clearInterval(interval);
      };
    }
  }, [holding, holdTime, onClick]);

  const handleMouseDown = () => {
    setHolding(true);
  };

  const handleMouseUp = () => {
    if (progress < 21) {
      setTimeout(() => {
        setHolding(false);
        setProgress(0);
        if (holdRef.current) {
          clearTimeout(holdRef.current);
        }
      }, 250);
      return;
    }
    setHolding(false);
    setProgress(0);
    if (holdRef.current) {
      clearTimeout(holdRef.current);
    }
  };

  return (
    <button
      className={`${className} ${baseClassNames} ${
        holding ? "animate-shake" : ""
      } bg-gradient-to-r from-primary via-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Cancela se o usuário sair do botão
      type={type}
    >
      <div
        className={`${className} relative flex h-full w-full items-center justify-center`}
      >
        {completed ? (
          <span className="animate-thumbsup">{completedText}</span>
        ) : holding ? (
          <div className="animate-spin">⚙</div>
        ) : (
          children
        )}
        <div
          className="absolute bottom-0 left-0 h-1 bg-white transition-all duration-[0.2s]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </button>
  );
};

export default HoldButton;
