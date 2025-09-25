import * as React from "react";
import { cn } from "@/lib/utils";

export interface NumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  suffix?: string;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, type = "text", prefix, suffix, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value || "");

    const formatNumber = (num: string) => {
      // Remove all non-numeric characters except decimal point
      const cleaned = num.replace(/[^\d.]/g, "");
      
      // Split by decimal point
      const parts = cleaned.split(".");
      
      // Format the integer part with thousands separators
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      
      // Join back if there was a decimal part
      return parts.length > 1 ? parts[0] + "," + parts[1] : parts[0];
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formatted = formatNumber(rawValue);
      setValue(formatted);
      
      // Pass the raw numeric value to parent
      const numericValue = rawValue.replace(/[^\d]/g, "");
      if (props.onChange) {
        props.onChange({
          ...e,
          target: { ...e.target, value: numericValue }
        });
      }
    };

    React.useEffect(() => {
      if (props.value) {
        setValue(formatNumber(props.value.toString()));
      }
    }, [props.value]);

    return (
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
            {prefix}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-smooth",
            prefix && "pl-8",
            suffix && "pr-12",
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";

export { NumberInput };