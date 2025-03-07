"use client";

import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../../../utils/cn";
import { Badge } from "../../../core/badge/badge";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "../../../core/popover/popover";
import { Input } from "../input/input";

export interface DataItem {
  id?: string;
  value?: string;
  name: string;
}

export interface PillsSelectProps {
  data: DataItem[];
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (selectedValues: string[]) => void;
  placeholder?: string;
  className?: string;
}

const PillsSelect = React.forwardRef<HTMLInputElement, PillsSelectProps>(
  (
    {
      data,
      defaultValue = [],
      value,
      onValueChange,
      placeholder = "Type to search...",
      className,
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState<string>("");
    const [selectedPills, setSelectedPills] = React.useState<string[]>(
      value || defaultValue,
    );
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const radioGroupRef = React.useRef<HTMLDivElement>(null);

    const filteredItems = data.filter(
      (item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedPills.includes(item.name),
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setHighlightedIndex(-1);

      // Only open the popover if we have matching items that aren't already selected
      const hasUnselectedMatches = data.some(
        (item) =>
          item.name.toLowerCase().includes(newValue.toLowerCase()) &&
          !(value || selectedPills).includes(item.name),
      );

      setIsOpen(hasUnselectedMatches);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (isOpen && filteredItems.length > 0) {
            // Move focus to first radio button
            const firstRadio = radioGroupRef.current?.querySelector(
              'input[type="radio"]',
            ) as HTMLElement;
            firstRadio?.focus();
            setHighlightedIndex(0);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    const handleRadioKeyDown = (
      e: React.KeyboardEvent<HTMLDivElement>,
      index: number,
    ) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (index < filteredItems.length - 1) {
            setHighlightedIndex(index + 1);
            const nextItem = radioGroupRef.current?.querySelector(
              `div:nth-child(${index + 2})`,
            ) as HTMLElement;
            if (nextItem) {
              nextItem.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
              });
            }
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (index > 0) {
            setHighlightedIndex(index - 1);
            const prevItem = radioGroupRef.current?.querySelector(
              `div:nth-child(${index})`,
            ) as HTMLElement;
            if (prevItem) {
              prevItem.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
              });
            }
          } else {
            inputRef.current?.focus();
            setHighlightedIndex(-1);
          }
          break;
        case "Enter":
          e.preventDefault();
          handleItemSelect(filteredItems[index]);
          inputRef.current?.focus();
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          inputRef.current?.focus();
          break;
      }
    };

    const handleItemSelect = (item: DataItem) => {
      const newSelectedPills = [...selectedPills, item.name];
      setSelectedPills(newSelectedPills);
      setInputValue("");
      setIsOpen(false);
      setHighlightedIndex(-1);
      if (onValueChange) {
        onValueChange(newSelectedPills);
      }
    };

    const handlePillRemove = (pillToRemove: string) => {
      const newSelectedPills = selectedPills.filter(
        (pill) => pill !== pillToRemove,
      );
      setSelectedPills(newSelectedPills);
      if (onValueChange) {
        onValueChange(newSelectedPills);
      }
    };

    const handleOpenChange = (open: boolean) => {
      // Only allow external close events (like clicking outside)
      if (!open) {
        setIsOpen(false);
      }
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    };

    return (
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <div className={cn("flex flex-col gap-2", className)}>
          {(value || selectedPills).length > 0 && (
            <div className="flex flex-wrap gap-1">
              {(value || selectedPills).map((pill) => (
                <Badge
                  key={pill}
                  variant="secondary"
                  onClick={() => handlePillRemove(pill)}
                  className="group cursor-pointer gap-1"
                >
                  {pill}
                  <button
                    type="button"
                    onClick={() => handlePillRemove(pill)}
                    className="appearance-none text-muted-foreground transition-colors group-hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <PopoverAnchor asChild>
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
            />
          </PopoverAnchor>
        </div>

        <PopoverContent
          onFocusOutside={(e) => {
            // Prevent closing if focus is in the input
            if (e.target === inputRef.current) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
            // Prevent closing if interaction is with the input
            if (e.target === inputRef.current) {
              e.preventDefault();
            }
          }}
          className="p-0"
        >
          <div
            ref={radioGroupRef}
            role="radiogroup"
            aria-label="Pill options"
            onKeyDown={(e) => handleRadioKeyDown(e, highlightedIndex)}
            className="max-h-[200px] overflow-y-auto p-1"
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id || item.value || item.name}
                className={cn(
                  "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  highlightedIndex === index &&
                    "bg-accent text-accent-foreground",
                )}
              >
                <input
                  type="radio"
                  id={`pill-${item.name}`}
                  name="pill-selection"
                  value={item.name}
                  className="sr-only"
                  checked={highlightedIndex === index}
                  onChange={() => handleItemSelect(item)}
                />
                <label
                  htmlFor={`pill-${item.name}`}
                  className="flex w-full cursor-pointer items-center"
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

PillsSelect.displayName = "PillsSelect";

export { PillsSelect };
