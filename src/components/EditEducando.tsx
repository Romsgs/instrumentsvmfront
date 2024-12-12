import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const EditEducando: React.FC = () => {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [turno, setTurno] = useState("");
  const [horario, setHorario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEducando = async () => {
      try {
        const response = await api.get(`/educandos/${id}`);
        setNome(response.data.nome);
        setTurno(response.data.turno);
        setHorario(response.data.horario);
      } catch (error) {
        console.error("Erro ao buscar educando:", error);
      }
    };

    fetchEducando();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/educandos/${id}`, { nome, turno, horario });
      alert("Educando atualizado com sucesso!");
      navigate("/educandos");
    } catch (error) {
      console.error("Erro ao atualizar educando:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-gray-100 min-h-screen flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Editar Educando</h2>
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
            <option value="primeiro">Primeiro</option>
            <option value="segundo">Segundo</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Atualizar
        </button>
      </div>
    </form>
  );
};

export default EditEducando;
