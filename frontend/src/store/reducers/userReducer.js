
const userReducer = (state=[], action) => {
  switch(action.type) {
  case 'CREATE_POST':
    return state.concat(action.data)
  case 'DELETE_POST':
    return state.filter(a => a !== a.id)
  default:
    return state
  }
}

export default userReducer