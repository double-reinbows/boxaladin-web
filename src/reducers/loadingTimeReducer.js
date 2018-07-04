const defaultState = {
  isLoadingTime: false,
  timer: 45
}

const loadingTimeReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'LOADINGTIME':{
      const { isLoadingTime } = action.payload;
      if(isLoadingTime===false)
        return { ...defaultState }
      return {...state, ...action.payload}
    }

  default:
    return state
  }
}

export default loadingTimeReducer
