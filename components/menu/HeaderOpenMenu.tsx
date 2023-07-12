import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";
import Router from "next/router";

  interface Items {
    title: string,
    push: string
  }
   
  export default function HeaderOpenMenu({ title, items } : { title : string, items : Array<Items> }) {
    return (
      <Menu
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <Button className="px-2 py-1 text-gray-700 hover:text-[#FF9494] transition duration-300 font-semibold text-lg gaegu outline-none">{title}</Button>
        </MenuHandler>
        <MenuList className="w-24 space-y-2 bg-slate-100 rounded-lg text-lg border gaegu">
          {items.map((item, index) => 
            <MenuItem onClick={() => {Router.push(item.push)}} key={index} className="hover:bg-[#FFD1D1] hover:rounded-md outline-none">{item.title}</MenuItem>
          )}
        </MenuList>
      </Menu>
    );
  }
