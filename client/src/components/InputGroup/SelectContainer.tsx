import React, { HtmlHTMLAttributes, useEffect, useState, useRef } from "react";
import { useInputGroupContext } from "./InputGroupContext";
import { v4 as uuidv4 } from "uuid";
import { ChevronDownIcon, ChevronUpIcon } from "../../svgs";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  linkId: string;
  selectedOption: { icon: React.ReactNode; value: string };
  options: { icon: React.ReactNode; value: string }[];
  handleOnChange: (value: unknown) => void;
}

function SelectContainer({
  linkId,
  selectedOption: selected,
  options,
  handleOnChange,
  ...divProps
}: Props) {
  const [selectedOption, setSelectedOption] = useState<(typeof options)[number]>(selected);
  const [isActive, setIsActive] = useState(false);

  useInputGroupContext();

  const handleSelect = (option: (typeof options)[number]) => () => {
    setSelectedOption((prevState) => ({ ...prevState, ...option }));
    setIsActive((prevState) => !prevState);
  };

  const loadCount = useRef<number>(0);

  useEffect(() => {
    if (loadCount.current !== 0) {
      handleOnChange(selectedOption.value);
    }

    return () => {
      loadCount.current = 1;
    };
  }, [selectedOption]);

  return (
    <div
      {...divProps}
      className="relative"
      role="combobox"
      aria-expanded={isActive ? "true" : "false"}
      title="select platform"
    >
      <button
        onClick={() => setIsActive((prevState) => !prevState)}
        className="group relative flex w-full flex-col gap-1"
        type="button"
        id={`platform-${linkId}`}
      >
        <div
          className={`group-focus-within:border-purple flex h-[48px] w-full items-center justify-between rounded-lg border border-mediumGrey bg-white p-4 
          transition-shadow group-focus-within:shadow-inputFocus`}
        >
          <div className="flex items-center gap-[12px]">
            {selectedOption.icon && selectedOption.icon}
            <p className="capitalize text-black">{selectedOption.value}</p>
          </div>
          {isActive ? (
            <ChevronUpIcon width={24} height={24} className="text-primary" />
          ) : (
            <ChevronDownIcon width={24} height={24} className="text-primary" />
          )}
        </div>
      </button>
      {isActive && (
        <div
          className="absolute bottom-[-12px] z-10 flex w-full translate-y-[100%] flex-col rounded-lg border border-borderColor bg-white p-3 shadow-lg"
          role="option"
        >
          {options.map((option) => {
            return (
              <button
                key={uuidv4()}
                type="button"
                onClick={handleSelect(option)}
                className={`flex items-center gap-3 border-b border-borderColor py-3 first-of-type:pt-0 last-of-type:border-b-0 last-of-type:pb-0 ${
                  selectedOption.value === option.value ? "text-primary" : "text-black"
                }`}
              >
                {option.icon}
                <p
                  className={`capitalize ${
                    selectedOption.value === option.value ? "text-primary" : "text-black"
                  }`}
                >
                  {option.value}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SelectContainer;
