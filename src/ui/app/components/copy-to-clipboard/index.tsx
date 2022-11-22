// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback, useEffect, useState } from 'react';

import Tooltip, { type TooltipDirection } from '../Tooltip';

import type { ReactNode, MouseEventHandler } from 'react';

const COPY_CHECKMARK_MILLIS = 2000;

export type CopyToClipboardProps = {
    txt: string;
    children: ReactNode;
    copyOnlyOnIconClick?: boolean;
    className?: string;
    mode?: 'normal' | 'highlighted';
    direction?: TooltipDirection;
};

function CopyToClipboard({
    txt,
    children,
    copyOnlyOnIconClick = false,
    className,
    mode = 'normal',
    direction,
}: CopyToClipboardProps) {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = useCallback<MouseEventHandler<HTMLElement>>(
        async (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (!txt) {
                return;
            }
            await navigator.clipboard.writeText(txt);
            setCopied(true);
        },
        [txt]
    );
    useEffect(() => {
        let timeout: number;
        if (copied) {
            timeout = window.setTimeout(
                () => setCopied(false),
                COPY_CHECKMARK_MILLIS
            );
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [copied]);
    return (
        <Tooltip
            tooltipText={copied ? 'Copied!' : 'Copy to clipboard'}
            direction={direction}
        >
            <span
                className="cursor-pointer flex items-center"
                onClick={!copyOnlyOnIconClick ? copyToClipboard : undefined}
            >
                {children}
                {/* <Icon
                    className={cl(st.copyIcon, st[mode], {
                        [st.copied]: copied,
                    })}
                    icon={SuiIcons.Clipboard}
                    onClick={copyToClipboard}
                    title="Copy to clipboard"
                /> */}
            </span>
        </Tooltip>
    );
}

export default memo(CopyToClipboard);
