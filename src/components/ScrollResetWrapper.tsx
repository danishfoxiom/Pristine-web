import { useEffect, useRef } from "react";

interface ScrollResetWrapperProps {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollResetWrapper = ({
  open,
  children,
  className = "",
  style = {},
}: ScrollResetWrapperProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open]);

  return (
    <div
      ref={scrollRef}
      className={`overflow-y-auto max-h-[80vh] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
