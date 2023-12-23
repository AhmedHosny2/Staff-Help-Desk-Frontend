export const chatAPI = {
  getUserContacts: () => {
    return `/chat/getUserContacts`;
  },
  getUserMessages: ({chatId, type }) => {
    return `/chat/getUserMessages?chatId=${chatId}&type=${type}`;
  },
  postUserMessage: ({ chatId, type }) => {
    return `/chat/postUserMessage?chatId=${chatId}&type=${type}`;
  },
  updateReadStatus: ({  chatId, type }) => {
    return `/chat/updateMessageReadStatus/status?chatId=${chatId}&type=${type}`;
  },
  postCreateRoom: () => {
    return `/chat/postRoom`;
  }
};
