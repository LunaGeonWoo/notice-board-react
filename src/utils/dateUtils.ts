import { format } from "date-fns";
import { ko } from "date-fns/locale";

export function formatModifiedDate(modifiedAt: string): string {
  const modifiedDate = new Date(modifiedAt);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - modifiedDate.getTime()) / 1000
  );
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `( ${diffInDays}일 전에 수정됨 )`;
  } else if (diffInHours > 0) {
    return `( ${diffInHours}시간 전에 수정됨 )`;
  } else if (diffInMinutes > 0) {
    return `( ${diffInMinutes}분 전에 수정됨 )`;
  } else {
    return `( 방금 수정됨 )`;
  }
}
export default function formatCreatedDate(createdAt: string): string {
  return format(new Date(createdAt), "yyyy.MM.dd HH:mm:ss", {
    locale: ko,
  });
}
