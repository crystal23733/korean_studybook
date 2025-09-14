"use client";

import Button from "@/components/atoms/Button/Button";
import { IModerationQueueProps } from "./type/ModerationQueue.types";

/**
 * 신고 누적 콘텐츠를 처리하는 모더레이션 큐
 * @example
 * const queue: IModerationItem[] = [
 *   { id: 'p_1', title: '은행 계좌 개설 팁', author: 'Hana', flags: 3 },
 *   { id: 'p_2', title: '체류지 변경 후기', author: 'Alex', flags: 2 },
 * ];
 *
 * <ModerationQueue
 *   items={queue}
 *   onAction={(id, action) => console.log('moderate', id, action)}
 * />
 */
export default function ModerationQueue({
  items,
  onAction,
  emptyText = "No pending items",
  className = "",
}: IModerationQueueProps) {
  return (
    <ul className={`space-y-2 ${className}`} role="list">
      {items.length === 0 ? (
        <li className="text-sm text-neutral-500">{emptyText}</li>
      ) : (
        items.map(i => (
          <li
            key={i.id}
            className="flex items-center justify-between rounded-lg border bg-neutral-50 p-3"
          >
            <div>
              <div className="font-medium">{i.title}</div>
              <div className="text-xs text-neutral-500">
                by {i.author} · flags {i.flags}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={() => onAction(i.id, "approve")}
                aria-label={`Approve ${i.title}`}
              >
                Approve
              </Button>
              <Button
                variant="warning"
                onClick={() => onAction(i.id, "hide")}
                aria-label={`Hide ${i.title}`}
              >
                Hide
              </Button>
              <Button
                variant="danger"
                onClick={() => onAction(i.id, "remove")}
                aria-label={`Remove ${i.title}`}
              >
                Remove
              </Button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
