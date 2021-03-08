import React, { useState } from "react"
import PropTypes from "prop-types"
import { Transition } from "@headlessui/react"
import LogoImg from "../images/logo.svg"
import SmallLogoImg from "../images/small-logo.svg"
import { Link } from "gatsby"

const Nav = ({siteTitle}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: "border-indigo-500 text-gray-900 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" } : { className: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" }
  }

  const isActiveMobile = ({ isCurrent }) => {
    return isCurrent ? { className: "bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" } : { className:  "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" }
  }

  return (
    <>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex px-2 lg:px-0">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/"><img className="block lg:hidden h-8 w-auto" src={SmallLogoImg} alt="Code Reading Blog" /></Link>
                <Link to="/"><img className="hidden lg:block h-8 w-auto" src={LogoImg} alt="Code Reading Blog" /></Link>
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                {/* <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                <Link to="/about" getProps={isActive}>
                  About
                </Link>
                <Link to="/languages" getProps={isActive}>
                  Languages
                </Link>
                <Link to="/guides" getProps={isActive}>
                  Guides
                </Link>
                <Link to="/blog" getProps={isActive}>
                  Blog
                </Link>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label for="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* <!-- Heroicon name: solid/search --> */}
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input id="search" name="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search" type="search" />
                </div>
              </div>
            </div>
            <div className="flex items-center lg:hidden">
              {/* <!-- Mobile menu button --> */}
              <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false" onClick={() => setIsOpen(!isOpen)}>
                <span className="sr-only">Open main menu</span>
                {/* <!--
                  Icon when menu is closed.

                  Heroicon name: outline/menu

                  Menu open: "hidden", Menu closed: "block"
                --> */}
                <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* <!--
                  Icon when menu is open.

                  Heroicon name: outline/x

                  Menu open: "block", Menu closed: "hidden"
                --> */}
                <svg className={`${isOpen? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <Transition show={isOpen}  className="lg:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {/* <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" --> */}
            <Link to="/about" getProps={isActiveMobile}>About</Link>
            <Link to="#" getProps={isActiveMobile}>Languages</Link>
            <Link to="#" getProps={isActiveMobile}>Guides</Link>
            <Link to="#" getProps={isActiveMobile}>Blog</Link>
          </div>
        </Transition>
      </nav>
    </>
  )
}

Nav.propTypes = {
  siteTitle: PropTypes.string,
}

Nav.defaultProps = {
  siteTitle: ``,
}

export default Nav;
