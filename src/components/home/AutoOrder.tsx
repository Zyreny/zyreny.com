import {
    Children,
    cloneElement,
    isValidElement,
    type ReactElement,
} from "react";

function AutoOrder({ children }: { children: React.ReactNode }) {
    return (
        <>
            {Children.map(children, (child, i) =>
                isValidElement(child)
                    ? cloneElement(child as ReactElement<{ i: number }>, { i: i + 1 })
                    : child
            )}
        </>
    );
}

export default AutoOrder;
