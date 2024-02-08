import { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import Logo from "../assets/Geriátrico Neuquén.png"

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
      { label: "Inicio", href: "/" },
      { label: "Institucional", href: "/institucional" },
      { label: "Servicios", href: "/servicios" },
      { label: "Contacto", href: "/contacto" }
    ];
  
    return (
      <Navbar onMenuOpenChange={setIsMenuOpen} position="static" className="bg-gradient-to-r from-green-600 via-green-700 to-green-900">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-white"
          />
          <NavbarBrand >
            <Link href="/" className="w-[260px] sm:w-[360px] "><img src={Logo} /></Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-7" justify="center">
          <NavbarItem>
            <Link href="/" className="font-bold text-white">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/institucional" className="font-bold text-white">
              Institucional
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/servicios" className="font-bold text-white">
              Servicios
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/contacto" className="font-bold text-white">
              Contacto
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="pt-4">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full font-semibold text-black/90"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
  }
  

export default Nav
