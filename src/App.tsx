import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import EducandoList from "./components/EducandoList";
import InstrumentoList from "./components/InstrumentoList";
import EmprestimoForm from "./components/EmprestimoForm";
import CreateEducando from "./components/CreateEducando";
import CreateInstrumento from "./components/CreateInstrumento";
import EditEducando from "./components/EditEducando";
import EditInstrumento from "./components/EditInstrumento";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EducandoList />} />
        <Route path="/educandos" element={<EducandoList />} />
        <Route path="/educandos/novo" element={<CreateEducando />} />
        <Route path="/educandos/:id/editar" element={<EditEducando />} />
        <Route path="/instrumentos" element={<InstrumentoList />} />
        <Route path="/instrumentos/novo" element={<CreateInstrumento />} />
        <Route path="/instrumentos/:id/editar" element={<EditInstrumento />} />
        <Route path="/emprestimos" element={<EmprestimoForm />} />
      </Routes>
    </Router>
  );
};

export default App;
