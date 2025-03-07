"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { CookieIcon } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { cn } from "../../../utils/cn";
import { Button } from "../../core/button/button";

const cookieConsentVariants = cva("fixed z-[200] w-full duration-700", {
  variants: {
    variant: {
      default:
        "right-0 bottom-0 left-0 p-4 sm:bottom-4 sm:left-4 sm:max-w-md sm:p-0",
      small:
        "right-0 bottom-0 left-0 p-4 sm:bottom-4 sm:left-4 sm:max-w-md sm:p-0",
      minimal:
        "right-0 bottom-0 left-0 p-4 sm:bottom-4 sm:left-4 sm:max-w-[300px] sm:p-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CookieConsentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cookieConsentVariants> {
  mode?: boolean;
  onAcceptCallback?: () => void;
  onDeclineCallback?: () => void;
}

const CookieConsentRoot = React.forwardRef<HTMLDivElement, CookieConsentProps>(
  (
    {
      className,
      variant = "default",
      mode = false,
      onAcceptCallback,
      onDeclineCallback,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hide, setHide] = useState(false);

    const accept = () => {
      setIsOpen(false);
      document.cookie =
        "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
      setTimeout(() => {
        setHide(true);
      }, 700);
      onAcceptCallback?.();
    };

    const decline = () => {
      setIsOpen(false);
      setTimeout(() => {
        setHide(true);
      }, 700);
      onDeclineCallback?.();
    };

    useEffect(() => {
      try {
        setIsOpen(true);
        if (document.cookie.includes("cookieConsent=true")) {
          if (!mode) {
            setIsOpen(false);
            setTimeout(() => {
              setHide(true);
            }, 700);
          }
        }
      } catch (error) {
        console.error("Error checking cookie consent:", error);
      }
    }, [mode]);

    return (
      <div
        ref={ref}
        className={cn(
          cookieConsentVariants({ variant }),
          !isOpen
            ? "translate-y-8 opacity-0 transition-[opacity,transform]"
            : "translate-y-0 opacity-100 transition-[opacity,transform]",
          hide && "hidden",
          className,
        )}
        {...props}
      >
        {variant === "default" && (
          <DefaultVariant onAccept={accept} onDecline={decline} />
        )}
        {variant === "small" && (
          <SmallVariant onAccept={accept} onDecline={decline} />
        )}
        {variant === "minimal" && (
          <MinimalVariant onAccept={accept} onDecline={decline} />
        )}
      </div>
    );
  },
);
CookieConsentRoot.displayName = "CookieConsent";

interface CookieConsentVariantProps {
  onAccept: () => void;
  onDecline: () => void;
}

const DefaultVariant = ({ onAccept, onDecline }: CookieConsentVariantProps) => (
  <div className="rounded-lg border border-border bg-background shadow-lg sm:rounded-md dark:bg-card">
    <div className="grid gap-2">
      <div className="flex h-12 items-center justify-between border-border border-b p-3 sm:h-14 sm:p-4">
        <h1 className="font-medium text-base sm:text-lg">We use cookies</h1>
        <CookieIcon className="h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem]" />
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-start font-normal text-muted-foreground text-xs sm:text-sm">
          We use cookies to ensure you get the best experience on our website.
          For more information on how we use cookies, please see our cookie
          policy.
          <br />
          <br />
          <span className="text-xs">
            By clicking
            <span className="font-medium text-black dark:text-white">
              {" "}
              Accept
            </span>
            , you agree to our use of cookies.
          </span>
          <br />
          <a href="/cookie-policy" className="text-xs underline">
            Learn more.
          </a>
        </p>
      </div>
      <div className="flex flex-col gap-2 border-border border-t p-3 sm:flex-row sm:p-4 sm:py-5 dark:bg-background/20">
        <Button onClick={onAccept} className="w-full">
          Accept
        </Button>
        <Button onClick={onDecline} className="w-full" variant="secondary">
          Decline
        </Button>
      </div>
    </div>
  </div>
);

const SmallVariant = ({ onAccept, onDecline }: CookieConsentVariantProps) => (
  <div className="m-0 rounded-lg border border-border bg-background shadow-lg sm:m-3 dark:bg-card">
    <div className="flex items-center justify-between p-3">
      <h1 className="font-medium text-base sm:text-lg">We use cookies</h1>
      <CookieIcon className="h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem]" />
    </div>
    <div className="-mt-2 p-3">
      <p className="text-left text-muted-foreground text-xs sm:text-sm">
        We use cookies to ensure you get the best experience on our website. For
        more information on how we use cookies, please see our cookie policy.
      </p>
    </div>
    <div className="mt-2 flex flex-col items-center gap-2 border-t p-3 sm:flex-row">
      <Button
        onClick={onAccept}
        className="h-8 w-full text-xs sm:h-9 sm:text-sm"
      >
        Accept
      </Button>
      <Button
        onClick={onDecline}
        className="h-8 w-full text-xs sm:h-9 sm:text-sm"
        variant="outline"
      >
        Decline
      </Button>
    </div>
  </div>
);

const MinimalVariant = ({ onAccept, onDecline }: CookieConsentVariantProps) => (
  <div className="m-0 rounded-lg border border-border bg-background shadow-lg sm:m-3 dark:bg-card">
    <div className="flex items-center justify-between border-border border-b p-3">
      <div className="flex items-center gap-2">
        <CookieIcon className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="font-medium text-xs sm:text-sm">Cookie Notice</span>
      </div>
    </div>
    <div className="p-3">
      <p className="text-[11px] text-muted-foreground sm:text-xs">
        We use cookies to enhance your browsing experience.
      </p>
      <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row">
        <Button
          onClick={onAccept}
          size="sm"
          className="h-6 w-full px-2 text-[11px] sm:h-7 sm:px-3 sm:text-xs"
        >
          Accept
        </Button>
        <Button
          onClick={onDecline}
          size="sm"
          variant="ghost"
          className="h-6 w-full px-2 text-[11px] sm:h-7 sm:px-3 sm:text-xs"
        >
          Decline
        </Button>
      </div>
    </div>
  </div>
);

export const CookieConsent = Object.assign(CookieConsentRoot, {
  displayName: "CookieConsent",
});
