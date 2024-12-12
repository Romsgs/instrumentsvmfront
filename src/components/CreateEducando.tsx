import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CreateEducando: React.FC = () => {
  const [nome, setNome] = useState("");
  const [turno, setTurno] = useState("");
  const [horario, setHorario] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/educandos", { nome, turno, horario });
      alert("Educando criado com sucesso!");
      navigate("/educandos");
    } catch (error) {
      console.error("Erro ao criar educando:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-gray-100 min-h-screen flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Criar Educando</h2>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Turno:</label>
          <select
            value={turno}
            onChange={(e) => setTurno(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Selecione...</option>
            <option value="manhã">Manhã</option>
            <option value="tarde">Tarde</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Horário:</label>
          <select
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Selecione...</option>
            <option value="primeiro">Primeiro</option>
            <option value="segundo">Segundo</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Criar
        </button>
      </div>
    </form>
  );
};

export default CreateEducando;
