export const status = [
  {name: 'Active', value: true},
  {name: 'Inactive', value: false}
]

export const gender = [
  {name: 'Male', value: 'Male'},
  {name: 'Female', value: 'Female'},
]

export const pages = [10, 20, 30, 40, 50]

export const TOKEN_KEY = 'svTk'
export const TAB_INDEX = 'tab'

export const getTabIndex = (component: string): number => {
  const tabIndex = sessionStorage.getItem(`${TAB_INDEX}-${component}`)
  return tabIndex ? +tabIndex : 0
}

export const setTabIndex = (tabIndex: number, component: string): void => {
  return sessionStorage.setItem(`${TAB_INDEX}-${component}`, tabIndex.toString())
}
