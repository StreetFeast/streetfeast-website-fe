import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';

const INLINE_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

export function renderInlineLinks(
  text: string,
  options?: { linkClassName?: string },
): ReactNode {
  const className = options?.linkClassName;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  INLINE_LINK_PATTERN.lastIndex = 0;
  while ((match = INLINE_LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={`t-${lastIndex}`}>{text.slice(lastIndex, match.index)}</Fragment>,
      );
    }
    const [, label, href] = match;
    nodes.push(
      href.startsWith('/') ? (
        <Link key={`l-${match.index}`} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a
          key={`l-${match.index}`}
          href={href}
          className={className}
          rel="noopener noreferrer"
          target="_blank"
        >
          {label}
        </a>
      ),
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`t-${lastIndex}`}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}
