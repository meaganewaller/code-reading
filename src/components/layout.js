import * as React from "react"

import Nav from "./nav"
import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <>
      <Nav siteTitle={"Code Reading Blog"} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
