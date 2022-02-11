import ActiveLink from './ActiveLink'
const navigationPayroll = [
  /*{
    'name': "Map",
    'url': "/",
    'newtab': true
  },*/
  {
    'name': "List",
    'url': "https://docs.google.com/spreadsheets/d/19ThkfJSJKEqR1wX9fFdTiLyXOQU-3VF_3GryY1bxmNM/edit#gid=1700256488",
    'newtab': true
  },
  {
    'name': "Mejia for Controller",
    'url': "https://mejiaforcontroller.com",
    'newtab': true
  },
  {
    'name': "Donate",
    'url': "https://mejiaforcontroller.com/donate",
    'newtab': true
  }
]

function Nav() {
  return <div className="z-50 bg-[#1a1a1a] flex flex-col">
    <nav className="z-50 flex flex-row  h-content">
      {navigationPayroll.map((item:any, itemIdx:any) =>
                     
              
                     <ActiveLink activeClassName="text-gray-100 py-3 px-6 block hover:text-green-300 focus:outline-none text-green-300 border-b-2 font-medium border-green-300" href={item.url}
                     key={itemIdx}
                     >
                     <a className="text-gray-100 py-3 px-6 block hover:text-green-300 focus:outline-none underline"
                          target={`${item.newtab === true ? "_blank" : ""}`}
                     >
                                                 {item.name}
                     </a>
                     </ActiveLink>
                     
                   )}
  </nav></div>
}

export default Nav