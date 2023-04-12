export const selectReplyCommentReducer = (state) =>
{
    return state.commentReducer
}

export const replyCommentSelector = (state) =>
{
    return selectReplyCommentReducer(state).reply
}