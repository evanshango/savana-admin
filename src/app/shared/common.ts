import {findIconDefinition, library} from "@fortawesome/fontawesome-svg-core";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {fas, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";

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

export const icons = (): IconDefinition[] => {
  let icons: IconDefinition[] = []
  library.add(fab, fas, far)
  let entries = Object.values(library).flatMap(value => Object.entries(value))
  entries.forEach(value => Object.keys(value[1]).map(val => {
      const prefix: any = value[0]
      const name: any = val
      icons.push(findIconDefinition({prefix: prefix, iconName: name}))
    })
  )
  return icons
}

export interface ISelected {
  id: string
  name: string
}
