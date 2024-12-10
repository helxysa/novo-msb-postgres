"use client";
import { useState, FormEvent } from "react";
import { Vaga } from "@/app/types/types";
import { createCandidato } from "@/app/actions/actions";

interface CandidatoFormProps {
  vaga: Vaga | null;
}

export default function CandidatoForm({ vaga }: CandidatoFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    informacoesAdicionais: "",
    linkCurriculo: "",
    aceitouTermos: false,
  });

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [cpfError, setCpfError] = useState("");
  const [curriculoPdf, setCurriculoPdf] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const candidatoData = {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        telefone: formData.telefone.replace(/\D/g, ''),
        cpf: formData.cpf.replace(/\D/g, ''),
        informacoesAdicionais: formData.informacoesAdicionais.trim(),
        linkCurriculo: formData.linkCurriculo.trim(),
        vagaId: Number(vaga?.id) || 0,
        aceitouTermos: formData.aceitouTermos
      };

      const response = await createCandidato(candidatoData, curriculoPdf);
      console.log('Resposta do servidor:', response);

      setSubmitStatus("success");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        informacoesAdicionais: "",
        linkCurriculo: "",
        aceitouTermos: false,
      });
      setCurriculoPdf(null);
      setUploadError(null);
      setCompressionProgress(0);
    } catch (error) {
      console.error("Erro completo:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao enviar candidatura";
      console.error(`Erro ao enviar candidatura: ${message}`);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCurriculoPdf(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Dados Pessoais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nome Completo *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 text-gray-900 focus:border-blue-600 transition duration-200"
                placeholder="Digite seu nome completo"
              />
            </div>

            <div>
              <label
                htmlFor="cpf"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                CPF *
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                required
                value={formData.cpf}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  cpfError ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-600 text-gray-900 focus:border-blue-600 transition duration-200`}
                placeholder="000.000.000-00"
                maxLength={14}
              />
              {cpfError && (
                <p className="text-red-500 text-sm mt-1">{cpfError}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Contato</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Telefone *
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                required
                value={formData.telefone}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Currículo</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload do Currículo (PDF até 5MB)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={uploading}
              className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {uploadError && (
              <p className="text-red-500 text-sm mt-1">{uploadError}</p>
            )}
            {uploading && (
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all duration-200"
                    style={{ width: `${compressionProgress}%` }}
                  ></div>
                </div>
                <p className="text-blue-600 text-sm mt-1">
                  Processando arquivo... {Math.round(compressionProgress)}%
                </p>
              </div>
            )}
            {curriculoPdf && !uploadError && (
              <p className="text-green-600 text-sm mt-1">
                PDF carregado com sucesso!
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="linkCurriculo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Link do Currículo (LinkedIn, Google Drive, etc.)
            </label>
            <input
              type="url"
              id="linkCurriculo"
              name="linkCurriculo"
              value={formData.linkCurriculo}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
              placeholder="https://..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Forneça um link do seu currículo caso não faça o upload do arquivo
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Informações Adicionais
          </h2>

          <div>
            <label
              htmlFor="informacoesAdicionais"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Informações Adicionais *
            </label>
            <textarea
              id="informacoesAdicionais"
              name="informacoesAdicionais"
              required
              rows={4}
              value={formData.informacoesAdicionais}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
              placeholder="Conte-nos mais sobre você, suas experiências e objetivos..."
            ></textarea>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="aceitouTermos"
              required
              checked={formData.aceitouTermos}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600 mt-1"
            />
            <span className="text-sm text-gray-700">
              Concordo em compartilhar meus dados pessoais para fins de
              recrutamento e declaro que li e aceito os
              <a href="/terms" className="text-blue-600 hover:underline">
                {" "}
                Termos de Uso
              </a>{" "}
              e
              <a href="/privacy" className="text-blue-600 hover:underline">
                {" "}
                Política de Privacidade
              </a>
              .
            </span>
          </label>

          <div className="flex flex-col items-end gap-2">
            {submitStatus === "success" && (
              <p className="text-green-600 font-medium text-sm">
                Candidatura enviada com sucesso!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-600 font-medium text-sm">
                Erro ao enviar candidatura. Por favor, tente novamente.
              </p>
            )}

            <button
              type="submit"
              disabled={
                isSubmitting || submitStatus === "success" || !!cpfError
              }
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar Candidatura"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
