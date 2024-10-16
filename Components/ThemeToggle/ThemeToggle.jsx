import React from 'react'
import {ToggleContainer} from "./ThemeToggle.styles"

export default function ThemeToggle({isDarkMode,toggleDarkMode}) {
  return (
    <ToggleContainer>
      <input className="tgl tgl-ios" id="cb2" type="checkbox" checked={isDarkMode === false} onChange={toggleDarkMode}/>
      <label className="tgl-btn" htmlFor="cb2"></label>
    </ToggleContainer>
  )
}
