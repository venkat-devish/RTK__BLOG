import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";

const PostTimeAgo = ({ timeStamp }) => {
  let timeAgo;
  if (timeStamp) {
    const date = parseISO(timeStamp);
    const postedTime = formatDistanceToNow(date);
    timeAgo = `${postedTime} ago`;
  }
  return (
    <span title={timeStamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default PostTimeAgo;
