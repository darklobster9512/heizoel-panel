"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "group flex h-9 w-full items-center justify-between whitespace-nowrap rounded-none border border-input bg-transparent px-3 py-2 text-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <span className="inline-flex items-center justify-center transition-transform group-data-[state=open]:rotate-180">
        <ChevronDown className="h-4 w-4 opacity-50" />
      </span>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;


function countSelectNodes(children: React.ReactNode): number {
  return React.Children.toArray(children).reduce<number>((count, child) => {
    if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children) {
      return count + 1 + countSelectNodes(child.props.children);
    }
    return count + 1;
  }, 0);
}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const dragStartRef = React.useRef({ pointerY: 0, scrollTop: 0 });
  const itemCount = countSelectNodes(children);
  const [scrollState, setScrollState] = React.useState({
    visible: true,
    thumbHeight: 0,
    thumbTop: 0,
  });
  const showScrollbar = scrollState.visible || itemCount > 8;
  const displayedThumbHeight = scrollState.thumbHeight || Math.max(36, 320 * (8 / itemCount));

  const updateScrollbar = React.useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const visible = viewport.scrollHeight > viewport.clientHeight;
    const thumbHeight = visible
      ? Math.max(36, (viewport.clientHeight / viewport.scrollHeight) * viewport.clientHeight)
      : 0;
    const maxScrollTop = viewport.scrollHeight - viewport.clientHeight;
    const maxThumbTop = viewport.clientHeight - thumbHeight;
    const thumbTop = maxScrollTop > 0
      ? (viewport.scrollTop / maxScrollTop) * maxThumbTop
      : 0;

    setScrollState({ visible, thumbHeight, thumbTop });
  }, []);

  React.useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    updateScrollbar();
    const frame = requestAnimationFrame(updateScrollbar);
    const observer = new ResizeObserver(updateScrollbar);
    observer.observe(viewport);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [children, updateScrollbar]);

  const handleThumbPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = { pointerY: event.clientY, scrollTop: viewport.scrollTop };
  };

  const handleThumbPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const maxThumbTop = viewport.clientHeight - scrollState.thumbHeight;
    const maxScrollTop = viewport.scrollHeight - viewport.clientHeight;
    const deltaY = event.clientY - dragStartRef.current.pointerY;
    viewport.scrollTop = dragStartRef.current.scrollTop + (deltaY / maxThumbTop) * maxScrollTop;
  };

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-none border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          ref={viewportRef}
          onScroll={updateScrollbar}
          className={cn(
            "select-content-scrollbar max-h-[320px] overflow-y-scroll p-0",
            showScrollbar && "pr-3",
            position === "popper" &&
              "w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        {showScrollbar && (
          <div className="absolute inset-y-0 right-0 w-3 bg-scrollbar-track" aria-hidden="true">
            <div
              className="absolute inset-x-0 cursor-grab touch-none rounded-sm border-2 border-scrollbar-track bg-scrollbar-thumb active:cursor-grabbing"
              style={{
                height: `${displayedThumbHeight}px`,
                transform: `translateY(${scrollState.thumbTop}px)`,
              }}
              onPointerDown={handleThumbPointerDown}
              onPointerMove={handleThumbPointerMove}
            />
          </div>
        )}
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-none py-2.5 px-3 text-sm outline-none transition-colors hover:bg-[#f3f4f6] focus:bg-[#f3f4f6] focus:text-ink data-[highlighted]:bg-[#f3f4f6] data-[state=checked]:bg-[#eff8f1] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
