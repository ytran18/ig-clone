export const selectPostReducer = (state) =>
{
    return state.postReducer
}

export const postAssetsSelector = (state) =>
{
    return selectPostReducer(state).assets
}