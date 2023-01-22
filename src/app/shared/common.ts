export const status = [
  {name: 'Active', value: true},
  {name: 'Inactive', value: false}
]

export const pages = [10, 20, 30, 40, 50]

export const TOKEN_KEY = 'svTk'
export const TAB_INDEX = 'tab'

export const getTabIndex = (): number => {
  const tabIndex = sessionStorage.getItem(TAB_INDEX)
  return tabIndex ? +tabIndex : 0
}

export const setTabIndex = (tabIndex: number): void => sessionStorage.setItem(TAB_INDEX, tabIndex.toString())
