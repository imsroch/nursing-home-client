import { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
      "Sobre Mí",
      "Online",
      "Presenciales",
      "Personalizados",
      "Formación Intensiva"
    ];
  
    return (
      <Navbar onMenuOpenChange={setIsMenuOpen} position="static" className="bg-gradient-to-r from-green-600 via-green-700 to-green-900">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand >
            <Link href="/" className="text-2xl font-bold pl-20 sm:pl-0 text-white">Geriátrico Neuquén</Link>
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
        <NavbarMenu className="pt-4 bg-pink">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} >
              <Link
                className="w-full font-semibold text-white "
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
  }
  

export default Nav
