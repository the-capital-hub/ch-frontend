// Group messages by date
export const groupMessagesByDate = (messages) => {
  const groupedMessages = [];
  let currentDate = null;

  for (const message of messages) {
    const messageDate = new Date(message.createdAt);
    const today = new Date();

    if (
      currentDate &&
      currentDate.getDate() === messageDate.getDate() &&
      currentDate.getMonth() === messageDate.getMonth() &&
      currentDate.getFullYear() === messageDate.getFullYear()
    ) {
      groupedMessages[groupedMessages.length - 1].messages.push(message);
    } else if (
      currentDate &&
      currentDate.getDate() - messageDate.getDate() === 1 &&
      currentDate.getMonth() === messageDate.getMonth() &&
      currentDate.getFullYear() === messageDate.getFullYear()
    ) {
      currentDate = messageDate;
      groupedMessages.push({ date: "Yesterday", messages: [message] });
    } else {
      currentDate = messageDate;
      const formattedDate = `${messageDate.getDate()}-${
        messageDate.getMonth() + 1
      }-${messageDate.getFullYear()}`;
      groupedMessages.push({
        date:
          today.getDate() === messageDate.getDate() ? "Today" : formattedDate,
        messages: [message],
      });
    }
  }

  return groupedMessages;
};

// Add showName key value.
export function formatMessages(messages, loggedInUserId) {
  let copy = groupMessagesByDate(messages);

  let formattedMessages = copy.map((group, index) => {
    let copyMessages = [...group.messages];

    let updatedMessages = copyMessages.map((message, idx) => {
      if (message.senderId._id !== loggedInUserId) {
        if (idx === 0) {
          return { ...message, showName: true };
        } else if (
          message.senderId._id !== copyMessages[idx - 1].senderId._id
        ) {
          return { ...message, showName: true };
        }
      }

      return message;
    });

    return { ...group, messages: updatedMessages };
  });

  return formattedMessages;
}

// Format time
export const formatChatTime = (date) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

// Generate Random id
export function generateId(length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

// Format Time Stamp
export const formatTimestamp = (timestamp) => {
  const messageDate = new Date(timestamp);
  const currentDate = new Date();
  const isToday =
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear();
  const isYesterday =
    messageDate.getDate() === currentDate.getDate() - 1 &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear();
  if (isToday) {
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  } else if (isYesterday) {
    return "Yesterday";
  } else {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return messageDate.toLocaleDateString(undefined, options);
  }
};
