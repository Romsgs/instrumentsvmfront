import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/educandos"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Lista de Educandos
            </Link>
            <Link
              to="/educandos/novo"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Criar Educando
            </Link>
            <Link
              to="/instrumentos"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Lista de Instrumentos
            </Link>
            <Link
              to="/instrumentos/novo"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Criar Instrumento
            </Link>
            <Link
              to="/emprestimos"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Empréstimos
            </Link>
          </div>

          {/* Botão Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen
                      ? "M6 18L18 6M6 6l12 12" // Ícone de fechar
                      : "M4 6h16M4 12h16M4 18h16" // Ícone de abrir
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white text-blue-600 text-center w-full rounded-lg shadow-lg">
          <ul className="space-y-3 px-4 py-2">
            <li>
              <Link
                to="/educandos"
                className="block hover:bg-gray-200 px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Lista de Educandos
              </Link>
            </li>
            <li>
              <Link
                to="/educandos/novo"
                className="block hover:bg-gray-200 px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Criar Educando
              </Link>
            </li>
            <li>
              <Link
                to="/instrumentos"
                className="block hover:bg-gray-200 px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Lista de Instrumentos
              </Link>
            </li>
            <li>
              <Link
                to="/instrumentos/novo"
                className="block hover:bg-gray-200 px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Criar Instrumento
              </Link>
            </li>
            <li>
              <Link
                to="/emprestimos"
                className="block hover:bg-gray-200 px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Empréstimos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
